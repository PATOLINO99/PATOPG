@echo off
echo ==========================================
echo CORRIGINDO CONEXAO - ZAPSCALE.PRO
echo ==========================================
echo.
echo 1. Criando pasta no servidor...
ssh root@167.88.32.155 "mkdir -p /root/zapscale_site"

echo.
echo 2. Enviando arquivo index.html...
echo (Se pedir senha, digite a senha do servidor e de Enter)
scp index.html root@167.88.32.155:/root/zapscale_site/index.html

echo.
echo 3. Reiniciando servico Docker...
echo (Se pedir senha, digite novamente)
ssh root@167.88.32.155 "docker service rm zapscale_landing-page >/dev/null 2>&1"
ssh root@167.88.32.155 "docker service create --name zapscale_landing-page --replicas 1 --label 'traefik.enable=true' --label \"traefik.http.routers.zapscale-landing.rule=Host('zapscale.pro')\" --label 'traefik.http.services.zapscale-landing.loadbalancer.server.port=80' --label 'traefik.http.routers.zapscale-landing.entrypoints=websecure' --label 'traefik.http.routers.zapscale-landing.tls.certresolver=myresolver' --mount type=bind,source=/root/zapscale_site/index.html,target=/usr/share/nginx/html/index.html nginx:alpine"

echo.
echo ==========================================
echo PROCESSO FINALIZADO!
echo Aguarde 10 segundos e atualize o site (Ctrl+F5).
echo ==========================================
pause
