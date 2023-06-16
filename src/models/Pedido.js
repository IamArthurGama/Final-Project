module.exports = (sequelize, Sequelize) => {
	const Pedido = sequelize.define('pedido', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		idPedido: {
			allowNull: false,
			type: Sequelize.STRING
		},										//id usuario, id cliente, quantidade

		idUsuario: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},

		idCardapio: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},

		qtda: {
			type: Sequelize.INTEGER,
		},

		status: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
		},

        ativo: {
			allowNull: false,
			type: Sequelize.BOOLEAN,
            defaultValue:true,
		}
	});
	return Pedido;
};
