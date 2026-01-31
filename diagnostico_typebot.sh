#!/bin/bash

echo "==================================="
echo "DIAGNÓSTICO DO TYPEBOT"
echo "==================================="
echo ""

# Verificar containers Docker
echo "1. Verificando containers do Typebot..."
docker ps | grep typebot

echo ""
echo "2. Verificando logs do Typebot Builder..."
docker logs --tail 50 $(docker ps -q -f name=typebot-builder) 2>&1 | tail -20

echo ""
echo "3. Verificando logs do Typebot Viewer..."
docker logs --tail 50 $(docker ps -q -f name=typebot-viewer) 2>&1 | tail -20

echo ""
echo "4. Verificando conexão com banco de dados..."
docker logs --tail 50 $(docker ps -q -f name=typebot-db) 2>&1 | tail -20

echo ""
echo "5. Verificando Redis..."
docker logs --tail 50 $(docker ps -q -f name=typebot-redis) 2>&1 | tail -20

echo ""
echo "6. Testando conectividade das portas..."
echo "Builder (porta 3000):"
curl -I http://localhost:3000 2>&1 | head -5

echo ""
echo "Viewer (porta 3001):"
curl -I http://localhost:3001 2>&1 | head -5

echo ""
echo "==================================="
echo "DIAGNÓSTICO COMPLETO"
echo "==================================="
