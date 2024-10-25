import {ApolloServer, gql} from 'apollo-server';
import sequelize from './bd.js';
import Usuario from './models/usuario.js';
import Sensores from './models/Sensores.js';

let typeDefs = gql `
    type Usuario{
        id: ID!
        nome: String!
        email: String!
        senha: String!
    }

    type Sensores{      
        equipmentId: String!
        timestamp: String!
        value: Float!
    }

    type media_sensores{
    value: Float!
    }

    type maior_sensor {
    value: Float!
    }

    type menor_sensor {
    value: Float!
    }

    type mediaDia{
    value: Float!
    }
    
    type media2Dias{
    value: Float!
    }

    
    type mediaSemana{
    value: Float!
    }

    type mediaMes{
    value: Float!
    }

    type mediaDiaLista{
    value: Float!
}

type media2DiasLista{
    value: Float!
}

type mediaSemanaLista{
    value: Float!
}

type mediaMesLista{
    value: Float!
}

        type Query {
    usuarios: [Usuario]
    sensores: [Sensores]
    mediaDia: [mediaDia]
    media2Dias: [media2Dias]
    mediaSemana: [mediaSemana]
    mediaMes: [mediaMes]
    mediaDiaLista: [mediaDiaLista]
    media2DiasLista: [media2DiasLista]
    mediaSemanaLista: [mediaSemanaLista]
    mediaMesLista: [mediaMesLista]
    maior: [maior_sensor]
    menor: [menor_sensor]
    countQuery: Int
}

        type Mutation {
        encontrarUsuario(email: String!, senha: String!): Usuario
        createUser(nome: String!, email: String!, senha: String!): Usuario
        inserirSensor(equipmentId: String!, timestamp: String!, value: Float!): Sensores
        inserirCSV(equipmentId: String!, timestamp: String!, value: Float!): Sensores
        }
`;

let resolvers = {
    Query: {
        usuarios: async () => {
            return await Usuario.findAll();
        },
        sensores: async() => {
            return await Sensores.findAll();
        },
        mediaDia: async () => {
            const result = await sequelize.query(`SELECT * FROM mediaDia`, {
                type: sequelize.QueryTypes.SELECT,
            });
            return result;
        },
        media2Dias: async () => {
            const result = await sequelize.query(`SELECT * FROM media2Dias`, {
                type: sequelize.QueryTypes.SELECT,
            });
            return result;
        },
        mediaSemana: async () => {
            const result = await sequelize.query(`SELECT * FROM mediaSemana`, {
                type: sequelize.QueryTypes.SELECT,
            });
            return result;
        },
        mediaMes: async () => {
            const result = await sequelize.query(`SELECT * FROM mediaMes`, {
                type: sequelize.QueryTypes.SELECT,
            });
            return result;
        },
        mediaDiaLista: async () => {
            const result = await sequelize.query(`SELECT * FROM mediaDiaLista`, {
                type: sequelize.QueryTypes.SELECT,
            });
            console.log(result);
            return result;
        },
        media2DiasLista: async () => {
            const result = await sequelize.query(`SELECT * FROM media2DiasLista`, {
                type: sequelize.QueryTypes.SELECT,
            });
            console.log(result);
            return result;
        },
        mediaSemanaLista: async () => {
            const result = await sequelize.query(`SELECT * FROM mediaSemanaLista`, {
                type: sequelize.QueryTypes.SELECT,
            });
            console.log(result);
            return result;
        },
        mediaMesLista: async () => {
            const result = await sequelize.query(`SELECT * FROM mediaMesLista`, {
                type: sequelize.QueryTypes.SELECT,
            });
            console.log(result);
            return result;
        },
        maior: async() => {
            return await sequelize.query('SELECT * FROM maior_sensor', {
                type: sequelize.QueryTypes.SELECT,
              });
        },
        menor: async() => {
            return await sequelize.query('SELECT * FROM menor_sensor', {
                type: sequelize.QueryTypes.SELECT,
              });
        },
        countQuery: async () => {
            const result = await sequelize.query(`SELECT COUNT(*) AS total FROM Sensores`, {
                type: sequelize.QueryTypes.SELECT,
            });
            return result[0].total; // retorna o número total
        },
    },
    Mutation: {
        createUser: async(_,{nome, email, senha}) => {
            const novoUsuario = await Usuario.create({nome, email, senha});
            return novoUsuario;
        },
        inserirSensor: async(_,{equipmentId, timestamp, value}) => {
            const novoSensor = await Sensores.create({equipmentId, timestamp, value});
            return novoSensor;
        },
        inserirCSV: async(_,{equipmentId, timestamp, value}) => {
            const novoCSV = await Sensores.create({equipmentId, timestamp, value});
            return novoCSV;
         },
         encontrarUsuario: async(_, {email, senha}) => {
            const user = await Usuario.findOne({ where: {email, senha}})
            if(user.email != email || user.senha != senha){
                console.error("email ou senha inválidos");
                return;
            }
            return user;
        },
    },
}


let server = new ApolloServer({typeDefs, resolvers});

sequelize.sync().then(() => {
    server.listen().then(({ url }) => {
      console.log(`O servidor está ligado: ${url}`);
    });
  });


  