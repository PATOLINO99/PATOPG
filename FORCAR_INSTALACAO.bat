@echo off
echo ==========================================
echo   TENTATIVA DE FORCA BRUTA
echo ==========================================
echo.

echo [1/4] Limpando cache antigo...
call npm cache clean --force

echo.
echo [2/4] Instalando dependencias (Ignorando scripts)...
call npm install --ignore-scripts --no-audit

echo.
echo [3/4] Gerando arquivos do banco de dados...
call npx prisma generate
call npx prisma db push --accept-data-loss

echo.
echo [4/4] INICIANDO O SITE...
echo.
echo Se tudo der certo, o site vai abrir.
echo Se der erro, TIRE UMA FOTO DESTA TELA.
echo.

start http://localhost:3000
call npm run dev
pause
