@echo off
echo ========================================
echo   INICIANDO PAINEL ZAPSCALE (LOCAL)
echo ========================================
echo.
echo [1/2] Iniciando servidor de desenvolvimento...
echo O site vai abrir automaticamente em alguns segundos.
echo.
start http://localhost:3000/dashboard
call npm run dev
pause
