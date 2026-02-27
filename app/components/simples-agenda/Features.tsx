import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
}

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
    return (
        <div className="card-simples group hover:border-[#0088C8] transition-all">
            <div className="w-12 h-12 bg-[#0088C8]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0088C8] transition-colors">
                <Icon className="w-6 h-6 text-[#0088C8] group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-black text-[#232323] mb-4">{title}</h3>
            <p className="text-[#666666] leading-relaxed font-medium text-sm">
                {description}
            </p>
        </div>
    );
}

export function Features({ title, features }: { title: string; features: FeatureCardProps[] }) {
    return (
        <section className="bg-alt section-padding">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-black text-[#232323] text-center mb-16">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => <FeatureCard key={i} {...f} />)}
                </div>
            </div>
        </section>
    );
}
