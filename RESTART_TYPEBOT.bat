@echo off
COLOR 0A
TITLE RESTART TYPEBOT SERVICES
echo ===================================================
echo      REINICIANDO SERVICOS DO TYPEBOT ZAPSCALE
echo ===================================================
echo.
echo Conectando ao servidor e reiniciando o Typebot...
echo Digite a senha se for solicitado (Sant@1210).
echo.
ssh -t root@167.88.32.155 "echo [SERVER] Identificando servicos Typebot... && docker restart $(docker ps -aq --filter name=typebot) && echo [SERVER] Servicos reiniciados com sucesso!"
echo.
echo ===================================================
echo      Aguarde uns 30 segundos para o site subir.
echo      Depois tente abrir o link do Viewer novamente.
echo ===================================================
pause
