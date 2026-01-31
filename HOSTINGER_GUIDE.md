# Guia de Deploy na Hostinger (VPS ou Cloud Node.js)

Como removemos o Netlify, aqui está o procedimento para rodar seu projeto na Hostinger:

## Opção 1: VPS (Recomendado)
1. Use o Terminal (SSH) ou o painel do VPS.
2. Clone o repositório:
   `git clone https://github.com/PATOLINO99/PATOPG.git`
3. Entre na pasta:
   `cd PATOPG`
4. Instale as dependências:
   `npm install`
5. Gere o banco de dados:
   `npx prisma db push`
   `npx prisma db seed`
6. Construa o projeto:
   `npm run build`
7. Inicie o servidor:
   `npm start`

*Dica: Use PM2 para manter o site online: `npm install -g pm2` e `pm2 start npm --name "zapscale" -- start`*

## Opção 2: Hospedagem Compartilhada (Node.js App)
1. Faça o upload dos arquivos (exceto node_modules).
2. Configure o "Node.js App" no painel (hPanel/cPanel).
3. Defina a Application Startup File como `node_modules/next/dist/bin/next` (ou crie um arquivo server.js personalizado se necessário).
4. Execute `npm install` via painel.
5. Execute os comandos do Prisma via terminal SSH da hospedagem.

## Notas sobre SQLite
Como estamos usando SQLite (`dev.db`), o arquivo do banco de dados ficará salvo na própria pasta do projeto. Certifique-se de fazer backups dele regularmente.
