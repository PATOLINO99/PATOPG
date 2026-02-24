@echo off
chcp 65001 >nul
color 0A
cls

echo ========================================================
echo   🚀 ZAPSCALE DEPLOYMENT ASSISTANT (Senior Dev Mode)
echo ========================================================
echo.
echo [1/3] Abrindo pasta com os arquivos JSON gerados...
start explorer "c:\Users\gui\Downloads"
timeout /t 2 >nul

echo [2/3] Abrindo Typebot e N8N no navegador...
start https://bot.zapscale.pro/typebots
start https://n8n.zapscale.pro/workflows
timeout /t 2 >nul

echo.
echo ========================================================
echo   📋 LISTA DE TAREFAS (Siga na ordem):
echo ========================================================
echo.
echo 1. No TYPEBOT (Aba aberta):
echo    - Clique em "Create a typebot" -> "Import from file".
echo    - Arraste o arquivo "TYPEBOT_ZAPSCALE_VENDAS.json".
echo    - Publique e COPIE o "Public ID" (parte final da URL).
echo.
echo 2. No N8N (Aba aberta):
echo    - Crie um novo workflow.
echo    - Clique nos 3 pontinhos (canto superior) -> "Import from File".
echo    - Selecione "N8N_ZAPSCALE_TYPEBOT_BRIDGE.json".
echo    - Abra o node "Chamar Typebot" e COLE o ID no lugar de "DIGITE_SEU_TYPEBOT_PUBLIC_ID_AQUI".
echo    - Clique em "Save" e "Activate".
echo.
echo ========================================================
echo   ✅ Tudo pronto! O script pausara aqui para voce ler.
echo ========================================================
pause
