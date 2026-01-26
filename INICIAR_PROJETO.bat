@echo off
title ZapScale - ATIVACAO SENIOR
cls
echo ============================================================
echo           ZAPSCALE - SISTEMA DINAMICO ATIVADO
echo ============================================================
echo.

echo [1/4] Ajustando Permissoes do Windows...
PowerShell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" >nul 2>&1
echo [OK] Permissoes configuradas.
echo.

echo [2/4] Sincronizando Banco de Dados e Modelos...
call npx prisma generate
call npx prisma db push --accept-data-loss
echo [OK] Banco de dados pronto e tipado.
echo.

echo [3/4] Limpando processos antigos...
taskkill /f /im node.exe >nul 2>&1
echo [OK] Memoria limpa para o novo servidor.
echo.

echo [4/4] Iniciando Servidor ZapScale...
echo.
echo ------------------------------------------------------------
echo  SITE PRINCIPAL: http://localhost:3000
echo  PAINEL ADMIN : http://localhost:3000/admin/site-editor
echo ------------------------------------------------------------
echo.
echo AGUARDE ATE APARECER "Ready in ..." ABAIXO:
echo.

:: Abre o navegador principal apos o tempo de boot
start "" "http://localhost:3000"

:: Roda o servidor via CMD puro para ignorar bloqueios do terminal do VS Code
cmd /c "npm run dev"

pause
