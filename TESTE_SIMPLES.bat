@echo off
echo ==========================================
echo   TESTE RAPIDO
echo ==========================================
echo.
echo Testando Node...
node -v
if %errorlevel% neq 0 (
    echo [ERRO] O comando 'node' nao funcionou.
    echo O Node.js nao esta instalado corretamente ou nao esta no PATH.
    pause
    exit /b
)

echo.
echo Testando NPM...
call npm -v
if %errorlevel% neq 0 (
    echo [ERRO] O comando 'npm' nao funcionou.
    pause
    exit /b
)

echo.
echo Instalando tudo...
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar.
    pause
    exit /b
)

echo.
echo Iniciando servidor...
call npm run dev
pause
