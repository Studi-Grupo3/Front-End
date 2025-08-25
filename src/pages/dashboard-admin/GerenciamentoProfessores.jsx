import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/dashboard-admin/Sidebar';
import { HeaderSection } from '../../components/dashboard-admin/HeaderSection';
import { MobileSidebar } from '../../components/dashboard-admin/mobile/MobileSidebar';
import { MobileHeader } from '../../components/dashboard-admin/mobile/MobileHeader';
import { TableSection } from '../../components/dashboard-admin/TableSection';
import { Button } from '../../components/ui/Button';
import { Edit2, UserPlus, Copy, RefreshCw, Trash2 } from 'lucide-react';
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
  const [cpf, setCpf] = useState('');
  const [subject, setSubject] = useState('');
  const [password, setPassword] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState('');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const data = await teacherManagerService.list();
    setProfessores(data);
    setLoading(false);
  }

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pwd = '';
    for (let i = 0; i < 12; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
  };

  function openNew() {
    setEditingId(null);
    setName('');
    setEmail('');
    setCpf('');
    setSubject('');
    setPassword(generatePassword());
    setCopySuccess(false);
    setShowForm(true);
  }

  function openEdit(row) {
    setEditingId(row.id);
    setName(row.name);
    setEmail(row.email);
    setCpf(row.cpf || '');
    setSubject(row.subject);
    setPassword('');
    setCopySuccess(false);
    setShowForm(true);
  }

  function openDelete(row) {
    setDeleteId(row.id);
    setDeleteName(row.name);
    setShowDeleteModal(true);
  }

  async function save() {
    const cleanedCpf = cpf.replace(/[^\d]/g, '');
    const payload = { name, email, cpf: cleanedCpf, subject, password };
    if (editingId !== null) {
      await teacherManagerService.update(editingId, payload);
    } else {
      await teacherManagerService.create(payload);
    }
    setShowForm(false);
    await load();
  }

  async function confirmDelete() {
    await teacherManagerService.softDelete(deleteId);
    setShowDeleteModal(false);
    setDeleteId(null);
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
        <div className="items-center space-x-2">
          <Button size="sm" variant="ghost" className="cursor-pointer" onClick={() => openEdit(row)}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="cursor-pointer" onClick={() => openDelete(row)}>
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
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
              <Button variant="primary" className="cursor-pointer" onClick={openNew}>
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
            <Input
              label="CPF"
              type="text"
              value={cpf}
              onChange={e => setCpf(e.target.value)}
            />

            <label className="block">
              <span className="text-sm font-medium">Disciplina</span>
              <select
                className="mt-1 block w-full border rounded p-2 max-h-60 overflow-y-auto cursor-pointer"
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

            {/* Campo de senha temporária */}
            <label className="block relative">
              <span className="text-sm font-medium">Senha Temporária</span>
              <div className="mt-1 flex items-center">
                <input
                  type="text"
                  readOnly
                  value={password}
                  className="flex-1 border rounded p-2 bg-gray-100"
                />
                <button
                  type="button"
                  className="ml-2 p-2 bg-gray-200 rounded hover:bg-gray-300 transition cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(password);
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000);
                  }}
                  title="Copiar senha"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="ml-2 p-2 bg-gray-200 rounded hover:bg-gray-300 transition cursor-pointer"
                  onClick={() => setPassword(generatePassword())}
                  title="Gerar nova senha"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              {copySuccess && (
                <span className="absolute top-full mt-1 left-0 text-sm text-green-600">
                  Copiado!
                </span>
              )}
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" className="cursor-pointer" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
            <Button variant="primary" className="cursor-pointer" onClick={save}>
              Salvar
            </Button>
          </div>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal
          title="Confirmar Exclusão"
          onClose={() => setShowDeleteModal(false)}
        >
          <p>Tem certeza que deseja excluir <strong>{deleteName}</strong>?</p>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" className="cursor-pointer" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" className="text-white cursor-pointer" onClick={confirmDelete}>
              Excluir
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}