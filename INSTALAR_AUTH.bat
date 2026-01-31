@echo off
echo --- INSTALANDO MÓDULOS DE AUTENTICAÇÃO ---
call npm install jose bcryptjs
echo.
echo --- GERANDO PRISMA CLIENT ATUALIZADO ---
call npx prisma generate
echo.
echo --- FEITO. AGORA CRIE AS PÁGINAS DE LOGIN ---
pause
