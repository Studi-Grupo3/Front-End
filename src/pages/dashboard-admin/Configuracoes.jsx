import { useState } from 'react';
import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { MobileSidebar } from '../../components/dashboard-admin/mobile/MobileSidebar';
import { MobileHeader } from '../../components/dashboard-admin/mobile/MobileHeader';
import { SecuritySettings } from '../../components/dashboard-admin/settings/SecuritySettings';
import { NotificationSettings } from '../../components/dashboard-admin/settings/NotificationSettings';
import { Tabs } from '../../components/dashboard-admin/settings/Tabs';

export function Configuracoes() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      <Sidebar />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <MobileHeader onOpen={() => setMobileMenuOpen(true)} />

      <main className="flex-1 md:ml-64 mt-20 md:mt-0">
        <HeaderSection title="Configurações" />
        {/* <Tabs /> */}
        <div className="space-y-8 mx-6 my-3">
          <SecuritySettings />
          <NotificationSettings />
        </div>
      </main>
    </div>
  );
}
