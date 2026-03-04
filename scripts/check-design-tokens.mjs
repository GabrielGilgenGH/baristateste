import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = process.cwd()
const CHECK_ALL = process.env.CHECK_ALL === '1'

const COLOR_PATTERNS = [
  { key: 'raw-hex', regex: /#[0-9a-fA-F]{3,8}\b/g, message: 'Raw hex color detected.' },
  { key: 'rgb-fn', regex: /rgba?\s*\(/g, message: 'rgb()/rgba() color detected.' },
  {
    key: 'tw-arbitrary-color',
    regex: /\b(?:bg|text|border|ring|fill|stroke|shadow)-\[(?:#|rgb|hsl)/gi,
    message: 'Tailwind arbitrary color/value detected.',
  },
]

function getChangedFiles() {
  const validExtensions = new Set(['.ts', '.tsx', '.css'])
  const trackedOutput = execSync("git diff --name-only --diff-filter=ACMRTUXB HEAD -- src", {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'ignore'],
  })
    .toString()
    .trim()

  const untrackedOutput = execSync('git ls-files --others --exclude-standard -- src', {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'ignore'],
  })
    .toString()
    .trim()

  const trackedFiles = trackedOutput ? trackedOutput.split('\n').filter(Boolean) : []
  const untrackedFiles = untrackedOutput ? untrackedOutput.split('\n').filter(Boolean) : []

  return [...new Set([...trackedFiles, ...untrackedFiles])].filter((filePath) =>
    validExtensions.has(filePath.slice(filePath.lastIndexOf('.'))),
  )
}

function getAllFiles() {
  const cmd = "git ls-files 'src/**/*.ts' 'src/**/*.tsx' 'src/**/*.css' 'scripts/**/*.mjs'"
  const output = execSync(cmd, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  if (!output) return []
  return output.split('\n').filter(Boolean)
}

function findWarnings(filePath) {
  const absolutePath = resolve(ROOT, filePath)
  const content = readFileSync(absolutePath, 'utf8')
  const lines = content.split('\n')
  const warnings = []

  lines.forEach((line, index) => {
    for (const pattern of COLOR_PATTERNS) {
      if (pattern.regex.test(line)) {
        warnings.push({
          filePath,
          line: index + 1,
          rule: pattern.key,
          message: pattern.message,
          text: line.trim(),
        })
      }
      pattern.regex.lastIndex = 0
    }
  })

  return warnings
}

const files = CHECK_ALL ? getAllFiles() : getChangedFiles()

if (files.length === 0) {
  console.log('tokens:check: no changed files detected. Use CHECK_ALL=1 to scan the whole repo.')
  process.exit(0)
}

const warnings = files.flatMap(findWarnings)

if (warnings.length === 0) {
  console.log(`tokens:check: no token warnings in ${files.length} file(s).`)
  process.exit(0)
}

console.warn(`tokens:check: found ${warnings.length} warning(s):`)
for (const warning of warnings) {
  console.warn(
    `- ${warning.filePath}:${warning.line} [${warning.rule}] ${warning.message}\n  ${warning.text || '<empty line>'}`,
  )
}

console.warn('tokens:check: use design tokens from tailwind config instead of one-off color values.')
process.exit(0)
