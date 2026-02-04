ssh root@167.88.32.155 "docker service update --env-add EXECUTIONS_DATA_PRUNE=true --env-add EXECUTIONS_DATA_MAX_AGE=24 --env-add N8N_DEFAULT_BINARY_DATA_MODE=filesystem zapscale_n8n"
