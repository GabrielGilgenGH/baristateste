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
2. Copie o modelo de variáveis de ambiente e preencha o endpoint de leads:
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

- `VITE_LEADS_ENDPOINT_URL`

Sem esse valor, o formulário de orçamento fica desabilitado e exibe uma mensagem amigável sem travar a aplicação.
