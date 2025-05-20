import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { MobileSidebar } from '../../components/dashboard-admin/mobile/MobileSidebar';
import { MobileHeader } from '../../components/dashboard-admin/mobile/MobileHeader';
import { TableSection } from '../../components/dashboard-admin/TableSection';
import { Button } from '../../components/ui/Button';
import { Edit2, UserPlus } from 'lucide-react';
import { teacherManagerService } from '../../services/dashboard/teacherManagerService';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';

import {
  subjectNamesPt,
  translateSubject
} from '../../utils/tradutionUtils';

export function GerenciamentoProfessores() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const data = await teacherManagerService.list();
    setProfessores(data);
    setLoading(false);
  }

  function openNew() {
    setEditingId(null);
    setName('');
    setEmail('');
    setSubject('');
    setShowForm(true);
  }

  function openEdit(row) {
    setEditingId(row.id);
    setName(row.name);
    setEmail(row.email);
    setSubject(row.subject);
    setShowForm(true);
  }

  async function save() {
    const payload = { name, email, subject };
    if (editingId !== null) {
      await teacherManagerService.update(editingId, payload);
    } else {
      await teacherManagerService.create(payload);
    }
    setShowForm(false);
    await load();
  }

  const columns = [
    { label: 'Nome', accessor: 'name' },
    { label: 'E-mail', accessor: 'email' },
    {
      label: 'Disciplina',
      accessor: 'subject',
      render: row => translateSubject(row.subject)
    },
    {
      label: 'Ações',
      render: row => (
        <Button size="sm" variant="ghost" onClick={() => openEdit(row)}>
          <Edit2 className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      <Sidebar />
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <MobileHeader onOpen={() => setMobileMenuOpen(true)} />

      <div className="flex-1 md:ml-64 mt-20 md:mt-0">
        <HeaderSection title="Gerenciamento de Professores" />

        <main className="p-6">
          <TableSection
            title="Lista de Professores"
            data={professores}
            columns={columns}
            loading={loading}
            action={
              <Button variant="primary" onClick={openNew}>
                <UserPlus className="w-5 h-5 mr-2" />
                Adicionar Professor
              </Button>
            }
          />
        </main>
      </div>

      {showForm && (
        <Modal
          title={editingId !== null ? 'Editar Professor' : 'Adicionar Professor'}
          onClose={() => setShowForm(false)}
        >
          <div className="space-y-4">
            <Input
              label="Nome Completo"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Input
              label="E-mail"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <label className="block">
              <span className="text-sm font-medium">Disciplina</span>
              <select
                className="mt-1 block w-full border rounded p-2 max-h-60 overflow-y-auto"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              >
                <option value="" disabled>
                  Selecione a disciplina
                </option>
                {Object.entries(subjectNamesPt).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={save}>
              Salvar
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
