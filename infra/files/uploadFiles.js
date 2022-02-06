const fs = require('fs');
const path = require('path');

module.exports = (imgPath, file_name, imageCreate) => {
    
    const acceptTypes = ['jpg', 'png', 'jpeg', 'gif'];
    const fileType = path.extname(imgPath)
    const validType = acceptTypes.indexOf(fileType.substring(1)) !== -1;

    if(validType){
        const newPath = `./assets/images/${file_name}${fileType}`
        
        fs.createReadStream(imgPath)
            .pipe(fs.createWriteStream(newPath))
            .on('finish', () => imageCreate(false, newPath))
    } else {
        const err = 'Erro: extensão do arquivo não é aceita';
        console.log('Erro: extensão do arquivo não é aceita')
        imageCreate(err)
    }
    
}