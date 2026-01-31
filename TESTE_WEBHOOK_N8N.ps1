# ==========================================
# TESTE DE INTEGRAÇÃO N8N - ZAPSCALE
# ==========================================

# --- INSTRUÇÃO ---
# Substitua o texto "COLE_SUA_URL_AQUI" abaixo pela URL do seu Webhook do N8n
# Exemplo: "https://n8n.zapscale.pro/webhook-test/..."

$webhookUrl = "COLE_SUA_URL_AQUI"

# -----------------

# Dados de teste
$payload = @{
    nome = "Teste Automático ZapScale"
    email = "teste@zapscale.pro"
    mensagem = "Verificando integração via Script PowerShell"
    origem = "Script de Teste"
    data = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
} | ConvertTo-Json

cls
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   TESTE DE CONEXAO COM N8N" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

if ($webhookUrl -contains "COLE_SUA_URL_AQUI") {
    Write-Host "⚠️  ATENÇÃO: Você não configurou a URL ainda!" -ForegroundColor Yellow
    Write-Host "Edite este arquivo e coloque sua URL do N8n."
    Write-Host ""
    Write-Host "Pressione ENTER para sair..."
    Read-Host
    exit
}

Write-Host "Enviando dados para: $webhookUrl" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $payload -ContentType "application/json"
    
    Write-Host "✅ SUCESSO! Dados enviados corretamente." -ForegroundColor Green
    Write-Host ""
    Write-Host "Resposta do N8n:" -ForegroundColor White
    $response | ConvertTo-Json -Depth 2
    
} catch {
    Write-Host "❌ ERRO AO CONECTAR" -ForegroundColor Red
    Write-Host "Detalhes do erro:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

Write-Host ""
Write-Host "Pressione ENTER para fechar..."
Read-Host
