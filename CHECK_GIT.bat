@echo off
echo ==========================================
echo   VERIFICADOR DE GIT
echo ==========================================
echo.
git --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [X] O GIT NAO ESTA INSTALADO!
    echo.
    echo Voce precisa instalar o Git para enviar arquivos.
    echo Baixe aqui: https://git-scm.com/download/win
    echo (Instale e depois reinicie o computador)
) else (
    color 0A
    echo [OK] O GIT ESTA INSTALADO!
    echo.
    echo Se o envio falhou, o problema e permissao ou login.
    echo Por favor, tire foto do erro que aparece no outro arquivo.
)
echo.
pause
