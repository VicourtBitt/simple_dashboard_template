# 🧩 Template de Dashboard com Next.js, NextAuth e MUI

Este é um projeto de **template inicial para a criação de dashboards modernos**, construído com:

- **Next.js (App Router)**
- **NextAuth.js** para autenticação
- **Material-UI (MUI)** para componentes de interface
- **@mui/x-charts** para visualização de dados

O objetivo é fornecer uma base sólida e pronta para uso, com autenticação segura, proteção de rotas e exemplos de gráficos dinâmicos. Assim, os desenvolvedores podem focar na lógica de negócio específica da aplicação.

---

## ✨ Principais Funcionalidades

- 🔐 **Autenticação Completa**: Sistema de login/logout com NextAuth.js
- 🛡 **Proteção de Rotas**: Via `UserSessionProvider` customizado
- 👤 **Página de Perfil**: Exibe dados da sessão e botão de logout
- 📊 **Dashboard com Gráficos**: Exemplos de gráficos de barras e pizza usando `@mui/x-charts`
- ⚙️ **Estrutura Moderna**: Next.js 14+ com App Router, componentes Server/Client
- 🎨 **UI com Material-UI**: Interface consistente e elegante

---

## 🚀 Como Começar

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos

- Node.js (18.x ou superior)
- npm, yarn ou pnpm

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as Dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as Variáveis de Ambiente

Crie o arquivo `.env.local` na raiz do projeto:

```env
# .env.local

# Gere uma chave secreta usando: openssl rand -base64 32
NEXTAUTH_SECRET="COLE_SUA_CHAVE_SECRETA_AQUI"

# URL base da aplicação (ex: http://localhost:3000)
NEXTAUTH_URL="http://localhost:3000"

# (Opcional) Autenticação via Google
# GOOGLE_CLIENT_ID="SEU_GOOGLE_CLIENT_ID"
# GOOGLE_CLIENT_SECRET="SEU_GOOGLE_CLIENT_SECRET"
```

> ⚠️ `NEXTAUTH_SECRET` é obrigatória em produção e recomendada no desenvolvimento.

### 4. Execute o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse `http://localhost:3000` no navegador.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js
- **Autenticação**: NextAuth.js
- **UI Components**: Material-UI (MUI)
- **Gráficos**: @mui/x-charts
- **Linguagem**: TypeScript

---

## 📂 Estrutura do Projeto

```
/
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/  # Rota da API do NextAuth
│   │   ├── analytics/               # Página com gráficos
│   │   ├── profile/                 # Página de perfil do usuário
│   │   ├── layout.tsx               # Layout principal
│   │   └── page.tsx                 # Página inicial
│   ├── components/                  # Componentes reutilizáveis
│   ├── providers/                   # Context Providers (ex: UserSessionProvider)
│   └── lib/                         # Utilitários e geração de dados
└── .env.local                       # Variáveis de ambiente (não versionado)
```

---

## 🚢 Deploy na Vercel

Para fazer o deploy:

1. Faça push do código para um repositório no GitHub
2. Importe o repositório na [Vercel](https://vercel.com/)
3. Configure as **variáveis de ambiente** (`NEXTAUTH_SECRET`, `NEXTAUTH_URL`, etc.) em:
   `Settings > Environment Variables`
4. A Vercel detectará o projeto Next.js automaticamente e fará o deploy

---

## 📎 Licença

Este projeto é livre para uso e modificação. Considere dar os devidos créditos caso reutilize o template publicamente.