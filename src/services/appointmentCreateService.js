// services/appointmentCreateService.js
import { api } from '../services/provider/api';
import { toISOStringDateTime, parseDurationToMinutes } from '../utils/date';

function getStudentIdFromSession() {
  const idStr = sessionStorage.getItem('userId');
  if (!idStr) {
    console.error('appointmentCreateService: userId não encontrado em sessionStorage');
    return null;
  }
  const id = Number(idStr);
  if (isNaN(id)) {
    console.error('appointmentCreateService: userId em sessionStorage não é um número válido:', idStr);
    return null;
  }
  return id;
}

export const appointmentCreateService = {
  /**
   * Cria o agendamento: envia JSON completo para /appointments
   * @param {Object} data — todos os campos da aula, inclusive materiais (apenas nomes)
   * @returns {Promise<Object>} resposta do servidor ({ id, ... })
   */
  create: async (data) => {
    const payload = {};

    // IDs
    payload.idStudent = data.idStudent ?? getStudentIdFromSession();
    payload.idTeacher = data.professorId;

    // Data/hora
    if (data.date && data.time) {
      payload.dateTime = toISOStringDateTime(data.date, data.time);
    }

    // Duração em minutos
    if (data.duration) {
      payload.lessonDuration = parseDurationToMinutes(data.duration);
    }

    // Tipo de aula ou localização (API espera 'location')
    // Mapeia valores do front: 'online' ou 'home' para 'Online' ou 'Presencial'
    if (data.location) {
      payload.location = data.location === 'home' ? 'Presencial' : 'Online';
    }

    // Endereço se for domiciliar (caso precise enviar detalhes)
    if (data.location === 'home' && data.endereco) {
      payload.endereco = {
        rua: data.endereco.rua || '',
        cidade: data.endereco.cidade || '',
        estado: data.endereco.estado || '',
        cep: data.endereco.cep || '',
        numero: data.endereco.numero || '',
        complemento: data.endereco.complemento || ''
      };
    }

    // Outros campos
    if (data.phase)      payload.phase     = data.phase;
    if (data.subject)    payload.subject   = data.subject;
    if (Array.isArray(data.materials))
                         payload.materials = data.materials.map(m => m.name);
    if (data.personal)   payload.personalData = data.personal;

    // Flatten payment fields: sempre enviar como PAID
    payload.paymentStatus = 'PAID';
    payload.totalValue    = data.pagamento?.totalValue ?? 0;

    // Estado do agendamento (enum do backend)
    payload.status = 'SCHEDULED';

    console.log('Payload JSON:', JSON.stringify(payload, null, 2));
    const response = await api.post('/appointments', payload);
    return response.data;
  },

  /**
   * Faz upload de arquivos: envia multipart para /appointments/files
   * @param {number|string} appointmentId
   * @param {Array<{ file: File, name: string }>} materials
   * @returns {Promise<Object>}
   */
  uploadFiles: async (appointmentId, materials = []) => {
    const formData = new FormData();
    formData.append('appointmentId', appointmentId);

    materials.forEach(mat => {
      formData.append('materials', mat.file, mat.name);
    });

    console.log(`Enviando ${materials.length} arquivo(s) para agendamento ${appointmentId}`);
    const response = await api.post('/appointments/files', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};
