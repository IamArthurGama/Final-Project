module.exports = (sequelize, Sequelize) => {
	const Sobre = sequelize.define('sobre', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.INTEGER,
			autoIncrement: true
		},
		sobre: {
			allowNull: false,
			type: Sequelize.STRING,
		},
        ativo: {
			allowNull: false,
			type: Sequelize.BOOLEAN,
            defaultValue:true,
		}
	});
	return Sobre;
};
