@echo off
COLOR 0E
echo ===================================================
echo      DIAGNOSTICO TYPEBOT - LISTANDO CONTAINERS
echo ===================================================
echo.
echo Conectando...
ssh -t root@167.88.32.155 "docker ps -a | grep typebot"
echo.
echo ===================================================
echo Tire um PRINT dessa tela e mande para o suporte!
echo ===================================================
pause
