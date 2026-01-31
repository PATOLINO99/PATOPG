@echo off
echo --- RESTAURANDO DASHBOARD ORIGINAL ---
git checkout HEAD^ -- app/painel/page.js
echo.
echo --- ENVIANDO PARA O GITHUB ---
git add app/painel/page.js
git commit -m "Restaurando Dashboard Oficial"
git push origin main
echo.
echo --- TUDO PRONTO NO PC ---
echo Agora vá no terminal SSH e rode o comando de atualização para ver seu site no ar!
pause
