import { spawn } from 'node:child_process'
import { mkdir, readdir, rm } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { chromium } from 'playwright'

const OUTPUT_DIR = resolve(process.cwd(), 'scripts/visual-baseline/output')
const LOCAL_PREVIEW_URL = 'http://127.0.0.1:4173'
const BASE_URL = process.env.BASE_URL || LOCAL_PREVIEW_URL

const PAGES = [
  { path: '/', file: 'home.png' },
  { path: '/maquinas', file: 'maquinas.png' },
  { path: '/produtos', file: 'produtos.png' },
]

function runCommand(command, args, options = {}) {
  return new Promise((resolveCommand, rejectCommand) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: false,
      ...options,
    })

    child.on('error', rejectCommand)
    child.on('exit', (code) => {
      if (code === 0) {
        resolveCommand()
        return
      }
      rejectCommand(new Error(`${command} ${args.join(' ')} exited with code ${code}`))
    })
  })
}

async function waitForUrl(url, timeoutMs = 45000) {
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // Retry until timeout.
    }
    await delay(500)
  }

  throw new Error(`Timed out waiting for ${url}`)
}

async function ensureOutputDir() {
  await mkdir(OUTPUT_DIR, { recursive: true })
  const entries = await readdir(OUTPUT_DIR)
  await Promise.all(
    entries
      .filter((entry) => entry.endsWith('.png'))
      .map((entry) => rm(join(OUTPUT_DIR, entry), { force: true })),
  )
}

async function captureScreenshots(baseUrl) {
  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  for (const target of PAGES) {
    const url = new URL(target.path, baseUrl).toString()
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.screenshot({
      path: join(OUTPUT_DIR, target.file),
      fullPage: true,
    })
  }

  await browser.close()
}

async function run() {
  let previewProcess = null

  try {
    await ensureOutputDir()

    if (!process.env.BASE_URL) {
      await runCommand('npm', ['run', 'build'])

      previewProcess = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], {
        cwd: process.cwd(),
        stdio: 'inherit',
        shell: false,
      })

      await waitForUrl(LOCAL_PREVIEW_URL)
    }

    await captureScreenshots(BASE_URL)
    console.log(`visual:snap: saved screenshots in ${OUTPUT_DIR}`)
  } finally {
    if (previewProcess) {
      previewProcess.kill('SIGTERM')
    }
  }
}

run().catch((error) => {
  console.error(`visual:snap failed: ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
})
