import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Key, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Lock, 
  Unlock, 
  RefreshCw,
  Search,
  Check,
  X,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export interface SystemUserData {
  id: string;
  username: string;
  name: string;
  role: 'master' | 'operator' | 'support' | 'client';
  active: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface BlockedAttemptItem {
  id: string;
  attempts: number;
  lastAttemptAt: string;
  lockedUntil?: string;
  remainingSeconds?: number;
}

interface UserManagementPanelProps {
  currentSessionToken?: string;
}

export const UserManagementPanel: React.FC<UserManagementPanelProps> = ({ currentSessionToken }) => {
  const effectiveToken = currentSessionToken || (() => {
    try {
      const raw = localStorage.getItem('alf_auth_user');
      return raw ? JSON.parse(raw).token : '';
    } catch (_) { return ''; }
  })();

  const [users, setUsers] = useState<SystemUserData[]>([]);
  const [blockedList, setBlockedList] = useState<BlockedAttemptItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New User Form State
  const [newUsername, setNewUsername] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<'master' | 'operator' | 'support'>('operator');
  const [newPassword, setNewPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password reset modal state
  const [resetTargetUser, setResetTargetUser] = useState<SystemUserData | null>(null);
  const [newResetPassword, setNewResetPassword] = useState('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');

  const fetchUsersAndSecurity = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${effectiveToken || ''}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
        setBlockedList(data.blockedAttempts || []);
      }
    } catch (err) {
      console.error('Erro ao buscar usuários do sistema:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAndSecurity();
  }, [effectiveToken]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    const cleanUsername = newUsername.trim().toLowerCase().replace(/[^a-z0-9_\-.]/g, '');
    const cleanName = newName.trim();
    const cleanPass = newPassword.trim();

    if (!cleanUsername || cleanUsername.length < 3) {
      setFormError('O nome de usuário deve ter no mínimo 3 caracteres (apenas letras e números).');
      return;
    }
    if (!cleanName) {
      setFormError('Informe o nome completo do usuário.');
      return;
    }
    if (!cleanPass || cleanPass.length < 6) {
      setFormError('A senha deve ter no mínimo 6 caracteres por exigência de segurança.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${effectiveToken || ''}`
        },
        body: JSON.stringify({
          username: cleanUsername,
          name: cleanName,
          role: newRole,
          password: cleanPass
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || 'Erro ao cadastrar usuário.');
        return;
      }

      setFormSuccess(`Usuário "${cleanUsername}" cadastrado com sucesso com perfil ${newRole.toUpperCase()}!`);
      setNewUsername('');
      setNewName('');
      setNewPassword('');
      setIsCreatingUser(false);
      await fetchUsersAndSecurity();
      setTimeout(() => setFormSuccess(''), 4000);
    } catch (err: any) {
      setFormError(err.message || 'Erro de conexão com o servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleUserStatus = async (user: SystemUserData) => {
    if (user.id === 'master' || user.id === 'mysis_26') {
      alert('O usuário Master principal não pode ser desativado.');
      return;
    }

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${effectiveToken || ''}`
        },
        body: JSON.stringify({
          active: !user.active
        })
      });
      if (res.ok) {
        await fetchUsersAndSecurity();
      }
    } catch (err) {
      alert('Erro ao alterar status do usuário.');
    }
  };

  const handleDeleteUser = async (user: SystemUserData) => {
    if (user.id === 'master' || user.id === 'mysis_26') {
      alert('O usuário Master principal não pode ser excluído por segurança.');
      return;
    }

    if (!confirm(`Tem certeza que deseja excluir permanentemente o acesso do usuário "${user.name}" (${user.username})?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${effectiveToken || ''}`
        }
      });
      if (res.ok) {
        await fetchUsersAndSecurity();
      }
    } catch (err) {
      alert('Erro ao excluir usuário.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetTargetUser) return;
    if (newResetPassword.length < 6) {
      alert('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }

    try {
      const res = await fetch(`/api/users/${resetTargetUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${effectiveToken || ''}`
        },
        body: JSON.stringify({
          password: newResetPassword
        })
      });
      if (res.ok) {
        setResetSuccessMsg(`Senha de "${resetTargetUser.username}" atualizada com sucesso!`);
        setTimeout(() => {
          setResetSuccessMsg('');
          setResetTargetUser(null);
          setNewResetPassword('');
        }, 2000);
      }
    } catch (err) {
      alert('Erro ao redefinir senha.');
    }
  };

  const handleUnlockAttempt = async (attemptId: string) => {
    try {
      const res = await fetch(`/api/security/unlock-attempt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${effectiveToken || ''}`
        },
        body: JSON.stringify({ id: attemptId })
      });
      if (res.ok) {
        await fetchUsersAndSecurity();
      }
    } catch (err) {
      alert('Erro ao desbloquear tentativa.');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              CyberShield Security RBAC
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
              Criptografia PBKDF2 + Salt
            </span>
          </div>
          <h2 className="text-xl font-black text-white">
            Gerenciamento de Usuários, Senhas &amp; Níveis de Acesso
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Cadastre novos operadores comerciais ou administradores com senhas protegidas por hash criptográfico e permissões segmentadas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCreatingUser(!isCreatingUser)}
            className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <UserPlus className="w-4 h-4 text-slate-950" />
            <span>{isCreatingUser ? 'Fechar Formulário' : 'Novo Usuário'}</span>
          </button>
          <button
            type="button"
            onClick={fetchUsersAndSecurity}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition cursor-pointer"
            title="Atualizar lista"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {formSuccess && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{formSuccess}</span>
        </div>
      )}

      {/* CREATE NEW USER DRAWER */}
      {isCreatingUser && (
        <form onSubmit={handleCreateUser} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl text-white shadow-xl space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Cadastrar Novo Usuário do Sistema
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsCreatingUser(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-300 uppercase">
                Usuário / Login (*)
              </label>
              <input
                type="text"
                required
                placeholder="Ex: carlos_vendas"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_\-.]/g, ''))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-400 focus:outline-hidden focus:border-cyan-500"
              />
              <span className="text-[10px] text-slate-500">Sem espaços ou acentos.</span>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-300 uppercase">
                Nome Completo (*)
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Carlos Eduardo Silva"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-hidden focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-300 uppercase">
                Nível de Permissão (RBAC) (*)
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-hidden focus:border-cyan-500"
              >
                <option value="operator">💼 Operador Comercial (CRM &amp; Vendas)</option>
                <option value="master">👑 Administrador Master (Acesso Total)</option>
                <option value="support">🛡️ Suporte Técnico (Visualizador)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-300 uppercase">
                Senha Segura (*)
              </label>
              <input
                type="password"
                required
                placeholder="Mínimo 6 caracteres"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyan-500"
              />
              <span className="text-[10px] text-slate-500">Criptografada com PBKDF2.</span>
            </div>
          </div>

          {formError && (
            <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreatingUser(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md disabled:opacity-50"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Novo Usuário'}
            </button>
          </div>
        </form>
      )}

      {/* ACTIVE LOCKOUTS / BRUTE FORCE DEFENSE BANNER */}
      {blockedList.length > 0 && (
        <div className="bg-red-950/30 border border-red-500/40 rounded-3xl p-5 text-white space-y-3">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Bloqueios Ativos Contra Força Bruta (3 Falhas Consecutivas)
            </h4>
          </div>
          <p className="text-xs text-slate-300">
            O CyberShield bloqueia automaticamente qualquer usuário ou IP por 2 minutos após 3 senhas erradas no banco de dados.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
            {blockedList.map((block) => (
              <div key={block.id} className="bg-slate-900 border border-red-500/30 p-3 rounded-2xl flex items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-xs text-red-300 font-bold block truncate max-w-[150px]">
                    {block.id}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {block.attempts} tentativas falhas • {block.remainingSeconds ? `Bloqueado por mais ${block.remainingSeconds}s` : 'Bloqueado'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleUnlockAttempt(block.id)}
                  className="px-2.5 py-1 text-[10px] font-bold bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-lg transition cursor-pointer"
                  title="Liberar imediatamente este usuário"
                >
                  Liberar Acesso
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USERS LIST TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-black text-white">Usuários Cadastrados ({users.length})</h3>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por nome ou usuário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-hidden focus:border-cyan-500"
            />
          </div>
        </div>

        {users.length === 0 && !isLoading ? (
          <div className="text-center py-10 space-y-2">
            <Shield className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400 font-bold">Nenhum usuário cadastrado no momento.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3 font-black">Usuário</th>
                  <th className="py-2.5 px-3 font-black">Nome Completo</th>
                  <th className="py-2.5 px-3 font-black">Perfil (RBAC)</th>
                  <th className="py-2.5 px-3 font-black">Status</th>
                  <th className="py-2.5 px-3 font-black">Último Login</th>
                  <th className="py-2.5 px-3 font-black text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
                {filteredUsers.map((user) => {
                  const isMasterUser = user.id === 'master';
                  return (
                    <tr key={user.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-3">
                        <span className="font-mono text-cyan-400 font-bold">@{user.username}</span>
                      </td>
                      <td className="py-3 px-3 font-bold text-white">
                        {user.name}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          user.role === 'master'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : user.role === 'operator'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {user.role === 'master' && '👑 Master'}
                          {user.role === 'operator' && '💼 Operador'}
                          {user.role === 'support' && '🛡️ Suporte'}
                          {user.role === 'client' && '🏪 Lojista'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <button
                          type="button"
                          onClick={() => handleToggleUserStatus(user)}
                          disabled={isMasterUser}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer disabled:cursor-not-allowed ${
                            user.active
                              ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                              : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                          }`}
                          title={isMasterUser ? 'O usuário Master principal não pode ser inativado' : 'Clique para alterar status'}
                        >
                          {user.active ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          <span>{user.active ? 'Ativo' : 'Bloqueado'}</span>
                        </button>
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px]">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString('pt-BR') : 'Nunca acessou'}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setResetTargetUser(user);
                              setNewResetPassword('');
                            }}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition cursor-pointer"
                            title="Alterar Senha do Usuário"
                          >
                            <Key className="w-3.5 h-3.5 text-cyan-400" />
                          </button>

                          {!isMasterUser && (
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user)}
                              className="p-1.5 bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 rounded-lg transition cursor-pointer"
                              title="Excluir Usuário"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PASSWORD RESET MODAL */}
      {resetTargetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <form onSubmit={handleResetPassword} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-sm w-full text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-cyan-400" />
                <h4 className="text-sm font-black">Alterar Senha</h4>
              </div>
              <button
                type="button"
                onClick={() => setResetTargetUser(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Definir nova senha segura para o usuário <strong className="text-white">@{resetTargetUser.username}</strong> ({resetTargetUser.name}):
            </p>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-300 uppercase">
                Nova Senha (Mínimo 6 caracteres)
              </label>
              <input
                type="password"
                required
                value={newResetPassword}
                onChange={(e) => setNewResetPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyan-500"
              />
            </div>

            {resetSuccessMsg && (
              <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{resetSuccessMsg}</span>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setResetTargetUser(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Atualizar Senha
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
