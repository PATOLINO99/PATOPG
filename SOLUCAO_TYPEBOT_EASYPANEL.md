# 🎯 SOLUÇÃO: Configurar Typebot no Easypanel

## ❌ **PROBLEMA IDENTIFICADO:**

O Typebot está rodando perfeitamente, mas retorna **404 Not Found** porque:
- ✅ Containers estão rodando
- ✅ Banco de dados conectado
- ✅ Traefik está funcionando
- ❌ **FALTAM os labels do Traefik nos serviços Docker**

**Erro específico:**
```
HTTP/1.1 404 Not Found
```

---

## 🔧 **SOLUÇÃO: Configurar Domínios no Easypanel**

### **Passo 1: Acessar o Easypanel**

1. Abra seu navegador
2. Acesse: `http://167.88.32.155` (IP do servidor) ou o domínio do Easypanel
3. Faça login com suas credenciais

---

### **Passo 2: Configurar o Typebot Viewer**

1. No Easypanel, vá em **"zapscale"** (seu projeto)
2. Clique em **"visualizador typebot"** (typebot-viewer)
3. Vá na aba **"Domínios"** ou **"Domains"**
4. Clique em **"Atualizar Domínio"** ou **"Update Domain"**

**Configure assim:**

#### **HTTPS (Recomendado):**
- **Host**: `zapscale-typebot-viewer.3pvobr.easypanel.host`
- **Caminho**: `/`
- **Protocolo**: `HTTP`
- **Porta**: `3000`

#### **OU use um domínio personalizado:**
- **Host**: `bot.zapscale.pro` (se você tiver configurado DNS)
- **Caminho**: `/`
- **Protocolo**: `HTTP`
- **Porta**: `3000`

5. Clique em **"Salvar"** ou **"Save"**

---

### **Passo 3: Configurar o Typebot Builder**

1. No Easypanel, clique em **"construtor de typebot"** (typebot-builder)
2. Vá na aba **"Domínios"** ou **"Domains"**
3. Clique em **"Atualizar Domínio"** ou **"Update Domain"**

**Configure assim:**

- **Host**: `zapscale-typebot-builder.3pvobr.easypanel.host`
- **Caminho**: `/`
- **Protocolo**: `HTTP`
- **Porta**: `3000`

4. Clique em **"Salvar"** ou **"Save"**

---

### **Passo 4: Reimplantar os Serviços**

Após salvar os domínios:

1. Clique em **"Implantar"** ou **"Deploy"** no **typebot-viewer**
2. Aguarde a implantação concluir
3. Clique em **"Implantar"** ou **"Deploy"** no **typebot-builder**
4. Aguarde a implantação concluir

---

## 🔍 **Verificar se Funcionou**

### **Via SSH:**

```bash
# Aguarde 30 segundos após a implantação, depois execute:
docker service inspect zapscale_typebot-viewer | grep traefik

# Deve retornar labels do Traefik agora!
```

### **Via Navegador:**

Acesse:
- **Viewer**: `https://zapscale-typebot-viewer.3pvobr.easypanel.host`
- **Builder**: `https://zapscale-typebot-builder.3pvobr.easypanel.host`

**Deve funcionar agora!** ✅

---

## ⚠️ **Se ainda der erro 404:**

### **Opção A: Verificar labels manualmente via SSH**

```bash
docker service inspect zapscale_typebot-viewer --format '{{json .Spec.Labels}}' | jq
```

**Deve mostrar algo como:**
```json
{
  "traefik.enable": "true",
  "traefik.http.routers.zapscale-viewer.rule": "Host(`zapscale-typebot-viewer.3pvobr.easypanel.host`)",
  "traefik.http.services.zapscale-viewer.loadbalancer.server.port": "3000"
}
```

---

### **Opção B: Adicionar labels manualmente (AVANÇADO)**

Se o Easypanel não adicionar os labels automaticamente, você pode fazer via SSH:

```bash
docker service update \
  --label-add "traefik.enable=true" \
  --label-add "traefik.http.routers.zapscale-viewer.rule=Host(\`zapscale-typebot-viewer.3pvobr.easypanel.host\`)" \
  --label-add "traefik.http.services.zapscale-viewer.loadbalancer.server.port=3000" \
  --label-add "traefik.http.routers.zapscale-viewer.entrypoints=websecure" \
  --label-add "traefik.http.routers.zapscale-viewer.tls=true" \
  --label-add "traefik.docker.network=easypanel" \
  zapscale_typebot-viewer
```

```bash
docker service update \
  --label-add "traefik.enable=true" \
  --label-add "traefik.http.routers.zapscale-builder.rule=Host(\`zapscale-typebot-builder.3pvobr.easypanel.host\`)" \
  --label-add "traefik.http.services.zapscale-builder.loadbalancer.server.port=3000" \
  --label-add "traefik.http.routers.zapscale-builder.entrypoints=websecure" \
  --label-add "traefik.http.routers.zapscale-builder.tls=true" \
  --label-add "traefik.docker.network=easypanel" \
  zapscale_typebot-builder
```

**Aguarde 30 segundos e teste novamente!**

---

## 🌐 **Usar Domínio Personalizado (bot.zapscale.pro)**

Se você quiser usar seu próprio domínio:

### **1. Configurar DNS:**

No seu provedor de DNS (onde você registrou `zapscale.pro`):

**Adicione registros A:**
```
bot.zapscale.pro    →  167.88.32.155
builder.zapscale.pro →  167.88.32.155
```

### **2. Atualizar variáveis de ambiente:**

No Easypanel:

**Typebot Viewer:**
- `NEXT_PUBLIC_VIEWER_URL` = `https://bot.zapscale.pro`

**Typebot Builder:**
- `NEXTAUTH_URL` = `https://builder.zapscale.pro`
- `NEXT_PUBLIC_VIEWER_URL` = `https://bot.zapscale.pro`

### **3. Configurar domínios no Easypanel:**

**Viewer:**
- Host: `bot.zapscale.pro`
- Porta: `3000`

**Builder:**
- Host: `builder.zapscale.pro`
- Porta: `3000`

### **4. Reimplantar os serviços**

---

## 📊 **Comandos de Diagnóstico Rápido**

```bash
# Ver status dos containers
docker ps | grep typebot

# Ver labels do Traefik
docker service inspect zapscale_typebot-viewer --format '{{json .Spec.Labels}}' | jq

# Testar conectividade
curl -I -k https://zapscale-typebot-viewer.3pvobr.easypanel.host

# Ver logs do Traefik
docker logs easypanel-proxy.1.2jbjis4z9y7t9uwdt93x5loke --tail 20 | grep -v "letsencrypt"
```

---

## ✅ **Checklist de Verificação**

- [ ] Domínios configurados no Easypanel
- [ ] Serviços reimplantados
- [ ] Labels do Traefik presentes nos serviços
- [ ] Teste via curl retorna 200 ou 301/302 (não 404)
- [ ] Acesso via navegador funciona
- [ ] Certificado SSL funcionando (ou ignorar por enquanto)

---

## 🆘 **Se nada funcionar:**

Execute este comando via SSH e me envie o resultado:

```bash
docker service inspect zapscale_typebot-viewer --format '{{json .Spec}}' | jq '.Labels'
```

Isso vai me mostrar exatamente quais labels estão configurados! 🚀
