
@echo off
echo --- 1. Gerando Cliente Prisma ---
call npx prisma generate

echo.
echo --- 2. Atualizando Banco de Dados ---
call npx prisma db push

echo.
echo --- 3. Populando Dados (Seed) ---
call npx prisma db seed

echo.
echo --- 4. Enviando Correcoes para o GitHub ---
git add .
git commit -m "Fix prisma seed execution and settings"
git push origin main

echo.
echo --- SUCESSO! O Site deve estar corrigido agora. ---
echo Pressione qualquer tecla para fechar...
pause


