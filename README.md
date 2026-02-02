# Barista Office Website

Institucional B2B para locação e vending de máquinas de café, totalmente separado do ERP.

## Tecnologias

- Vite + React + TypeScript
- Tailwind CSS para design utilitário
- React Router DOM para rotas internas
- Embla Carousel para clientes em destaque
- Lucide React para ícones
- Supabase (via @supabase/supabase-js) para captura de leads

## Como começar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Copie o modelo de variáveis de ambiente e preencha os valores do Supabase:
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

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Sem esses valores, o formulário de orçamento mantém o envio local e mostra mensagem amigável sem travar a aplicação.
