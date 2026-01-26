@echo off
title ZapScale - CHECKUP COMPLETO
cls
set LOGFILE=resultado_checkup.txt
echo ============================================================ > %LOGFILE%
echo           RELATORIO DE DIAGNOSTICO ZAPSCALE              >> %LOGFILE%
echo ============================================================ >> %LOGFILE%
echo Data/Hora: %date% %time% >> %LOGFILE%
echo. >> %LOGFILE%

echo [1/5] Verificando Versao do Node...
echo Node Version: >> %LOGFILE%
call node -v >> %LOGFILE% 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado no Sistema. >> %LOGFILE%
)

echo [2/5] Verificando Prisma e Banco de Dados...
echo Prisma Status: >> %LOGFILE%
call npx prisma -v >> %LOGFILE% 2>&1
call npx prisma generate >> %LOGFILE% 2>&1

echo [3/5] Verificando Porta 3000...
echo Port 3000 Status: >> %LOGFILE%
netstat -ano | findstr :3000 >> %LOGFILE% 2>&1

echo [4/5] Testando Inicializacao do Next...
echo Tentando rodar next dev por 10 segundos... >> %LOGFILE%
start /b cmd /c "npx next dev -p 3000 > server_log.txt 2>&1"
timeout /t 10 /nobreak > nul
taskkill /f /im node.exe > nul 2>&1

echo [5/5] Coletando Logs do Servidor...
echo --- LOG DO SERVIDOR --- >> %LOGFILE%
if exist server_log.txt (
    type server_log.txt >> %LOGFILE%
) else (
    echo Log do servidor nao gerado. >> %LOGFILE%
)

echo.
echo ============================================================
echo   DIAGNOSTICO CONCLUIDO! 
echo   POR FAVOR, ABRA O ARQUIVO: resultado_checkup.txt
echo   E ME MANDE O QUE ESTA ESCRITO NELE.
echo ============================================================
pause
