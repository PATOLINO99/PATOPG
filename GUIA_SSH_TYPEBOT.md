# 🔧 Guia: Acessar e Corrigir Typebot via SSH

## 📋 Informações de Acesso
- **Email/Usuário**: suport@zapscale.pro
- **Senha**: Santgui@121018
- **Domínio**: zapscale.pro

---

## 🚀 Passo 1: Conectar via SSH

Abra o PowerShell ou Terminal e execute:

```bash
ssh root@zapscale.pro
# OU se o usuário for diferente:
ssh suport@zapscale.pro
```

Quando solicitar a senha, digite: `Santgui@121018`

---

## 🔍 Passo 2: Verificar Status dos Containers

Após conectar, execute os seguintes comandos:

### Ver todos os containers do Typebot:
```bash
docker ps | grep typebot
```

### Ver TODOS os containers (incluindo parados):
```bash
docker ps -a | grep typebot
```

---

## 📊 Passo 3: Verificar Logs (IMPORTANTE!)

### Logs do Typebot Builder:
```bash
docker logs typebot-builder --tail 100
```

### Logs do Typebot Viewer:
```bash
docker logs typebot-viewer --tail 100
```

### Logs do Banco de Dados:
```bash
docker logs typebot-db --tail 100
```

### Logs do Redis:
```bash
docker logs typebot-redis --tail 100
```

---

## 🔄 Passo 4: Reiniciar Serviços

Se os containers estiverem parados ou com erro:

### Reiniciar o Builder:
```bash
docker restart typebot-builder
```

### Reiniciar o Viewer:
```bash
docker restart typebot-viewer
```

### Reiniciar TODOS os serviços do Typebot:
```bash
docker restart typebot-builder typebot-viewer typebot-db typebot-redis
```

---

## 🌐 Passo 5: Testar Conectividade

### Testar porta 3000 (Builder):
```bash
curl -I http://localhost:3000
```

### Testar porta 3001 (Viewer):
```bash
curl -I http://localhost:3001
```

### Testar domínio externo:
```bash
curl -I https://zapscale-typebot-viewer.9jvobr.easypanel.host
```

---

## 🛠️ Passo 6: Verificar Variáveis de Ambiente

### Ver configuração do Builder:
```bash
docker inspect typebot-builder | grep -A 20 "Env"
```

### Ver configuração do Viewer:
```bash
docker inspect typebot-viewer | grep -A 20 "Env"
```

---

## ⚠️ Problemas Comuns e Soluções

### Problema 1: Container parado
**Solução:**
```bash
docker start typebot-builder
docker start typebot-viewer
```

### Problema 2: Erro de conexão com banco de dados
**Verificar se o banco está rodando:**
```bash
docker ps | grep typebot-db
```

**Se não estiver, iniciar:**
```bash
docker start typebot-db
sleep 5
docker restart typebot-builder typebot-viewer
```

### Problema 3: Erro 404 ou "Page not found"
**Verificar variáveis de ambiente:**
```bash
docker exec typebot-builder env | grep NEXT_PUBLIC
docker exec typebot-viewer env | grep NEXT_PUBLIC
```

**Verificar se as URLs estão corretas:**
- `NEXT_PUBLIC_VIEWER_URL` deve apontar para o domínio do viewer
- `NEXTAUTH_URL` deve apontar para o domínio do builder

### Problema 4: Porta já em uso
**Verificar o que está usando a porta:**
```bash
netstat -tulpn | grep :3000
netstat -tulpn | grep :3001
```

---

## 🔧 Passo 7: Executar Diagnóstico Completo

Copie o script de diagnóstico para o servidor:

```bash
# No seu computador local (PowerShell):
scp diagnostico_typebot.sh root@zapscale.pro:/root/

# No servidor SSH:
chmod +x /root/diagnostico_typebot.sh
./diagnostico_typebot.sh
```

---

## 📝 Passo 8: Verificar Configuração no Easypanel

Baseado nas suas imagens, verifique:

1. **Variáveis de Ambiente do Builder** devem incluir:
   - `DATABASE_URL`
   - `ENCRYPTION_SECRET`
   - `NEXTAUTH_URL`
   - `NEXT_PUBLIC_VIEWER_URL`
   - `SMTP_*` (configurações de email)

2. **Variáveis de Ambiente do Viewer** devem incluir:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_VIEWER_URL`
   - `ENCRYPTION_SECRET`

3. **Domínios configurados corretamente:**
   - Builder: `zapscale-typebot-viewer.9jvobr.easypanel.host` (porta 3000)
   - Viewer: deve ter seu próprio domínio (porta 3001)

---

## 🎯 Comandos Rápidos de Emergência

### Parar tudo:
```bash
docker stop typebot-builder typebot-viewer typebot-db typebot-redis
```

### Iniciar tudo na ordem correta:
```bash
docker start typebot-db
sleep 5
docker start typebot-redis
sleep 3
docker start typebot-builder
sleep 3
docker start typebot-viewer
```

### Ver status em tempo real:
```bash
watch -n 2 'docker ps | grep typebot'
```

---

## 📞 Próximos Passos

Depois de executar os comandos acima, me envie:
1. A saída do comando `docker ps | grep typebot`
2. Os últimos 50 logs do builder e viewer
3. Qualquer mensagem de erro que aparecer

Assim poderei ajudá-lo a resolver o problema específico! 🚀
