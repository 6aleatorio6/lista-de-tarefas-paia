export const todayFormatted = new Date().toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}) as `${number}/${number}/${number}`;
