@echo off
echo --- SISTEMA DE LOGIN IMPLEMENTADO ---
echo 1. Instalando dependencias (jose, bcryptjs)...
call INSTALAR_AUTH.bat
echo.
echo 2. Aplicando Schema do Banco...
call APPEND_SCHEMA.bat
npm install
npx prisma generate
echo.
echo 3. Enviando para o GitHub...
git add .
git commit -m "Implementando Sistema de Login e Setup"
git push origin main
echo.
echo --- TUDO PRONTO PARA DEPLOY ---
echo Agora v no SSH e rode o comando de atualizao para colocar no ar!
pause
