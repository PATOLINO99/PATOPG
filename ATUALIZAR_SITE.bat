@echo off
echo ========================================
echo   ATUALIZANDO ZAPSCALE.PRO NO SERVIDOR
echo ========================================
echo.

echo [1/3] Enviando alteracoes para o GitHub...
git add .
git commit -m "Update: %date% %time%"
git push origin main

echo.
echo [2/3] Aguarde 5 segundos...
timeout /t 5 /nobreak

echo.
echo [3/3] Agora va no terminal SSH e execute:
echo.
echo cd /var/www/zapscale ^&^& git pull origin main ^&^& npm install ^&^& npm run build ^&^& pm2 restart zapscale
echo.
echo ========================================
echo   PRONTO! Comandos prontos para copiar
echo ========================================
pause
