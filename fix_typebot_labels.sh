#!/bin/bash

echo "🔧 Corrigindo labels do Typebot no Traefik..."
echo ""

# Adicionar HOSTNAME e labels no VIEWER
echo "📦 Atualizando Typebot Viewer..."
docker service update \
  --env-add "HOSTNAME=0.0.0.0" \
  --label-add "traefik.enable=true" \
  --label-add "traefik.http.routers.zapscale-viewer.rule=Host(\`zapscale-typebot-viewer.3pvobr.easypanel.host\`)" \
  --label-add "traefik.http.services.zapscale-viewer.loadbalancer.server.port=3000" \
  --label-add "traefik.http.routers.zapscale-viewer.entrypoints=web,websecure" \
  --label-add "traefik.http.routers.zapscale-viewer.tls=true" \
  --label-add "traefik.docker.network=easypanel" \
  zapscale_typebot-viewer

echo ""
echo "📦 Atualizando Typebot Builder..."
# Adicionar HOSTNAME e labels no BUILDER
docker service update \
  --env-add "HOSTNAME=0.0.0.0" \
  --label-add "traefik.enable=true" \
  --label-add "traefik.http.routers.zapscale-builder.rule=Host(\`zapscale-typebot-builder.3pvobr.easypanel.host\`)" \
  --label-add "traefik.http.services.zapscale-builder.loadbalancer.server.port=3000" \
  --label-add "traefik.http.routers.zapscale-builder.entrypoints=web,websecure" \
  --label-add "traefik.http.routers.zapscale-builder.tls=true" \
  --label-add "traefik.docker.network=easypanel" \
  zapscale_typebot-builder

echo ""
echo "⏰ Aguardando 30 segundos para os serviços reiniciarem..."
sleep 30

echo ""
echo "🧪 Testando conectividade..."
echo ""
echo "Viewer:"
curl -I -k https://zapscale-typebot-viewer.3pvobr.easypanel.host 2>&1 | head -1

echo ""
echo "Builder:"
curl -I -k https://zapscale-typebot-builder.3pvobr.easypanel.host 2>&1 | head -1

echo ""
echo "✅ Pronto! Typebot deve estar funcionando agora!"
echo ""
echo "🌐 Acesse:"
echo "   Viewer:  https://zapscale-typebot-viewer.3pvobr.easypanel.host"
echo "   Builder: https://zapscale-typebot-builder.3pvobr.easypanel.host"
