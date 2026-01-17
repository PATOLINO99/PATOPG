# Projeto de Venda de PDFs

## Como Iniciar

Este projeto foi reconfigurado para garantir que todas as dependências funcionem.

1. **Instale as dependências:**
   Abra o terminal na pasta do projeto e execute:
   ```bash
   npm install
   ```

2. **Prepare o Banco de Dados:**
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   ```

3. **Inicie o Servidor:**
   ```bash
   npm run dev
   ```

## Acessos
- **Site:** http://localhost:3000
- **Admin:** http://localhost:3000/admin (Senha: `admin123`)

## Solução de Erros Comuns
- Se der erro de "comando não encontrado", certifique-se de ter o Node.js instalado.
- Se o banco de dados der erro, apague a pasta `prisma/dev.db` e rode o passo 2 novamente.
