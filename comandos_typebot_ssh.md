# 🔧 Comandos para Diagnosticar Typebot via SSH

## ✅ VOCÊ JÁ ESTÁ CONECTADO! Agora execute os comandos abaixo:

---

## 1️⃣ VERIFICAR STATUS DOS CONTAINERS

```bash
docker ps | grep typebot
```

**O que esperar:**
- Deve mostrar 4 containers: typebot-builder, typebot-viewer, typebot-db, typebot-redis
- Status deve ser "Up" (rodando)

---

## 2️⃣ VER TODOS OS CONTAINERS (INCLUINDO PARADOS)

```bash
docker ps -a | grep typebot
```

**Se algum container estiver "Exited" (parado), anote qual é!**

---

## 3️⃣ VERIFICAR LOGS DO BUILDER

```bash
docker logs typebot-builder --tail 50
```

**Procure por:**
- ❌ Erros de conexão com banco de dados
- ❌ Erros de variáveis de ambiente
- ✅ Mensagens de "Server started" ou "Ready"

---

## 4️⃣ VERIFICAR LOGS DO VIEWER

```bash
docker logs typebot-viewer --tail 50
```

**Procure por:**
- ❌ Erros 404
- ❌ Erros de conexão
- ✅ Mensagens de sucesso

---

## 5️⃣ VERIFICAR BANCO DE DADOS

```bash
docker logs typebot-db --tail 30
```

**Deve mostrar:**
- ✅ "database system is ready to accept connections"

---

## 6️⃣ TESTAR CONECTIVIDADE DAS PORTAS

```bash
curl -I http://localhost:3000
```

```bash
curl -I http://localhost:3001
```

**Deve retornar:**
- ✅ HTTP/1.1 200 OK ou HTTP/1.1 301/302 (redirecionamento)
- ❌ Connection refused = container não está rodando
- ❌ 404 Not Found = problema de configuração

---

## 🔄 COMANDOS DE CORREÇÃO RÁPIDA

### Se os containers estiverem parados:

```bash
docker start typebot-db
sleep 5
docker start typebot-redis
sleep 3
docker start typebot-builder
sleep 3
docker start typebot-viewer
```

### Se estiverem rodando mas com erro:

```bash
docker restart typebot-db
sleep 5
docker restart typebot-redis
docker restart typebot-builder
docker restart typebot-viewer
```

---

## 🛠️ VERIFICAR VARIÁVEIS DE AMBIENTE

### Builder:
```bash
docker exec typebot-builder env | grep -E "DATABASE_URL|NEXT_PUBLIC|ENCRYPTION"
```

### Viewer:
```bash
docker exec typebot-viewer env | grep -E "DATABASE_URL|NEXT_PUBLIC|ENCRYPTION"
```

**Variáveis importantes:**
- `DATABASE_URL` - deve apontar para typebot-db
- `NEXT_PUBLIC_VIEWER_URL` - URL do viewer
- `ENCRYPTION_SECRET` - deve existir

---

## 🔍 VERIFICAR REDE DOCKER

```bash
docker network ls
docker network inspect easypanel
```

**Todos os containers do Typebot devem estar na mesma rede!**

---

## 📊 COMANDO COMPLETO DE DIAGNÓSTICO

```bash
echo "=== STATUS DOS CONTAINERS ==="
docker ps | grep typebot
echo ""
echo "=== LOGS DO BUILDER (últimas 20 linhas) ==="
docker logs typebot-builder --tail 20
echo ""
echo "=== LOGS DO VIEWER (últimas 20 linhas) ==="
docker logs typebot-viewer --tail 20
echo ""
echo "=== TESTE DE PORTA 3000 ==="
curl -I http://localhost:3000 2>&1 | head -5
echo ""
echo "=== TESTE DE PORTA 3001 ==="
curl -I http://localhost:3001 2>&1 | head -5
```

---

## 🎯 PRÓXIMOS PASSOS

1. Execute o comando do **Passo 1** primeiro
2. Me envie o resultado
3. Vou te dizer exatamente o que fazer a seguir!

---

## ⚠️ PROBLEMAS COMUNS E SOLUÇÕES RÁPIDAS

### Problema: "Cannot connect to database"
```bash
docker restart typebot-db
sleep 10
docker restart typebot-builder typebot-viewer
```

### Problema: "404 Not Found"
```bash
docker exec typebot-viewer env | grep NEXT_PUBLIC_VIEWER_URL
# Verifique se a URL está correta
```

### Problema: Container não inicia
```bash
docker logs <nome-do-container> --tail 100
# Veja o erro específico
```

---

## 📝 COPIE E COLE ESTE COMANDO PRIMEIRO:

```bash
docker ps | grep typebot
```

**Me mostre o resultado e vou te guiar no próximo passo! 🚀**
