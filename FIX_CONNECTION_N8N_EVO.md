# 🚀 Melhorando a Conexão n8n <-> Evolution API

Para acabar com os erros de conexão ("Connection Lost" ou timeouts), vamos fazer o n8n conversar com a Evolution API pela **Rede Interna** do servidor. É como trocar o Wi-Fi por um cabo de rede direto: mais rápido e nunca cai.

## Passo 1: Garantir que estão na mesma rede (No SSH)

Abra seu terminal SSH e cole este comando para garantir que o n8n consiga "enxergar" a Evolution API internamente:

```bash
docker service update --network-add easypanel zapscale_n8n
```
*(Se disser que já está na rede, tudo bem, apenas ignore).*

## Passo 2: Trocar a URL no n8n

Agora vamos trocar a URL pública (Internet) pela URL interna (Rede Local do Docker).

1. Abra seu fluxo no n8n.
2. Clique no nó **"IA Responder Zap"** (Evolution API).
3. No campo **URL**, apague a atual e coloque esta:

   👉 **URL Interna:**
   ```
   http://zapscale_evolution-api:8080/message/sendText/OrionGSM
   ```

   *(Note que é `http` e não `https`, e usa a porta `8080`)*.

4. **Salve** e teste mandando um "Oi" no WhatsApp.

---

### ❓ Por que isso funciona?
Antes, o n8n saía do servidor para a internet e tentava voltar, o que causava bloqueios. Agora eles conversam diretamente dentro do servidor, sem sair para a rua!
