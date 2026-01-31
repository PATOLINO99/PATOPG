  @echo off
color 0A
echo ========================================================
echo   TENTATIVA FINAL - DIAGNOSTICO DE ENVIO GITHUB
echo ========================================================
echo.

echo [1/5] Verificando status do Git...
git status
if %errorlevel% neq 0 (
    echo [ERRO] O Git nao parece estar inicializado corretamente.
    echo Tentando inicializar novamente...
    git init
)

echo.
echo [2/5] Adicionando todos os arquivos...
git add .

echo.
echo [3/5] Criando ponto de salvamento (commit)...
git commit -m "Upload Final ZapScale"

echo.
echo [4/5] Conectando ao seu repositorio...
git branch -M main
git remote remove origin
git remote add origin https://github.com/PATOLINO99/PATOPG.git

echo.
echo [5/5] ENVIANDO AGORA...
echo --------------------------------------------------------
echo ATENCAO: Se abrir uma janela de login, faca o login nela!
echo --------------------------------------------------------
echo.
git push -u origin main --force

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo ========================================================
    echo   ERRO AO ENVIAR!
    echo ========================================================
    echo Ocorreu um erro. Por favor, LEIA a mensagem acima ou
    echo TIRE UMA FOTO DESTA TELA e envie para o suporte.
    echo.
    echo Possiveis causas:
    echo 1. Login incorreto ou janela de login fechada.
    echo 2. Internet desconectada.
    echo.
    pause
    exit /b
)

echo.
echo ========================================================
echo   SUCESSO! TUDO ENVIADO.
echo   Verifique em: https://github.com/PATOLINO99/PATOPG
echo ========================================================
pause
