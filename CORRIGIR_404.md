# 🔧 CORREÇÃO RÁPIDA - zapscale.pro não está carregando

## O PROBLEMA
O erro 404 significa que o domínio está ativo, mas a aplicação Next.js não está rodando.

---

## SOLUÇÃO PASSO A PASSO

### ETAPA 1: Verificar o tipo de hospedagem

A Hostinger tem 3 tipos de hospedagem:
1. **Hospedagem Compartilhada** (mais comum) - NÃO suporta Node.js nativamente
2. **VPS** - Suporta Node.js
3. **Cloud Hosting** - Suporta Node.js

**Primeiro, precisamos saber qual você tem:**

1. Acesse: https://hpanel.hostinger.com/
2. Vá em "Websites" → "zapscale.pro"
3. Procure por uma opção chamada **"Node.js"** no menu lateral

**TEM a opção Node.js?** → Vá para ETAPA 2
**NÃO TEM a opção Node.js?** → Vá para SOLUÇÃO ALTERNATIVA abaixo

---

### ETAPA 2: Se você TEM Node.js disponível

#### 2.1 - Limpar e Recomeçar
No painel da Hostinger, vá em:
- **"Advanced"** → **"File Manager"**
- Navegue até `/domains/zapscale.pro/public_html`
- **DELETE TUDO** que estiver lá dentro (limpe a pasta completamente)

#### 2.2 - Acessar SSH
1. No painel, vá em **"Advanced"** → **"SSH Access"**
2. Copie as credenciais SSH (host, porta, usuário, senha)
3. Abra o terminal SSH (pode ser pelo próprio painel ou usando PuTTY no Windows)

#### 2.3 - Executar os comandos (COPIE E COLE UM POR VEZ)

```bash
# 1. Ir para a pasta do domínio
cd ~/domains/zapscale.pro/public_html

# 2. Clonar o repositório
git clone https://github.com/PATOLINO99/PATOPG.git .

# 3. Instalar dependências
npm install

# 4. Configurar Prisma
npx prisma generate
npx prisma db push
npx prisma db seed

# 5. Build do projeto
npm run build

# 6. Instalar PM2 (gerenciador de processos)
npm install -g pm2

# 7. Iniciar a aplicação
pm2 start server.js --name zapscale

# 8. Salvar para reiniciar automaticamente
pm2 save
pm2 startup
```

#### 2.4 - Configurar Proxy Reverso

Agora precisamos fazer o domínio apontar para a aplicação Node.js (porta 3000).

**Opção A: Via painel Node.js da Hostinger**
1. Vá em **"Advanced"** → **"Node.js"**
2. Clique em **"Create Application"**
3. Preencha:
   - Application root: `/domains/zapscale.pro/public_html`
   - Application URL: `https://zapscale.pro`
   - Application startup file: `server.js`
   - Node version: 18.x ou 20.x
4. Clique em **"Create"** e depois **"Start"**

**Opção B: Configurar .htaccess (se não tiver painel Node.js)**

Crie um arquivo `.htaccess` na pasta `public_html`:

```bash
cat > .htaccess << 'EOF'
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
EOF
```

---

## SOLUÇÃO ALTERNATIVA: Se NÃO tem Node.js (Hospedagem Compartilhada)

Se sua hospedagem não suporta Node.js, você tem 2 opções:

### Opção 1: Fazer upgrade para VPS/Cloud (Recomendado)
- Vá em "Billing" → "Upgrade"
- Escolha um plano VPS ou Cloud (a partir de ~R$20/mês)
- Depois siga a ETAPA 2 acima

### Opção 2: Exportar como site estático (Limitado)

**ATENÇÃO:** Isso vai funcionar PARCIALMENTE. O admin e funcionalidades dinâmicas NÃO vão funcionar, apenas a visualização da landing page.

Execute no seu computador:

```bash
# 1. Abra o PowerShell na pasta do projeto
cd C:\Users\gui\Desktop\Cpy

# 2. Instale dependências
npm install

# 3. Faça o build estático
npm run build

# 4. Exporte
npx next export
```

Depois, faça upload da pasta `out` para o File Manager da Hostinger em `/domains/zapscale.pro/public_html`

---

## VERIFICAÇÃO FINAL

Depois de seguir os passos, teste:

1. Acesse: https://zapscale.pro
2. Se aparecer a página inicial → SUCESSO! ✅
3. Se ainda der 404 → Me envie uma captura de tela do painel SSH mostrando o resultado do comando:
   ```bash
   pm2 status
   pm2 logs zapscale --lines 50
   ```

---

## CHECKLIST DE DIAGNÓSTICO

Me responda essas perguntas para eu poder ajudar melhor:

- [ ] Você tem acesso SSH na Hostinger?
- [ ] Aparece a opção "Node.js" no painel da Hostinger?
- [ ] Qual plano de hospedagem você contratou? (Compartilhado/VPS/Cloud)
- [ ] Você conseguiu executar os comandos SSH ou teve algum erro?
- [ ] Se teve erro, qual foi a mensagem exata?
