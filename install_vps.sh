#!/bin/bash

echo "=========================================="
echo "  INSTALAÇÃO AUTOMÁTICA - ZAPSCALE.PRO"
echo "=========================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para verificar erros
check_error() {
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erro no passo anterior!${NC}"
        exit 1
    fi
}

echo "📦 Atualizando sistema..."
sudo apt update && sudo apt upgrade -y
check_error

echo ""
echo "📥 Instalando Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
check_error

echo ""
echo "✅ Node.js instalado:"
node -v
npm -v

echo ""
echo "📥 Instalando PM2..."
sudo npm install -g pm2
check_error

echo ""
echo "📥 Instalando Nginx..."
sudo apt install -y nginx
check_error

echo ""
echo "📥 Instalando Git..."
sudo apt install -y git
check_error

echo ""
echo "📁 Criando diretório do projeto..."
sudo mkdir -p /var/www/zapscale
cd /var/www/zapscale

echo ""
echo "📥 Clonando repositório..."
sudo git clone https://github.com/PATOLINO99/PATOPG.git .
check_error

echo ""
echo "🔐 Ajustando permissões..."
sudo chown -R $USER:$USER /var/www/zapscale

echo ""
echo "📦 Instalando dependências..."
npm install
check_error

echo ""
echo "🗄️ Configurando banco de dados..."
npx prisma generate
npx prisma db push
npx prisma db seed
check_error

echo ""
echo "🏗️ Fazendo build do Next.js..."
npm run build
check_error

echo ""
echo "🚀 Iniciando aplicação com PM2..."
pm2 start server.js --name zapscale
pm2 startup
pm2 save

echo ""
echo "=========================================="
echo -e "${GREEN}✅ INSTALAÇÃO CONCLUÍDA!${NC}"
echo "=========================================="
echo ""
echo "Próximos passos:"
echo "1. Configure o Nginx (veja DEPLOY_VPS_KVM2.md - PASSO 5)"
echo "2. Configure o SSL (veja DEPLOY_VPS_KVM2.md - PASSO 6)"
echo "3. Configure o DNS (veja DEPLOY_VPS_KVM2.md - PASSO 8)"
echo ""
echo "Verificar status: pm2 status"
echo "Ver logs: pm2 logs zapscale"
echo ""
