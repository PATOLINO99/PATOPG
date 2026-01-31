@echo off
echo --- TENTANDO RECUPERAR CODIGO ORIGINAL ---

:: Tenta pegar o arquivo de 5 commits atras (antes da mudanca de nome)
git checkout HEAD~5 -- app/dashboard/page.js

:: Move para a nova pasta
if exist "app\dashboard\page.js" (
    echo Arquivo recuperado! Movendo para painel...
    move /Y "app\dashboard\page.js" "app\painel\page.js"
    rmdir "app\dashboard"
) else (
    echo Nao foi possivel encontrar o arquivo antigo no historico recente.
    echo Tentando HEAD~1...
    git checkout HEAD~1 -- app/painel/page.js
)

:: Envia
echo.
echo --- ENVIANDO PARA O GITHUB ---
git add .
git commit -m "Restauracao Forcada do Painel"
git push origin main

echo.
echo --- FEITO ---
pause
