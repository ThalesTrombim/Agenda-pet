class tables {
    init(conexao) {
        this.conexao = conexao;

        this.createSO();
        this.createPet();
    }

    createSO(){
        const sql = `CREATE TABLE IF NOT EXISTS atendimentos (
            id int NOT NULL AUTO_INCREMENT,
            cliente varchar(50) NOT NULL,
            pet varchar(20),
            servico varchar(20) NOT NULL,
            data datetime NOT NULL, 
            dataCriacao datetime NOT NULL,
            status varchar(20) NOT NULL,
            observacoes text,
            PRIMARY KEY(id)
        )`

        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro)
            } else{
                console.log("deu bom")
            }
        })
    }
    
    createPet(){
        const sql = `CREATE TABLE IF NOT EXISTS pets (
            id int NOT NULL AUTO_INCREMENT, 
            name varchar(50),
            image varchar(200),
            PRIMARY KEY (id)
        )`

        this.conexao.query(sql, err => {
            if(err){
                console.log(err)
            } else {
                console.log('tabela pets, criada com sucesso')
            }
        })
    }
}

module.exports = new tables;