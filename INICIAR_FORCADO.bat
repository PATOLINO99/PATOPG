@echo off
title ZapScale - REPARACAO FORCADA
cls
echo ============================================================
echo           ZAPSCALE - LIMPANDO E REINSTALANDO
echo ============================================================
echo.
echo [1/5] Matando processos antigos do Node...
taskkill /f /im node.exe >nul 2>&1
echo [2/5] Deletando pastas temporarias e node_modules...
if exist .next rmdir /s /q .next
if exist node_modules rmdir /s /q node_modules
echo [3/5] Instalando TUDO do zero (Pode levar 2-5 minutos)...
call npm install
echo [4/5] Gerando banco de dados...
call npx prisma generate
call npx prisma db push --accept-data-loss
echo [5/5] Iniciando servidor...
echo.
echo ------------------------------------------------------------
echo  O SITE SERA ABERTO EM: http://localhost:3000
echo  (Se nao abrir, tente: http://127.0.0.1:3000)
echo ------------------------------------------------------------
echo.
call npm run dev
pause
