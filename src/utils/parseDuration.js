export function parseDurationLabel(label) {
  if (!label || typeof label !== 'string') return 0;

  let total = 0;

  // Captura X horas (1, 2, ...)
  const horaMatch = label.match(/(\d+)\s*hora/);
  if (horaMatch) {
    // Converte horas para minutos
    total += parseInt(horaMatch[1], 10) * 60;
  }

  // Captura Y minutos (30, 45, ...)
  const minMatch = label.match(/(\d+)\s*min/);
  if (minMatch) {
    total += parseInt(minMatch[1], 10);
  }

  return total;
}