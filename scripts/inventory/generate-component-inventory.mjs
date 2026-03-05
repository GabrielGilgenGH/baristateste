import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT_DIR = join(__dirname, '..', '..')

const SCAN_DIRECTORIES = [
  join(ROOT_DIR, 'src', 'components'),
  join(ROOT_DIR, 'src', 'features'),
  join(ROOT_DIR, 'src', 'ui-kit'),
  join(ROOT_DIR, 'src', 'ui-playground'),
]

const OUTPUT_PATH = join(ROOT_DIR, 'src', 'ui-playground', 'component-inventory.generated.json')

function isExcludedFile(filePath) {
  const normalized = filePath.replace(/\\/g, '/')
  if (normalized.includes('/__tests__/')) {
    return true
  }

  return (
    filePath.endsWith('.test.tsx') ||
    filePath.endsWith('.spec.tsx') ||
    filePath.endsWith('.stories.tsx') ||
    filePath.endsWith('.d.ts')
  )
}

function isTargetFile(filePath) {
  return extname(filePath) === '.tsx' && !isExcludedFile(filePath)
}

async function listTsxFiles(directoryPath) {
  try {
    const entries = await readdir(directoryPath, { withFileTypes: true })
    const files = []

    for (const entry of entries) {
      const entryPath = join(directoryPath, entry.name)
      if (entry.isDirectory()) {
        if (entry.name === '__tests__') continue
        const childFiles = await listTsxFiles(entryPath)
        files.push(...childFiles)
      } else if (entry.isFile() && isTargetFile(entryPath)) {
        files.push(entryPath)
      }
    }

    return files
  } catch {
    return []
  }
}

function toPascalCase(value) {
  return value
    .replace(/\.tsx$/i, '')
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('')
}

function detectComponents(source) {
  const entries = []
  const seen = new Set()
  const hasJsx = /<([A-Za-z][A-Za-z0-9]*)\b/.test(source)

  const defaultFunctionPattern = /export\s+default\s+function\s+([A-Z][A-Za-z0-9_]*)\s*\(/g
  const namedFunctionPattern = /export\s+function\s+([A-Z][A-Za-z0-9_]*)\s*\(/g
  const namedConstPattern = /export\s+const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*\(/g
  const defaultReferencePattern = /export\s+default\s+([A-Z][A-Za-z0-9_]*)\s*;?/g

  for (const pattern of [defaultFunctionPattern, namedFunctionPattern, namedConstPattern, defaultReferencePattern]) {
    let match = pattern.exec(source)
    while (match) {
      const componentName = match[1]
      if (!seen.has(componentName)) {
        let exportType = 'named'
        let confidence = 'high'

        if (pattern === defaultFunctionPattern || pattern === defaultReferencePattern) {
          exportType = 'default'
          confidence = pattern === defaultReferencePattern ? 'medium' : 'high'
        } else if (pattern === namedConstPattern) {
          exportType = 'named'
          confidence = hasJsx ? 'medium' : 'low'
        }

        entries.push({ componentName, exportType, confidence })
        seen.add(componentName)
      }

      match = pattern.exec(source)
    }
  }

  return entries
}

function getGroup(relativeFilePath) {
  const normalizedPath = relativeFilePath.replace(/\\/g, '/').replace(/^src\//, '')
  const segments = normalizedPath.split('/')
  segments.pop()
  return segments.join('/') || 'root'
}

async function generateInventory() {
  const allFiles = (
    await Promise.all(SCAN_DIRECTORIES.map((directoryPath) => listTsxFiles(directoryPath)))
  ).flat()

  const sortedFiles = [...new Set(allFiles)].sort((a, b) => a.localeCompare(b))
  const entries = []

  for (const absolutePath of sortedFiles) {
    const source = await readFile(absolutePath, 'utf8')
    const relativeFilePath = relative(ROOT_DIR, absolutePath).replace(/\\/g, '/')
    const group = getGroup(relativeFilePath)
    const detected = detectComponents(source)

    if (detected.length === 0) {
      entries.push({
        componentName: toPascalCase(relativeFilePath.split('/').pop() ?? 'UnknownComponent'),
        filePath: relativeFilePath,
        group,
        exportType: 'unknown',
        confidence: 'low',
      })
      continue
    }

    for (const component of detected) {
      entries.push({
        componentName: component.componentName,
        filePath: relativeFilePath,
        group,
        exportType: component.exportType,
        confidence: component.confidence,
      })
    }
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    entries,
  }

  await mkdir(dirname(OUTPUT_PATH), { recursive: true })
  await writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  console.log(`inventory:generate: wrote ${entries.length} entries to ${relative(ROOT_DIR, OUTPUT_PATH)}`)
}

generateInventory().catch((error) => {
  console.error(`inventory:generate failed: ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
})
