@echo off
title ZapScale - REPARACAO TOTAL
cls
echo ============================================================
echo           ZAPSCALE - REPARACAO E INICIALIZACAO
echo ============================================================
echo.
echo [1/4] Limpando cache antigo...
if exist .next rmdir /s /q .next
echo [OK] Cache limpo.
echo.
echo [2/4] Instalando dependencias (isso pode demorar)...
call npm install
echo [OK] Dependencias instaladas.
echo.
echo [3/4] Preparando Banco de Dados...
call npx prisma generate
call npx prisma db push --accept-data-loss
echo [OK] Banco de dados pronto.
echo.
echo [4/4] Iniciando servidor em porta alternativa (3001)...
echo.
echo ------------------------------------------------------------
echo  SITE: http://localhost:3001
echo  ADMIN: http://localhost:3001/admin/site-editor
echo ------------------------------------------------------------
echo.
echo SE ESTA JANELA FECHAR SOZINHA, ME MANDE UM PRINT DO ERRO!
echo.
call npx next dev -p 3001
pause
