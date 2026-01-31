#!/bin/bash

# Define o diretório do projeto
PROJECT_DIR=~/domains/zapscale.pro/public_html

echo "🚀 Iniciando processo de reparo e rebuild do ZapScale..."

# 1. Navegar para o diretório
cd $PROJECT_DIR || { echo "❌ Diretório não encontrado: $PROJECT_DIR"; exit 1; }
echo "📂 Diretório acessado: $(pwd)"

# 2. Atualizar código do GitHub (para pegar a correção do revalidatePath)
echo "⬇️ Atualizando código do GitHub..."
git fetch --all
git reset --hard origin/main

# 3. Remover Cache e Node Modules (Limpeza Profunda)
echo "🧹 Limpando caches (.next, node_modules)..."
rm -rf .next
# rm -rf node_modules (Opcional, demorado. Descomente se necessário)

# 4. Instalar Dependências
echo "📦 Instalando dependências..."
npm install

# 5. Configurar Prisma
echo "🗄️ Gerando Prisma Client..."
npx prisma generate
echo "🔄 Sincronizando Banco de Dados..."
npx prisma db push

# 6. Rebuild do Next.js
echo "🏗️ Criando Build do Next.js..."
npm run build

# 7. Reiniciar PM2 com segurança
echo "🔄 Reiniciando PM2..."
pm2 delete zapscale 2>/dev/null || true
pm2 start server.js --name zapscale
pm2 save

echo "✅ Processo concluído! O site deve estar atualizado."
echo "🌍 Teste agora: https://zapscale.pro"
