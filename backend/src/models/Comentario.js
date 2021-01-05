const {Model, DataTypes} = require("sequelize");

class Comentario extends Model{
    static init(sequelize){
        super.init(
            {
                descricao: DataTypes.TEXT,
            },
            {
                sequelize,
            }
        );
    }

    static associate(model){
        this.belongsTo(models.Postagem);
        this.belongsTo(models.Aluno);
    }
}

module.exports = Comentario;