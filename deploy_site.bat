@echo off
type index.html | ssh root@167.88.32.155 "mkdir -p /root/zapscale_site && cat > /root/zapscale_site/index.html"
ssh root@167.88.32.155 "docker service update --image nginx:alpine --mount-add type=bind,source=/root/zapscale_site/index.html,target=/usr/share/nginx/html/index.html --label-add traefik.http.services.zapscale-landing.loadbalancer.server.port=80 zapscale_landing-page"
