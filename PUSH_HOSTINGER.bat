
@echo off
echo --- Preparando para Hostinger ---

git add .
git commit -m "Config: Hostinger deployment ready with server.js and standalone mode"
git push origin main

echo.
echo --- Prontinho! Atualizado no GitHub ---
pause
