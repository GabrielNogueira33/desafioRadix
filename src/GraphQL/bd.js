import { Sequelize } from "sequelize";

const sequelize = new Sequelize('desafioRadix', 'root', 'SenhaDoBanco', {
    host: 'localhost',
    dialect:'mysql',
});

export default sequelize;