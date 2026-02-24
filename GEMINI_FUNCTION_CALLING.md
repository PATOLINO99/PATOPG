# 🤖 Integração Gemini IA + ZapScale (Function Calling)

Este documento descreve como configurar a IA Gemini para gerenciar agendamentos diretamente na sua API/Banco de Dados.

## 1. Configuração de Autenticação
A IA deve enviar o seguinte cabeçalho em todas as requisições:
- **Header:** `Authorization`
- **Valor:** `Bearer zapscale_gemini_token_2026`

## 2. Definição das Ferramentas (Tools JSON)

Cole estas definições na configuração do seu Agente de IA (ex: n8n AI Agent Tool):

```json
[
  {
    "name": "checkAvailability",
    "description": "Consulta horários disponíveis para uma data específica (YYYY-MM-DD). Use antes de tentar agendar.",
    "parameters": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string",
          "description": "Data no formato YYYY-MM-DD (ex: 2026-03-15)"
        }
      },
      "required": ["date"]
    }
  },
  {
    "name": "createAppointment",
    "description": "Cria um novo agendamento no sistema após confirmar disponibilidade.",
    "parameters": {
      "type": "object",
      "properties": {
        "name": { "type": "string", "description": "Nome completo do cliente" },
        "phone": { "type": "string", "description": "WhatsApp/Telefone do cliente" },
        "date": { "type": "string", "description": "Data YYYY-MM-DD" },
        "time": { "type": "string", "description": "Horário escolhido HH:mm" },
        "service": { "type": "string", "description": "Tipo do serviço (opcional)" }
      },
      "required": ["name", "phone", "date", "time"]
    }
  },
  {
    "name": "getAppointments",
    "description": "Retorna lista de agendamentos agendados.",
    "parameters": {
      "type": "object",
      "properties": {
        "date": { "type": "string", "description": "Data opcional (YYYY-MM-DD)" }
      }
    }
  }
]
```

## 3. Endpoints de Integração (URLs)

- **Verificar Disponibilidade:** `https://zapscale.pro/api/availability?date=YYYY-MM-DD`
- **Criar Agendamento:** `https://zapscale.pro/api/appointments` (POST)
- **Cancelar Agendamento:** `https://zapscale.pro/api/appointments/{id}` (DELETE)

## 4. Instruções do Sistema para Gemini
"Você é um assistente de agendamentos da ZapScale. Sempre verifique a disponibilidade usando `checkAvailability` antes de confirmar um horário com o cliente. Nunca agende aos sábados ou domingos. Se o cliente pedir para cancelar, use `getAppointments` para achar o ID e então use `cancelAppointment`."
