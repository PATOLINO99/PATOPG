@echo off
title ZapScale - DIAGNOSTICO DE ERRO
cls
echo ============================================================
echo           ZAPSCALE - SCANNER DE ERROS
echo ============================================================
echo.
echo [1/3] Testando acesso ao Banco de Dados...
call npx prisma generate
if %errorlevel% neq 0 (
    echo [ERRO] Falha no Prisma Generate. Verifique se o Node.js esta instalado.
    pause
    exit /b
)
echo [OK] Banco de Dados reconhecido.
echo.
echo [2/3] Tentando iniciar Servidor (Next.js)...
echo.
echo ATENCAO: Se aparecer algum erro abaixo, COPIE E ME MANDE!
echo ------------------------------------------------------------
call npx next dev -p 3000
if %errorlevel% neq 0 (
    echo.
    echo ------------------------------------------------------------
    echo [CRÍTICO] O servidor falhou ao iniciar. 
    echo O erro acima explica o porquê. COPIE ESTA MENSAGEM.
    echo ------------------------------------------------------------
)
pause
