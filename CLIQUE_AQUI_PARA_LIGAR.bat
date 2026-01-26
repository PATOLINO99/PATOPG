@echo off
title ZapScale - ATIVAÇÃO MÁXIMA
cls
echo ============================================================
echo           ZAPSCALE - INICIANDO SISTEMA
echo ============================================================
echo.

echo [1/3] Limpando processos antigos...
taskkill /f /im node.exe >nul 2>&1
echo [OK] Memoria limpa.
echo.

echo [2/3] Preparando Banco de Dados...
call npx prisma generate
echo [OK] Banco de Dados pronto.
echo.

echo [3/3] Iniciando Servidor de Desenvolvimento...
echo.
echo ============================================================
echo   MANTENHA ESTA JANELA ABERTA PARA O SITE FUNCIONAR!
echo   O SITE SERA ABERTO NO SEU NAVEGADOR EM INSTANTES...
echo ============================================================
echo.

:: Tenta abrir o navegador apos 8 segundos (tempo do Next iniciar)
timeout /t 8 /nobreak > nul
start "" "http://localhost:3000"

:: Executa o dev usando CMD para ignorar erro de permissao do PowerShell
cmd /c "npm run dev"

pause
