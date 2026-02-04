@echo off
echo ==========================================
echo INICIANDO ATUALIZACAO FORCADA - ZAPSCALE.PRO
echo ==========================================
echo.
echo 1. Enviando index.html para o servidor...
type index.html | ssh root@167.88.32.155 "mkdir -p /root/zapscale_site && cat > /root/zapscale_site/index.html"

echo.
echo 2. Removendo servico antigo...
ssh root@167.88.32.155 "docker service rm zapscale_landing-page"

echo.
echo 3. Criando novo servico NGINX (Porta 80)...
ssh root@167.88.32.155 "docker service create --name zapscale_landing-page --replicas 1 --label 'traefik.enable=true' --label \"traefik.http.routers.zapscale-landing.rule=Host('zapscale.pro')\" --label 'traefik.http.services.zapscale-landing.loadbalancer.server.port=80' --label 'traefik.http.routers.zapscale-landing.entrypoints=websecure' --label 'traefik.http.routers.zapscale-landing.tls.certresolver=myresolver' --mount type=bind,source=/root/zapscale_site/index.html,target=/usr/share/nginx/html/index.html nginx:alpine"

echo.
echo ==========================================
echo PROCESSO FINALIZADO!
echo Verifique acima se houve erros.
echo Se tudo deu certo, aguarde 10 segundos e recarregue o site.
echo ==========================================
pause
