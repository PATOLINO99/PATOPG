@echo off
title ZapScale - TESTE DE CONEXAO
cls
echo [1/2] Iniciando servidor de teste ultra-leve...
echo.
echo Se o seu Node estiver funcionando, voce vera uma mensagem abaixo.
echo.
start /b node test_server.js
timeout /t 3 /nobreak > nul
echo.
echo [2/2] Tente abrir este link agora: http://127.0.0.1:3005
echo.
echo Se este link funcionar e o site principal nao, o problema esta no Next.js.
echo Se este link TAMBEM der "Conexao Recusada", seu Node.js nao esta funcionando.
echo.
pause
taskkill /f /im node.exe > nul 2>&1
