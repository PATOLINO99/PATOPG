@echo off
echo ==========================================
echo CORRIGINDO E INICIANDO O PROJETO
echo ==========================================

echo [1/3] Instalando todas as dependencias...
call npm install
if %errorlevel% neq 0 (
    echo ERRO ao instalar dependencias. Verifique se o Node.js esta instalado.
    pause
    exit /b
)

echo [2/3] Configurando o Banco de Dados...
call npx prisma generate
call npx prisma db push --accept-data-loss
call node prisma/seed.js

echo [3/3] Iniciando o Servidor...
echo.
echo AGUARDE A MENSAGEM "Ready in..." E ACESSE: http://localhost:3000
echo.
call npm run dev
pause
