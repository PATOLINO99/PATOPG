#!/bin/bash

echo "🔧 Corrigindo labels do Evolution API no Traefik..."
echo ""

# Adicionar labels do Traefik no Evolution API
echo "📦 Atualizando Evolution API..."
docker service update \
  --env-add "SERVER_URL=https://evo.zapscale.pro" \
  --label-add "traefik.enable=true" \
  --label-add "traefik.http.routers.zapscale-evolution.rule=Host(\`evo.zapscale.pro\`)" \
  --label-add "traefik.http.services.zapscale-evolution.loadbalancer.server.port=8080" \
  --label-add "traefik.http.routers.zapscale-evolution.entrypoints=web,websecure" \
  --label-add "traefik.http.routers.zapscale-evolution.tls=true" \
  --label-add "traefik.docker.network=easypanel" \
  zapscale_evolution-api

echo ""
echo "⏰ Aguardando 30 segundos para o serviço reiniciar..."
sleep 30

echo ""
echo "🧪 Testando conectividade..."
curl -I -k https://evo.zapscale.pro 2>&1 | head -1

echo ""
echo "✅ Pronto! Evolution API deve estar funcionando agora!"
echo ""
echo "🌐 Acesse: https://evo.zapscale.pro"
echo ""
echo "📚 Documentação da API: https://evo.zapscale.pro/manager"
