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

        type Query{
        usuarios: [Usuario]
        sensores: [Sensores]
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
        // sensor: async(_, {equipmentId}) => {
        //     return await Sensores.findOne(equipmentId);
        // },
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
            const user = await Usuario.findOne({ where: {email}})
            if(!user|| user.senha != senha){
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

export default typeDefs;