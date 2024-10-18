import { DataTypes } from 'sequelize';
import sequelize from '../bd.js';

const Sensores = sequelize.define('Sensores', {
    equipmentId:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
},
    {
        timestamps: false,
        initialAutoIncrement: false,
        
});

Sensores.removeAttribute('id');

export default Sensores;