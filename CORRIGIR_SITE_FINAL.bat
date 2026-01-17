@echo off
color 0A
echo ========================================================
echo   CORRECAO FINAL - DIAGNOSTICO COMPLETO
echo ========================================================
echo.

echo [1/4] Testando Node.js...
node -v
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Instale o Node.js v18 ou superior: https://nodejs.org/
    pause
    exit /b
)
echo Node.js OK.
echo.

echo [2/4] Testando NPM...
call npm -v
if %errorlevel% neq 0 (
    echo [ERRO] NPM nao encontrado!
    pause
    exit /b
)
echo NPM OK.
echo.

echo [3/4] Instalando pacotes (Aguarde, nao feche)...
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar pacotes (npm install).
    echo Verifique sua conexao com a internet.
    pause
    exit /b
)
echo Instalacao concluida.
echo.

echo [4/4] Configurando TUDO e iniciando...
call npx prisma generate
call npx prisma db push --accept-data-loss
call node prisma/seed.js

echo.
echo ========================================================
echo   SUCESSO! O SCRIPT VAI ABRIR O SITE AGORA.
echo   Mantenha esta janela aberta enquanto usa o site.
echo ========================================================
echo.

start "" "http://localhost:3000"
call npm run dev
pause
