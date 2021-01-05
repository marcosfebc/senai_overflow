// Timestamp coloca created_at e updated, nas tabelas
// Underscored coloca os nomes de tabelas e atributos nodo snake_case

module.exports = {
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "bcd147",
    database: "senai_overflow",
    logging: console.log,
    define:{
        timestamp: true,
        underscored: true,
    },
};