@echo off
color 0A
echo ========================================================
echo   FINALIZANDO PROJETO: PATOweb
echo ========================================================
echo.

echo [1/3] Atualizando GitHub (Nuvem)...
git add .
git commit -m "Backup Final PATOweb"
git branch -M main
git remote remove origin
git remote add origin https://github.com/PATOLINO99/PATOPG.git
git push -u origin main --force

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERRO] Nao foi possivel enviar para o GitHub.
    echo Verifique sua internet ou login.
    pause
    exit /b
)

echo.
echo [2/3] Criando pasta PATOweb na Area de Trabalho...
cd ..
if exist "PATOweb" (
    echo A pasta PATOweb ja existe. Atualizando arquivos...
) else (
    mkdir "PATOweb"
)

echo Copiando arquivos (Isso pode demorar um pouco)...
xcopy "Cpy\*.*" "PATOweb" /E /H /C /I /Y >nul

echo.
echo [3/3] FINALIZADO!
echo.
echo --------------------------------------------------------
echo 1. SEU SITE ESTA SALVO NO COMPUTADOR:
echo    Pasta: Area de Trabalho \ PATOweb
echo.
echo 2. SEU SITE ESTA NA NUVEM (Acesse de qualquer lugar):
echo    Link: https://github.com/PATOLINO99/PATOPG
echo --------------------------------------------------------
pause
