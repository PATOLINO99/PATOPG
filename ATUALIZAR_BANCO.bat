@echo off
echo ========================================
echo   ATUALIZANDO BANCO DE DADOS (LOCAL)
echo ========================================
echo.
echo Criando a tabela 'Lead' no banco de dados...
call npx prisma db push
echo.
echo ========================================
echo   PRONTO! Banco atualizado.
echo ========================================
pause
