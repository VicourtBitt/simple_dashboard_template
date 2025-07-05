Template de Dashboard com Next.js, NextAuth e MUI
Este é um projeto de template inicial para a criação de dashboards modernos, construído com Next.js (App Router), NextAuth.js para autenticação, Material-UI (MUI) para componentes de interface e @mui/x-charts para visualização de dados.

O objetivo deste template é fornecer uma base sólida e pronta para uso, incluindo autenticação segura, proteção de rotas e exemplos de gráficos dinâmicos, permitindo que os desenvolvedores se concentrem na lógica de negócios específica de sua aplicação.

✨ Principais Funcionalidades
Autenticação Completa: Sistema de login/logout pronto para uso com NextAuth.js.

Proteção de Rotas: Utiliza um UserSessionProvider customizado para proteger rotas e redirecionar usuários não autenticados.

Página de Perfil: Uma página de perfil de usuário que exibe informações da sessão e permite o logout.

Dashboard com Gráficos: Exemplos de gráficos de barras e de pizza responsivos usando @mui/x-charts com dados gerados dinamicamente.

Estrutura Moderna: Construído com o App Router do Next.js 14+ e componentes "Server-Side" e "Client-Side".

UI com Material-UI: Interface elegante e consistente utilizando a biblioteca de componentes Material-UI.

🚀 Como Começar
Siga estas instruções para obter uma cópia do projeto e executá-la em sua máquina local para desenvolvimento e testes.

Pré-requisitos
Node.js (versão 18.x ou superior)

npm, yarn ou pnpm

1. Clone o Repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

2. Instale as Dependências
npm install
# ou
yarn install
# ou
pnpm install

3. Configure as Variáveis de Ambiente
Crie um arquivo chamado .env.local na raiz do seu projeto. Este arquivo conterá as chaves secretas necessárias para a autenticação.

# .env.local

# Gere uma chave secreta forte usando: openssl rand -base64 32
NEXTAUTH_SECRET="COLE_SUA_CHAVE_SECRETA_AQUI"

# A URL base da sua aplicação. Para desenvolvimento local, é http://localhost:3000
NEXTAUTH_URL="http://localhost:3000"

# Exemplo para o Provider do Google (opcional)
# GOOGLE_CLIENT_ID="SEU_GOOGLE_CLIENT_ID"
# GOOGLE_CLIENT_SECRET="SEU_GOOGLE_CLIENT_SECRET"

Importante: A variável NEXTAUTH_SECRET é obrigatória para ambientes de produção e altamente recomendada para desenvolvimento.

4. Execute o Servidor de Desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev

Abra http://localhost:3000 no seu navegador para ver a aplicação em funcionamento.

🛠️ Tecnologias Utilizadas
Framework: Next.js

Autenticação: NextAuth.js

UI Components: Material-UI (MUI)

Gráficos: @mui/x-charts

Linguagem: TypeScript

📂 Estrutura do Projeto
/
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/  # Rota da API do NextAuth
│   │   ├── analytics/               # Exemplo de página com gráficos
│   │   ├── profile/                 # Página de perfil do usuário
│   │   ├── layout.tsx               # Layout principal da aplicação
│   │   └── page.tsx                 # Página inicial
│   ├── components/                  # Componentes reutilizáveis (ex: CustomCard)
│   ├── providers/                   # Provedores de contexto (ex: UserSessionProvider)
│   └── lib/                         # Funções utilitárias (ex: geradores de dados)
└── .env.local                       # Arquivo de variáveis de ambiente (não versionado)

🚢 Deploy na Vercel
Para fazer o deploy deste projeto na Vercel, siga os seguintes passos:

Faça o push do seu código para um repositório no GitHub.

Importe o repositório na Vercel.

Configure as mesmas variáveis de ambiente (NEXTAUTH_SECRET, NEXTAUTH_URL, etc.) no painel do seu projeto na Vercel (em Settings > Environment Variables).

A Vercel irá detectar que é um projeto Next.js e fará o deploy automaticamente.