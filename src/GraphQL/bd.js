import { Sequelize } from "sequelize";

const sequelize = new Sequelize('desafioRadix', 'root', '2712', {
    host: 'localhost',
    dialect:'mysql',
});

export default sequelize;