@echo off
set LOGFILE=log_correcao.txt
echo ===========================================
echo   CORRECAO E DIAGNOSTICO DO SITE (V3)
echo ===========================================
echo.
echo As etapas serao salvas em %LOGFILE%
echo Por favor, aguarde...
echo.

echo [DATA: %date% %time%] > %LOGFILE%

echo [1/5] Verificando Node.js...
node -v >> %LOGFILE% 2>&1
if %errorlevel% neq 0 (
    echo [ERRO CRITICO] Node.js nao encontrado. >> %LOGFILE%
    echo NODE NAO INSTALADO. Instale o Node.js v18+.
    pause
    exit /b
)
echo Node OK.

echo [2/5] Limpando cache do Next.js (se existir)...
if exist .next rmdir /s /q .next >> %LOGFILE% 2>&1

echo [3/5] Instalando dependencias (Isso pode demorar alguns minutos)...
echo Aguarde, instalando...
call npm install >> %LOGFILE% 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Falha no npm install. >> %LOGFILE%
    echo Erro ao instalar bibliotecas. Verifique o arquivo %LOGFILE%.
    pause
    exit /b
)
echo Dependencias OK.

echo [4/5] Configurando Banco de Dados...
call npx prisma generate >> %LOGFILE% 2>&1
call npx prisma db push --accept-data-loss >> %LOGFILE% 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Falha no banco de dados. >> %LOGFILE%
    echo Erro ao criar banco de dados. Verifique %LOGFILE%.
    pause
    exit /b
)
call node prisma/seed.js >> %LOGFILE% 2>&1
echo Banco de dados OK.

echo [5/5] Iniciando o servidor...
echo.
echo TUDO CERTO! O site vai abrir em 10 segundos...
echo.

start "" "http://localhost:3000"
timeout /t 10

echo Iniciando Next.js (pode levar um momento para carregar)...
call npm run dev
pause
