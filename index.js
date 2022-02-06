const customExpress = require('./config/customExpress');
const connection = require('./infra/database/connection')

const tables = require('./infra/database/tables');

connection.connect((erro) => {
    if(erro){
        console.log(erro)
    } else {
        
        tables.init(connection);
        
        const app = customExpress();

        app.listen(4000, () => console.log("rodando"));
    }
});
