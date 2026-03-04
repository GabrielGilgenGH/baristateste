const baseUrl = process.env.BASE_URL

if (!baseUrl) {
  console.error('BASE_URL is required. Example: BASE_URL=https://baristateste.vercel.app')
  process.exit(1)
}

function buildUrl(path) {
  return new URL(path, baseUrl).toString()
}

async function postJson(path, payload) {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  let json = {}
  try {
    json = await response.json()
  } catch {
    json = {}
  }

  return { status: response.status, json }
}

async function run() {
  console.log('Running leads proxy smoke test...')
  console.log(`BASE_URL=${baseUrl}`)

  const validPayload = {
    name: 'Smoke Test',
    company: 'Dr Barista QA',
    whatsapp: '+5547999999999',
    email: 'qa@drbarista.test',
    message: 'Smoke test lead from script.',
    interest: 'budget_request',
  }

  const valid = await postJson('/api/leads', validPayload)
  console.log('Valid payload result:', valid.status, valid.json)

  const invalid = await postJson('/api/leads', {})
  console.log('Invalid payload result:', invalid.status, invalid.json)

  const invalidFailed = invalid.status < 400
  if (invalidFailed) {
    console.error('Expected invalid payload to fail with 4xx status.')
    process.exit(1)
  }

  console.log('Smoke test completed.')
}

run().catch((error) => {
  console.error('Smoke test failed with exception:', error?.message ?? error)
  process.exit(1)
})
