module.exports = (sequelize, Sequelize) => {
	const Usuario = sequelize.define('usuario', {
		email: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.STRING,
		},
		nome: {
			allowNull: false,
			type: Sequelize.STRING,
		},
		telefone: {
			allowNull: false,
			type: Sequelize.STRING(11),
		},
        endereco: {
			allowNull: false,
			type: Sequelize.STRING,
		},
        senha: {
			allowNull: false,
			type: Sequelize.STRING,
		},
        ativo: {
			allowNull: false,
			type: Sequelize.BOOLEAN,
            defaultValue:true,
		}
	});
	return Usuario;
};
