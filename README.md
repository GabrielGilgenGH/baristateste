# Dr Barista Website

Institucional B2B para locação e vending de máquinas de café, totalmente separado do ERP.

## Tecnologias

- Vite + React + TypeScript
- Tailwind CSS para design utilitário
- React Router DOM para rotas internas
- Embla Carousel para clientes em destaque
- Lucide React para ícones
- Google Apps Script Web App para captura de leads

## Como começar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Copie o modelo de variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```
3. Execute a aplicação em modo desenvolvimento:
   ```bash
   npm run dev
   ```

### Validar build

- Para checar se a aplicação compila sem erros de TypeScript:
  ```bash
  npm run build
  ```

### Variáveis esperadas

- `GOOGLE_APPS_SCRIPT_URL`
- `LEADS_WEBHOOK_TOKEN`

Defina as variáveis no ambiente do Vercel para que a função `/api/leads` consiga encaminhar os envios para o Apps Script sem expor o token no frontend.

### Leads Proxy Smoke Test

```bash
BASE_URL=https://baristateste.vercel.app node scripts/smoke/leads-proxy-smoke.mjs
```

The script sends one valid and one invalid payload to `/api/leads` and prints status + JSON responses.

### UI Playground

- Internal route for UI iteration: `/ui`
- Not linked from main navigation.

### Design Token Guard

```bash
npm run tokens:check
```

Use `CHECK_ALL=1 npm run tokens:check` to scan all tracked source files.

See [`docs/design-tokens.md`](docs/design-tokens.md) for token conventions.

### Visual Screenshot Smoke

```bash
npm run visual:snap
```

This generates baseline screenshots for `/`, `/maquinas`, and `/produtos` in `scripts/visual-baseline/output/`.
