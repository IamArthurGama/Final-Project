module.exports = (sequelize, Sequelize) => {
	const Cardapio = sequelize.define('cardapio', {
		idLanche: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		nome: {
			allowNull: false,
			type: Sequelize.STRING,
		},
        descricao: {
			allowNull: false,
			type: Sequelize.STRING,
		},
        preco: {
			allowNull: false,
			type: Sequelize.FLOAT,
		},
        quantidade: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        ativo: {
			allowNull: false,
			type: Sequelize.BOOLEAN,
            defaultValue:true,
		}
	});
	return Cardapio;
};
