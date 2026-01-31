@echo off
echo --- DIAGNOSTICO E ENVIO ---

echo 1. Verificando se os arquivos existem...
if exist "app\login\page.js" (
    echo [OK] Pagina de Login encontrada.
) else (
    echo [ERRO] Pagina de Login NAO encontrada!
)

if exist "middleware.js" (
    echo [OK] Middleware encontrado.
) else (
    echo [ERRO] Middleware NAO encontrado!
)

echo.
echo 2. Atualizando lista de pacotes (package.json)...
call npm install jose bcryptjs

echo.
echo 3. Forcando envio para o GitHub...
git add .
git commit -m "Forcando Login e Middleware"
git push origin main

echo.
echo ---------------------------------------------------
echo SE APARECEU ERRO [ERRO] ACIMA, ME AVISE.
echo SE O GIT PUSH FUNCIONOU, AGORA VAI NO SERVIDOR.
echo ---------------------------------------------------
pause
