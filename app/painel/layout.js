import Sidebar from '@/app/components/dashboard/Sidebar';
import Header from '@/app/components/dashboard/Header';

export default function PainelLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#F9FAFB] flex font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
