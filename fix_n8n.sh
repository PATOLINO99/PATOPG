#!/bin/bash

echo "🔍 Buscando container do n8n..."
# Tenta encontrar qualquer container que tenha 'n8n' no nome ou na imagem
CONTAINER_ID=$(docker ps -a -q --filter "name=n8n")

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ Nenhum container n8n encontrado pelo nome."
    echo "🔍 Tentando buscar pela imagem n8nio/n8n..."
    CONTAINER_ID=$(docker ps -a -q --filter "ancestor=n8nio/n8n")
fi

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ CRÍTICO: Container n8n não encontrado. Verifique se ele foi instalado."
    exit 1
fi

echo "✅ Container encontrado: $CONTAINER_ID"

echo "📊 Verificando logs recentes (últimas 20 linhas)..."
docker logs --tail 20 $CONTAINER_ID

echo "---------------------------------------------------"
echo "🛠️ OPÇÕES DE RECUPERAÇÃO:"
echo "1 - Reiniciar o container (Recomendado para 'Connection Lost')"
echo "2 - Remover e reinstalar o container (MANTÉM DADOS se usar volumes persistentes do Easypanel)"
echo "3 - DESTRUIR TUDO e reinstalar (Wipe completo - APAGA DADOS do n8n interno)"
echo "4 - Sair"
echo "---------------------------------------------------"

read -p "Escolha uma opção [1-4]: " OPTION

case $OPTION in
    1)
        echo "🔄 Reiniciando n8n..."
        docker restart $CONTAINER_ID
        echo "✅ Reiniciado! Aguarde 1-2 minutos e tente acessar o n8n."
        ;;
    2)
        echo "♻️ Removendo container..."
        SERVICE_NAME=$(docker inspect --format '{{.Config.Labels.com.docker.compose.service}}' $CONTAINER_ID)
        if [ -z "$SERVICE_NAME" ]; then
            # Se não for docker compose, tenta label do swarm ou apenas remove
             docker rm -f $CONTAINER_ID
             echo "⚠️ Container removido. Como você usa Easypanel, ele deve reiniciar automaticamente ou você precisa clicar em 'Deploy' no painel."
        else
            echo "⚠️ Service Name detectado: $SERVICE_NAME"
            docker rm -f $CONTAINER_ID
            echo "✅ Container removido. O Easypanel deve recriá-lo automaticamente."
        fi
        ;;
    3)
        echo "🛑 ATENÇÃO: Isso vai apagar o container E tentar limpar volumes associados."
        echo "⚠️  Tem certeza? (s/n)"
        read -p "> " CONFIRM
        if [ "$CONFIRM" == "s" ]; then
            docker rm -f $CONTAINER_ID
            # Tentar achar o volume
            VOLUME_NAME=$(docker inspect --format '{{range .Mounts}}{{if eq .Type "volume"}}{{.Name}}{{end}}{{end}}' $CONTAINER_ID)
            if [ ! -z "$VOLUME_NAME" ]; then
                echo "🗑️ Removendo volume: $VOLUME_NAME"
                docker volume rm $VOLUME_NAME
            else
                echo "⚠️ Nenhum volume nomeado encontrado ou bind mount usado."
            fi
            echo "✅ Limpeza concluída. Vá no Easypanel e clique em 'Deploy' ou 'Rebuild' para reinstalar do zero."
        else
            echo "Cancelado."
        fi
        ;;
    *)
        echo "Saindo..."
        ;;
esac
