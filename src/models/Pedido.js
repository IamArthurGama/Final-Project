module.exports = (sequelize, Sequelize) => {
	const Pedido = sequelize.define('pedido', {
		idPedido: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		date: {
			allowNull: false,
			type: Sequelize.DATETIME,
			autoIncrement: true
		},
		nome: {
			allowNull: false,
			type: Sequelize.STRING,
		},
        endereco: {
			allowNull: false,
			type: Sequelize.STRING,
		},
        formaPagamento: {
			allowNull: false,
			type: Sequelize.ENUM("CREDITO","DEBITO","PIX","DINHEIRO"),
		},
		valorEntrega: {
			allowNull: false,
			type: Sequelize.FLOAT,
		},
		entrega: {
			allowNull: false,
			type: Sequelize.BOOLEAN
		},
        ativo: {
			allowNull: false,
			type: Sequelize.BOOLEAN,
            defaultValue:true,
		}
	});
	return Pedido;
};
