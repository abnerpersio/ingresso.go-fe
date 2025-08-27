export const dateToPtBr = (date: Date) => {
  return Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

export const toOnlyDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};
