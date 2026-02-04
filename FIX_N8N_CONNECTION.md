# 🚑 Guia de Recuperação do N8N (Erro Connection Lost)

O erro "Connection lost" no n8n geralmente ocorre quando o servidor (backend) cai ou trava, e a interface (frontend) perde a comunicação WebSocket.

## 🔐 Dados de Acesso SSH
Utilize os dados que encontramos nos seus arquivos de configuração:
- **IP:** `167.88.32.155` (ou `zapscale.pro`)
- **Usuário:** `root`
- **Senha:** `Santgui@121018`

## 🛠️ Como Resolver Passo a Passo

### 1. Conectar ao Servidor
Abra seu terminal (PowerShell ou Git Bash) e rode:

```powershell
ssh root@167.88.32.155
```
*(Digite a senha `Santgui@121018` quando pedir)*

---

### 2. Usar o Script Automático (FÁCIL)
Eu criei um script chamado `fix_n8n.sh` na sua pasta. Você pode copiar o conteúdo dele e colar no servidor, ou rodar os comandos manuais abaixo.

**Para rodar o script automático:**
1. No seu terminal local (fora do SSH), envie o script para o servidor:
   ```powershell
   scp c:\Users\gui\Desktop\Cpy\fix_n8n.sh root@167.88.32.155:/root/
   ```
2. No terminal SSH (dentro do servidor), rode:
   ```bash
   chmod +x fix_n8n.sh
   ./fix_n8n.sh
   ```
3. Escolha a **Opção 1** (Reiniciar) primeiro. Se não funcionar, tente a **Opção 2**.

---

### 3. Solução Manual (Se preferir digitar)

**Reiniciar o n8n (Tenta resolver sem apagar nada):**
```bash
# Encontra e reinicia o container do n8n
docker restart $(docker ps -a -q --filter "ancestor=n8nio/n8n")
```

**Ver logs de erro (Para diagnóstico):**
```bash
docker logs --tail 50 $(docker ps -a -q --filter "ancestor=n8nio/n8n")
```

**Apagar e Reinstalar (Manter Banco de Dados):**
*Isso força o Easypanel a recriar o container.*
```bash
docker rm -f $(docker ps -a -q --filter "ancestor=n8nio/n8n")
# Depois vá no Easypanel > Projeto > n8n > Deploy
```

**Zerar Tudo (Apagar Banco de Dados interno - CUIDADO):**
*Só faça isso se quiser começar do zero absoluto.*
1. Pare o n8n no Easypanel.
2. Rode no SSH:
   ```bash
   docker rm -f $(docker ps -a -q --filter "ancestor=n8nio/n8n")
   # Liste volumes
   docker volume ls | grep n8n
   # Remova o volume (exemplo):
   # docker volume rm zapscale_n8n_data
   ```
3. Dê Deploy novamente no Easypanel.

---

### 💡 Dica Extra
O n8n padrão usa SQLite que pode travar com muitos acessos. O ideal para produção (zapscale) é configurar para usar **Postgres**. Se o erro persistir, considere mudar o banco do n8n para Postgres no Easypanel.
