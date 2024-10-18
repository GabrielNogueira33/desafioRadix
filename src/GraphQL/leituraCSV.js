import neatCsv from "neat-csv";
import fs from 'fs/promises';
import Sensores from "./models/Sensores.js";

fs.readFile('./src/arquivosCSV/Pasta1.csv')
.then(function(data) {
    return neatCsv(data, { separator: ';' });
  })
  .then(function(dadosCSV) {
    console.log(dadosCSV)
    return Sensores.bulkCreate(dadosCSV);
  })
  .then(function() {
    console.log('Dados CSV inseridos no banco de dados com sucesso!');
  })
  .catch(function(error) {
    console.error('Erro ao inserir dados CSV:', error);
  });

  

//console.log(process.cwd()); // caso precise consultar diretorio