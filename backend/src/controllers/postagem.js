const Postagem = require("../models/Postagem");
const { sequelize, associate, hasMany } = require("./aluno");

module.exports = {
    
    async store(req, res){
        const token = req.headers.authorization;
        const [Bearer, created_aluno_id] = token.split("");

        const {titulo, descricao, imagem, gists} = req.body;

        let post = await Postagem.create({
            titulo,
            descricao,
            imagem,
            gists,
            created_aluno_id
        });
        res.status(201).send(postagem);
    },

    async delete(req, res) {
        // Pegando o ID do aluno que está logado
        const token = req.headers.authorization;
        const [Bearer, created_aluno_id] = token.split("");

        // Pegando o ID do post a apagar
        const {id} = req.params;

        // Procura o Post pela ID
        let postagem = await Postagem.findByPk(id);

        // Se a postagem não existir, retorna Not Found
        if(!postagem){
            return res.status(404).send({erro: "Postagem não encontrada."});
        }

        console.log(typeof postagem.created_aluno_id, typeof created_aluno_id);

        // Se o aluno logado for diferente do aluno que criou a postagem, retorna não autorizado
        if(postagem.created_aluno_id != created_aluno_id){
            return res
            .status(401)
            .send({erro: "Você não tem permissão para excluir esta postagem."});
        }

        // Efetua a exclusão da postagem
        await postagem.destroy();

        res.status(204).send();
    },
};