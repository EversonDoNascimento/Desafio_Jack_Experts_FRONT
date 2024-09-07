// Definindo a contante cores para facilitar a manutenção do código caso alguma cor venha a mudar posteriormente
const Colors = [
  { title: "container-bg", color: "#071739" },
  { title: "btn-register", color: "#638CE2" },
  { title: "task-card", color: "#A4B6C4" },
];

// A função recebe um parâmetro e filtra o array de cores de acordo com esse parâmetro
const renderColors = (title: string) => {
  const value = Colors.filter((color) => color.title == title);
  return value[0].color;
};

export default renderColors;
