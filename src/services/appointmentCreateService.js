import { api } from './provider/api';

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
  create: async (data) => {
    const debugPayload = {};
    // Obter idStudent de data ou sessionStorage
    const studentId = data.idStudent != null ? data.idStudent : getStudentIdFromSession();
    if (studentId != null) {
      debugPayload.idStudent = studentId;
    } else {
      console.error('appointmentCreateService: idStudent indisponível');
    }
    if (data.professorId != null) debugPayload.idTeacher = data.professorId;

    if (data.date && data.time) {
      const year = data.date.getFullYear();
      const month = data.date.getMonth();
      const day = data.date.getDate();
      const [hourStr, minuteStr] = data.time.split(':');
      const dt = new Date(year, month, day, parseInt(hourStr, 10), parseInt(minuteStr, 10));
      debugPayload.dateTime = dt.toISOString();
    }

    if (data.duration) {
      const parseDurationToMinutes = (str) => {
        let hours = 0, minutes = 0;
        const horaMatch = str.match(/(\d+)\s*hora/);
        if (horaMatch) hours = parseInt(horaMatch[1], 10);
        const minMatch = str.match(/(\d+)\s*min/);
        if (minMatch) minutes = parseInt(minMatch[1], 10);
        return hours * 60 + minutes;
      };
      debugPayload.lessonDuration = parseDurationToMinutes(data.duration);
    }

    if (data.classModel) debugPayload.classModel = data.classModel;
    if (data.classModel === 'home' && data.endereco) {
      debugPayload.endereco = {
        rua: data.endereco.rua || '',
        cidade: data.endereco.cidade || '',
        estado: data.endereco.estado || '',
        cep: data.endereco.cep || '',
        numero: data.endereco.numero || '',
        complemento: data.endereco.complemento || ''
      };
    }

    if (data.phase) debugPayload.phase = data.phase;
    if (data.subject) debugPayload.subject = data.subject;

    if (Array.isArray(data.materials)) {
      debugPayload.materials = data.materials.map(mat => mat.name);
    }

    if (data.personal) debugPayload.personalData = data.personal;
    if (data.pagamento) debugPayload.paymentData = { ...data.pagamento };
    if (data.pagamento && data.pagamento.totalValue != null) debugPayload.totalValue = data.pagamento.totalValue;
    debugPayload.status = 'pending';

    console.log('JSON payload for debugging:', JSON.stringify(debugPayload, null, 2));

    const formData = new FormData();
    if (studentId != null) formData.append('idStudent', String(studentId));
    if (data.professorId != null) formData.append('idTeacher', String(data.professorId));

    if (data.date && data.time) {
      const year = data.date.getFullYear();
      const month = data.date.getMonth();
      const day = data.date.getDate();
      const [hourStr, minuteStr] = data.time.split(':');
      const dt = new Date(year, month, day, parseInt(hourStr, 10), parseInt(minuteStr, 10));
      formData.append('dateTime', dt.toISOString());
    }

    if (data.duration) {
      const parseDurationToMinutes = (str) => {
        let hours = 0, minutes = 0;
        const horaMatch = str.match(/(\d+)\s*hora/);
        if (horaMatch) hours = parseInt(horaMatch[1], 10);
        const minMatch = str.match(/(\d+)\s*min/);
        if (minMatch) minutes = parseInt(minMatch[1], 10);
        return hours * 60 + minutes;
      };
      formData.append('lessonDuration', String(parseDurationToMinutes(data.duration)));
    }

    if (data.classModel) formData.append('classModel', data.classModel);
    if (data.classModel === 'home' && data.endereco) {
      formData.append('enderecoRua', data.endereco.rua || '');
      formData.append('enderecoCidade', data.endereco.cidade || '');
      formData.append('enderecoEstado', data.endereco.estado || '');
      formData.append('enderecoCep', data.endereco.cep || '');
      if (data.endereco.numero) formData.append('enderecoNumero', String(data.endereco.numero));
      if (data.endereco.complemento) formData.append('enderecoComplemento', data.endereco.complemento);
    }

    if (data.phase) formData.append('phase', data.phase);
    if (data.subject) formData.append('subject', data.subject);

    if (Array.isArray(data.materials)) {
      data.materials.forEach(mat => {
        formData.append('materials', mat.file, mat.name);
      });
    }

    if (data.personal) formData.append('personalData', JSON.stringify(data.personal));
    if (data.pagamento) formData.append('paymentData', JSON.stringify(data.pagamento));
    if (data.pagamento && data.pagamento.totalValue != null) formData.append('totalValue', String(data.pagamento.totalValue));
    formData.append('status', 'pending');

    for (let pair of formData.entries()) {
      if (pair[1] instanceof File) {
        console.log('FormData entry:', pair[0], 'File name:', pair[1].name);
      } else {
        console.log('FormData entry:', pair[0], pair[1]);
      }
    }

    const response = await api.post('/appointments', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};
