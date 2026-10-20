// ===============================================================
// DADOS EM MEMÓRIA
// Aqui fica o "banco de dados" da API: um ARRAY de OBJETOS.
// Cada objeto do array é um professor.
// Como está só na memória, se o servidor for reiniciado os dados
// voltam a ser exatamente estes.
// ===============================================================

const professores = [
  {
    id: 1,
    nome: "Thalysson Sergio Fernandes Soares",
    idade: 25,
    departamento: "Tecnologia",
    turmas: [
      {
        codigo: "ADS-N2",
        disciplina: "Desenvolvimento Web",
        alunos: ["Ana", "Bruno", "Carla"]
      }
    ]
  },
  {
    id: 2,
    nome: "Maria Souza",
    idade: 41,
    departamento: "Exatas",
    turmas: [
      {
        codigo: "MAT-101",
        disciplina: "Matemática Básica",
        alunos: ["Diego", "Eduarda"]
      },
      {
        codigo: "EST-201",
        disciplina: "Estatística",
        alunos: ["Felipe", "Gabriela", "Heitor"]
      }
    ]
  },
  {
    id: 3,
    nome: "João Pereira",
    idade: 38,
    departamento: "Humanas",
    turmas: [
      {
        codigo: "HIS-110",
        disciplina: "História do Brasil",
        alunos: ["Igor", "Julia"]
      }
    ]
  },
  {
    id: 4,
    nome: "Carlos Lima",
    idade: 50,
    departamento: "Tecnologia",
    turmas: []
  }
];

// Exporta o array para o controller poder usar
module.exports = professores;
