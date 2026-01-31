# 🚀 Deploy do ZapScale no domínio zapscale.pro (Hostinger)

## PASSO 1: Preparar os Arquivos Localmente

1. Execute o arquivo `FIX_AND_PUSH.bat` para garantir que tudo está atualizado no GitHub
2. Aguarde a conclusão (vai gerar o banco, popular dados e enviar para o GitHub)

---

## PASSO 2: Acessar o Painel da Hostinger

1. Acesse: https://hpanel.hostinger.com/
2. Faça login com seu email
3. Vá em **"Websites"** no menu lateral
4. Selecione o domínio **zapscale.pro**

---

## PASSO 3: Configurar Node.js Application

### 3.1 - Ativar Node.js
1. No painel do domínio zapscale.pro, procure por **"Node.js"** ou **"Advanced"** → **"Node.js"**
2. Clique em **"Create Application"** (ou "Setup Node.js App")

### 3.2 - Configurações da Aplicação
Preencha os campos assim:

- **Application Mode**: Production
- **Application Root**: `/domains/zapscale.pro/public_html` (ou similar - use o caminho que aparecer)
- **Application URL**: `https://zapscale.pro` (ou deixe em branco se já estiver preenchido)
- **Application Startup File**: `server.js` (vamos criar esse arquivo)
- **Node.js Version**: Selecione a versão **18.x** ou **20.x** (mais recente disponível)

3. Clique em **"Create"**

---

## PASSO 4: Acessar o Terminal SSH

1. No painel da Hostinger, vá em **"Advanced"** → **"SSH Access"**
2. Ative o SSH se ainda não estiver ativo
3. Clique em **"Open SSH Terminal"** (ou use um cliente SSH como PuTTY)

---

## PASSO 5: Fazer Deploy via Terminal

Cole os comandos abaixo **um por vez** no terminal SSH:

```bash
# 1. Ir para a pasta do domínio
cd ~/domains/zapscale.pro/public_html

# 2. Clonar o repositório do GitHub
git clone https://github.com/PATOLINO99/PATOPG.git .

# 3. Instalar dependências
npm install

# 4. Gerar o Prisma Client
npx prisma generate

# 5. Criar/Atualizar o banco de dados
npx prisma db push

# 6. Popular com dados iniciais
npx prisma db seed

# 7. Fazer o build do Next.js
npm run build
```

---

## PASSO 6: Criar o Arquivo server.js

Ainda no terminal SSH, execute:

```bash
cat > server.js << 'EOF'
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = false
const hostname = '0.0.0.0'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
EOF
```

---

## PASSO 7: Iniciar a Aplicação

### Opção A: Via Painel Hostinger
1. Volte para o painel **Node.js** da Hostinger
2. Encontre sua aplicação
3. Clique em **"Start"** ou **"Restart"**

### Opção B: Via Terminal (com PM2 - Recomendado)
```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar a aplicação
pm2 start server.js --name zapscale

# Salvar configuração para reiniciar automaticamente
pm2 save
pm2 startup
```

---

## PASSO 8: Configurar o Domínio (se necessário)

1. Vá em **"Websites"** → **"zapscale.pro"** → **"Manage"**
2. Em **"Advanced"** → **"Proxy"** ou **"Port Forwarding"**
3. Configure para redirecionar para a porta **3000** (ou a porta que você definiu)

**OU**

Se a Hostinger usar Apache/Nginx como proxy reverso:
1. Vá em **"Advanced"** → **"htaccess"** ou **"Nginx Config"**
2. Configure o proxy reverso para apontar para `http://localhost:3000`

---

## PASSO 9: Testar o Site

1. Abra o navegador
2. Acesse: **https://zapscale.pro**
3. Verifique se o site carrega corretamente
4. Teste o admin em: **https://zapscale.pro/admin/site-editor**
   - Senha: `Sant@1210`

---

## 🔄 Atualizações Futuras

Quando quiser atualizar o site com novas mudanças:

```bash
cd ~/domains/zapscale.pro/public_html
git pull origin main
npm install
npx prisma generate
npx prisma db push
npm run build
pm2 restart zapscale
```

---

## ⚠️ Troubleshooting

### Site não carrega:
- Verifique se a aplicação Node.js está rodando no painel
- Confira os logs: `pm2 logs zapscale`
- Reinicie: `pm2 restart zapscale`

### Erro de banco de dados:
```bash
npx prisma db push --force-reset
npx prisma db seed
```

### Erro de permissões:
```bash
chmod -R 755 ~/domains/zapscale.pro/public_html
```

---

## 📞 Suporte

Se encontrar algum erro específico durante o processo, me envie a mensagem de erro e posso ajudar a resolver!
