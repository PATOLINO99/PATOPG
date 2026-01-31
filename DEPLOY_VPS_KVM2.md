# 🚀 DEPLOY ZAPSCALE.PRO - VPS KVM2 HOSTINGER

## PASSO A PASSO COMPLETO PARA VPS

### PASSO 1: Conectar via SSH

1. Acesse o painel: https://hpanel.hostinger.com/
2. Vá em **"VPS"** → Selecione seu servidor KVM2
3. Copie as informações de SSH:
   - **IP do servidor**
   - **Porta SSH** (geralmente 22)
   - **Usuário** (geralmente root ou seu usuário)
   - **Senha**

4. Conecte via SSH:
   - **Windows**: Use PuTTY ou o terminal SSH do painel
   - **Ou use o terminal do próprio painel da Hostinger** (mais fácil)

---

### PASSO 2: Instalar Node.js e dependências (se ainda não tiver)

Cole esses comandos **um por vez** no terminal SSH:

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20.x (versão LTS recomendada)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalação
node -v
npm -v

# Instalar PM2 (gerenciador de processos)
sudo npm install -g pm2

# Instalar Nginx (servidor web)
sudo apt install -y nginx

# Instalar Git (se não tiver)
sudo apt install -y git
```

---

### PASSO 3: Configurar o projeto

```bash
# Criar pasta para o projeto
sudo mkdir -p /var/www/zapscale
cd /var/www/zapscale

# Clonar o repositório
sudo git clone https://github.com/PATOLINO99/PATOPG.git .

# Dar permissões corretas
sudo chown -R $USER:$USER /var/www/zapscale

# Instalar dependências
npm install

# Configurar Prisma
npx prisma generate
npx prisma db push
npx prisma db seed

# Build do Next.js
npm run build
```

---

### PASSO 4: Iniciar a aplicação com PM2

```bash
# Iniciar o servidor
pm2 start server.js --name zapscale

# Configurar para iniciar automaticamente ao reiniciar o servidor
pm2 startup
pm2 save

# Verificar se está rodando
pm2 status
pm2 logs zapscale
```

Se tudo estiver OK, você verá a mensagem: `> Ready on http://0.0.0.0:3000`

---

### PASSO 5: Configurar Nginx como Proxy Reverso

Agora vamos fazer o domínio zapscale.pro apontar para a aplicação Node.js:

```bash
# Criar arquivo de configuração do Nginx
sudo nano /etc/nginx/sites-available/zapscale.pro
```

**Cole este conteúdo** (use Ctrl+Shift+V para colar no terminal):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name zapscale.pro www.zapscale.pro;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Salve e saia:**
- Pressione `Ctrl + X`
- Pressione `Y` (Yes)
- Pressione `Enter`

```bash
# Ativar o site
sudo ln -s /etc/nginx/sites-available/zapscale.pro /etc/nginx/sites-enabled/

# Remover configuração padrão (se existir)
sudo rm -f /etc/nginx/sites-enabled/default

# Testar configuração do Nginx
sudo nginx -t

# Se aparecer "test is successful", reinicie o Nginx
sudo systemctl restart nginx

# Verificar status
sudo systemctl status nginx
```

---

### PASSO 6: Configurar SSL (HTTPS) com Let's Encrypt

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obter certificado SSL (SUBSTITUA o email pelo seu)
sudo certbot --nginx -d zapscale.pro -d www.zapscale.pro --email santgui38@gmail.com --agree-tos --no-eff-email

# Configurar renovação automática
sudo certbot renew --dry-run
```

---

### PASSO 7: Configurar Firewall (Segurança)

```bash
# Permitir SSH, HTTP e HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Verificar status
sudo ufw status
```

---

### PASSO 8: Verificar DNS do domínio

**IMPORTANTE:** Certifique-se de que o domínio zapscale.pro está apontando para o IP do seu VPS:

1. No painel da Hostinger, vá em **"Domains"** → **"zapscale.pro"**
2. Vá em **"DNS / Name Servers"**
3. Verifique se tem um registro **A** apontando para o IP do seu VPS KVM2
4. Se não tiver, adicione:
   - **Type:** A
   - **Name:** @ (ou deixe em branco)
   - **Points to:** [IP do seu VPS]
   - **TTL:** 3600

5. Adicione também para www:
   - **Type:** A
   - **Name:** www
   - **Points to:** [IP do seu VPS]
   - **TTL:** 3600

**Aguarde 5-15 minutos** para a propagação do DNS.

---

### PASSO 9: Testar o site

Depois de aguardar a propagação do DNS:

1. Acesse: **https://zapscale.pro**
2. Deve carregar a landing page! ✅
3. Teste o admin: **https://zapscale.pro/admin/site-editor**
   - Senha: `Sant@1210`

---

## 🔄 COMANDOS ÚTEIS

### Ver logs da aplicação:
```bash
pm2 logs zapscale
```

### Reiniciar aplicação:
```bash
pm2 restart zapscale
```

### Atualizar o site com novas mudanças:
```bash
cd /var/www/zapscale
git pull origin main
npm install
npx prisma generate
npx prisma db push
npm run build
pm2 restart zapscale
```

### Ver status do Nginx:
```bash
sudo systemctl status nginx
```

### Reiniciar Nginx:
```bash
sudo systemctl restart nginx
```

---

## ⚠️ TROUBLESHOOTING

### Site ainda mostra 404:
```bash
# Verificar se a aplicação está rodando
pm2 status

# Ver logs de erro
pm2 logs zapscale --lines 50

# Verificar Nginx
sudo nginx -t
sudo systemctl status nginx

# Verificar se a porta 3000 está escutando
sudo netstat -tulpn | grep 3000
```

### Erro de permissão:
```bash
sudo chown -R $USER:$USER /var/www/zapscale
```

### Erro no Prisma:
```bash
cd /var/www/zapscale
npx prisma db push --force-reset
npx prisma db seed
pm2 restart zapscale
```

---

## 📞 PRÓXIMOS PASSOS

Execute os comandos acima e me avise:
- ✅ Se deu certo em qual passo
- ❌ Se deu erro, me envie a mensagem de erro exata
