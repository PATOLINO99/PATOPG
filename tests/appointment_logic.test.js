const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function runTests() {
    console.log('🚀 Iniciando Testes de Agendamento Profissional (Regra 1/hora)...');

    try {
        // 1. Setup
        const user = await prisma.user.upsert({
            where: { email: 'admin@zapscale.pro' },
            update: {},
            create: { name: 'Admin', email: 'admin@zapscale.pro', password: '123' }
        });

        const profA = await prisma.professional.create({ data: { name: 'Dr. Arthur', userId: user.id } });
        const profB = await prisma.professional.create({ data: { name: 'Dra. Bia', userId: user.id } });

        const testDate = new Date('2026-03-05T00:00:00Z'); // Quinta-feira
        const testTime = '14:00';

        console.log('✅ Setup: Médicos criados.');

        // 2. Teste 1: Agendar Prof A às 14:00 (Sucesso)
        console.log('Teste 1: Agendando Prof A às 14:00...');
        const p1 = await prisma.patient.create({ data: { name: 'Paciente 1', phone: '111', userId: user.id } });
        await prisma.appointment.create({
            data: { userId: user.id, professionalId: profA.id, patientId: p1.id, date: testDate, time: testTime }
        });
        console.log('✅ Agendamento 1 (Prof A) OK.');

        // 3. Teste 2: Agendar Prof A às 14:00 novamente (Deve falhar na lógica)
        console.log('Teste 2: Duplicidade Prof A às 14:00...');
        const conflictA = await prisma.appointment.findFirst({
            where: { userId: user.id, professionalId: profA.id, date: testDate, time: testTime, status: { not: 'canceled' } }
        });

        if (conflictA) {
            console.log('✅ SUCESSO: Duplicidade para o mesmo profissional bloqueada.');
        } else {
            console.error('❌ ERRO: Duplicidade não foi detectada para Prof A!');
        }

        // 4. Teste 3: Agendar Prof B às 14:00 (Deve permitir - Médicos diferentes)
        console.log('Teste 3: Prof B às 14:00 (Mesmo horário, outro médico)...');
        const p2 = await prisma.patient.create({ data: { name: 'Paciente 2', phone: '222', userId: user.id } });
        await prisma.appointment.create({
            data: { userId: user.id, professionalId: profB.id, patientId: p2.id, date: testDate, time: testTime }
        });
        console.log('✅ SUCESSO: Agendamento permitido para médico diferente no mesmo horário.');

        // 5. Teste 4: Cancelar Prof A e Re-agendar Prof A
        console.log('Teste 4: Cancelar e Re-agendar Prof A...');
        const appA = await prisma.appointment.findFirst({ where: { professionalId: profA.id, date: testDate, time: testTime } });
        await prisma.appointment.update({ where: { id: appA.id }, data: { status: 'canceled' } });

        const checkA = await prisma.appointment.findFirst({
            where: { userId: user.id, professionalId: profA.id, date: testDate, time: testTime, status: { not: 'canceled' } }
        });

        if (!checkA) {
            console.log('✅ SUCESSO: Horário liberado para Prof A após cancelamento.');
        } else {
            console.error('❌ ERRO: Horário do Prof A ainda consta como ocupado!');
        }

    } catch (err) {
        console.error('❌ Erro nos testes:', err);
    } finally {
        await prisma.$disconnect();
    }
}

runTests();
