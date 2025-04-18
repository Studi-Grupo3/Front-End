import React from 'react';
import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { Tabs } from '../../components/dashboard-admin/settings/Tabs';

export function Configuracoes() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 ml-64">
        <HeaderSection title="Configurações" />
        <Tabs />
      </main>
    </div>
  );
}
