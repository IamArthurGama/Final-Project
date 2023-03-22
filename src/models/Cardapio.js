module.exports = (sequelize, Sequelize) => {
	const Cardapio = sequelize.define('cardapio', {
		id: {
			allowNull: false,
			autoIncrement: true,
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
			type: Sequelize.STRING,
		},
        ativo: {
			allowNull: false,
			type: Sequelize.BOOLEAN,
            defaultValue:true,
		}
	});
	return Cardapio;
};
