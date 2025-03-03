# Sistema de Gestão de Compras

Um sistema moderno e intuitivo para gerenciamento de compras, desenvolvido para modernizar o fluxo de trabalho baseado em planilhas. O sistema oferece uma interface limpa com navegação lateral, permitindo aos usuários gerenciar fornecedores, funcionários, produtos, cotações e compras através de uma interface web intuitiva.

## Características

- 📊 Dashboard com estatísticas de compras
- 👥 Gestão de fornecedores
- 👨‍💼 Gestão de funcionários
- 📦 Cadastro de produtos
- 💰 Sistema de cotações
- 🛍️ Registro de compras
- 📱 Interface responsiva
- 🎨 Design moderno e intuitivo

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/catevildev/purchase-streamline.git
cd purchase-streamline
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5000`

## Tecnologias Utilizadas

- **Frontend:**
  - React
  - TanStack Query
  - Shadcn/ui
  - Tailwind CSS
  - React Hook Form
  - Zod
  - Recharts

- **Backend:**
  - Node.js
  - Express
  - Drizzle ORM
  - TypeScript

## Estrutura do Projeto

```
├── client/               # Frontend React
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── hooks/       # Custom hooks
│   │   ├── lib/         # Utilitários
│   │   └── pages/       # Páginas da aplicação
├── server/              # Backend Express
│   ├── routes.ts       # Rotas da API
│   └── storage.ts      # Camada de armazenamento
└── shared/             # Código compartilhado
    └── schema.ts       # Schemas e tipos
```

## Recursos Futuros

- Dashboard avançado com análises detalhadas
- Fluxo de aprovação de compras com notificações por email
- Acompanhamento de desempenho de fornecedores
- Ferramentas de comparação e análise de cotações
- Funcionalidade de exportação de relatórios e dados

## Créditos

Este projeto foi desenvolvido como parte de uma iniciativa para modernizar o processo de compras, utilizando as melhores práticas de desenvolvimento web e design de interface.

### Desenvolvido por:
- [catevildev](https://github.com/catevildev)

### Powered by:
- [Replit](https://replit.com)
- [React](https://reactjs.org)
- [Shadcn/ui](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query)

## Licença

Este projeto está sob a licença MIT.