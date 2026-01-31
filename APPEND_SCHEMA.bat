@echo off
type prisma\schema_append_temp.txt >> prisma\schema.prisma
del prisma\schema_append_temp.txt
echo Schema atualizado!
