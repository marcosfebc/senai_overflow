const {Op} = require("sequelize");
const Aluno = require("../models/Aluno");

module.exports = {
    // Lista todos os alunos
    async listar(req, res) {
        const alunos = await Aluno.findAll();
        res.send(alunos);
    },

    //Buscar um aluno pela id
    async buscarPorId(req, res){
        const {id} = req.params;

        //Busca o aluno pela chave
        let aluno = await Aluno.findByPk(id, {raw:true});

        //Verifica se o aluno não foi encontrado
        if(!aluno){
            res.status(404).send({erro: "Aluno não encontrado."});
        }

        delete aluno.senha;

        //Retorna o aluno encontrado
        res.send(aluno);    
    },
    
    //Método responsável por fazer as inserções
    async store(req, res){
        const {ra, nome, email, senha} = req.body;

        //Verifica se o aluno já existe
        //Select * from alunos where ra = ? or email -?
        let aluno = await Aluno.findOne({
            where:{
                [Op.or]:[{ra:ra},{email:email}],
            },
        });

        if(aluno){
            return res.status(400).send({erro: "Aluno já cadastrado."});
        }
 
        aluno = await Aluno.create({ra, nome, email, senha});
        
        res.status(201).send(aluno);  
     
    },

    update(){

    },

    delete(){

    },

};