@echo off
title ZapScale - SOLUÇÃO FINAL
cls
echo ============================================================
echo           ZAPSCALE - LIGANDO SITE (MODO SEGURO)
echo ============================================================
echo.

echo [1/3] Liberando permissoes do Windows...
PowerShell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" >nul 2>&1
echo [OK] Permissoes ajustadas.
echo.

echo [2/3] Limpando processos travados...
taskkill /f /im node.exe >nul 2>&1
echo [OK] Memoria limpa.
echo.

echo [3/3] Iniciando Servidor...
echo ------------------------------------------------------------
echo  O SITE SERA ABERTO EM ALGUNS SEGUNDOS: http://localhost:3000
echo ------------------------------------------------------------
echo.

:: Abre o navegador automaticamente após 5 segundos
start "" "http://localhost:3000"

:: Roda o servidor usando CMD puro para evitar erro do PowerShell
call npm run dev
pause
