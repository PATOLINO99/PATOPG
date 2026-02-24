import Navbar from '@/components/simples-agenda/Navbar';
import Hero from '@/components/simples-agenda/Hero';
import { Features } from '@/components/simples-agenda/Features';
import CTA from '@/components/simples-agenda/CTA';
import { UserPlus, Search, Calendar, FileText, BarChart, ShieldCheck } from 'lucide-react';

export default function Page() {
    const features = [
        {
            title: "Cadastro Completo",
            description: "Centralize todas as informações dos seus consumidores: dados pessoais, endereço, contatos e observações em um único lugar.",
            icon: UserPlus
        },
        {
            title: "Busca Inteligente",
            description: "Localize qualquer cliente instantaneamente através de filtros avançados por nome, CPF ou histórico de compras.",
            icon: Search
        },
        {
            title: "Histórico de Agendamentos",
            description: "Acompanhe todo o histórico de visitas e serviços realizados por cada cliente de forma automática.",
            icon: Calendar
        },
        {
            title: "Fichas Personalizadas",
            description: "Crie fichas de anamnese ou evolução técnica personalizadas para cada tipo de atendimento.",
            icon: FileText
        },
        {
            title: "Relatórios Estratégicos",
            description: "Descubra quem são seus clientes mais fiéis e qual o ticket médio de cada um com relatórios automáticos.",
            icon: BarChart
        },
        {
            title: "Segurança de Dados",
            description: "Seus dados armazenados em nuvem com criptografia de ponta e conformidade total com a LGPD.",
            icon: ShieldCheck
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <Hero
                title="Programa de Cadastro de Clientes Inteligente"
                subtitle="Otimize sua rotina diária e centralize toda a jornada do seu consumidor em um software simples, fácil e 100% seguro."
                ctaText="EXPERIMENTE GRÁTIS AGORA"
            />

            <Features
                title="Tudo o que você precisa para gerenciar seus clientes"
                features={features}
            />

            <section className="bg-white section-padding">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 space-y-8">
                        <h2 className="text-3xl font-black text-[#232323]">Por que ter um sistema de cadastro de clientes?</h2>
                        <div className="space-y-6">
                            <Step
                                num="01"
                                title="Organização total"
                                text="Chega de papéis ou planilhas confusas. Tenha tudo na nuvem, acessível de qualquer lugar."
                            />
                            <Step
                                num="02"
                                title="Fidelização assertiva"
                                text="Conheça o perfil de compra do seu cliente e envie promoções personalizadas via WhatsApp."
                            />
                            <Step
                                num="03"
                                title="Gestão Financeira integrada"
                                text="Vincule as vendas diretamente ao cadastro para emitir boletos e controlar inadimplência."
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/2 bg-[#F8F8F8] rounded-[40px] p-8 border border-[#E6E6E6]">
                        <div className="aspect-square bg-white rounded-3xl shadow-xl p-8 flex items-center justify-center text-[#E6E6E6]">
                            <UserPlus className="w-32 h-32" />
                        </div>
                    </div>
                </div>
            </section>

            <CTA
                title="Pronto para transformar a gestão dos seus clientes?"
                buttonText="COMEÇAR TESTE GRÁTIS AGORA"
            />

            <footer className="bg-alt py-12 border-t border-base text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-sm font-bold text-[#666666] tracking-tight">
                        © 2026 ZapScale Tecnologia. Inspirado no padrão Simples Agenda.
                    </p>
                </div>
            </footer>
        </main>
    );
}

function Step({ num, title, text }: { num: string; title: string; text: string }) {
    return (
        <div className="flex gap-6 items-start">
            <span className="text-4xl font-black text-[#0088C8]/20">{num}</span>
            <div className="space-y-1">
                <h4 className="text-lg font-black text-[#232323]">{title}</h4>
                <p className="text-[#666666] text-sm leading-relaxed font-medium">{text}</p>
            </div>
        </div>
    );
}
