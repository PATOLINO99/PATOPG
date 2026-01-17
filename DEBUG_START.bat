@echo off
echo ==========================================
echo   MODO DE DEBUG - DIAGNOSTICO DETALHADO
echo ==========================================
echo.
echo [1] Verificando versoes...
echo NODE VERSION: > debug_log.txt
node -v >> debug_log.txt 2>&1
echo NPM VERSION: >> debug_log.txt
call npm -v >> debug_log.txt 2>&1
echo.

echo [2] Tentando instalar dependencias...
echo (Isso pode demorar, aguarde)...
call npm install >> debug_log.txt 2>&1
if %errorlevel% neq 0 (
    echo [FALHA] Erro no npm install. Verifique debug_log.txt
) else (
    echo [SUCESSO] Dependencias instaladas.
)
echo.

echo [3] Tentando iniciar o servidor...
echo O resultado sera salvo em debug_log.txt
echo Tente acessar http://localhost:3000 apos alguns segundos.
echo.
call npm run dev >> debug_log.txt 2>&1

echo.
echo ==========================================
echo   FIM DO SCRIPT
echo ==========================================
pause
