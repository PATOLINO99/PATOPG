@echo off
echo ==========================================
echo   TENTATIVA 2 - GITHUB FORCADO
echo ==========================================
echo.

echo [1/6] Configurando Git...
call git config --global user.email "voce@exemplo.com"
call git config --global user.name "Seu Nome"
call git init

echo.
echo [2/6] Adicionando arquivos...
call git add .

echo.
echo [3/6] Criando Commit...
call git commit -m "Upload Automatico ZapScale"

echo.
echo [4/6] Verificando Branch...
call git branch -M main

echo.
echo [5/6] Conectando ao GitHub...
call git remote remove origin 2>nul
call git remote add origin https://github.com/PATOLINO99/PATOPG.git

echo.
echo [6/6] ENVIANDO (Aparecera uma janela de login)...
call git push -u origin main --force

if %errorlevel% neq 0 (
    echo.
    echo ===================================================
    echo [ERRO] NAO FOI POSSIVEL ENVIAR.
    echo.
    echo 1. Verifique se sua internet esta conectada.
    echo 2. Verifique se voce fez login na janelinha que abriu.
    echo 3. TIRE UMA FOTO DESSA TELA PRETA e me mande.
    echo ===================================================
    pause
    exit /b
)

echo.
echo ==========================================
echo   SUCESSO TOTAL! PROJETO ENVIADO.
echo ==========================================
pause
