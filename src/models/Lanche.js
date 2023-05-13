module.exports = (sequelize, Sequelize) => {
	const Lanche = sequelize.define('lanche', {
		nome: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.STRING
		},
        preco: {
			allowNull: false,
			type: Sequelize.STRING,
		},
        qtd {
			allowNull: false,
			type: Sequelize.STRING
		},
        ativo: {
			allowNull: false,
			type: Sequelize.BOOLEAN,
            defaultValue:true,
		}
	});
	return Lanche;
};
