const connection = require('../infra/connection');
const uploadFiles = require('../files/uploadFiles')

class Pet {
    adicionar(pet, res){
        const sql = `INSERT INTO pets SET ?`;

        uploadFiles(pet.image, pet.name, (err, newPath) => {
            
            if(err){
                res.status(400).json({ err })
            } else {
                const newPet = {
                    name: pet.name,
                    image: newPath
                }
                connection.query(sql, newPet, err => {
                    if(err){
                        res.status(400).json(err)
                    } else {
                        res.status(200).json(newPet)
                    }
                });
            }
            
        })
    }
}

module.exports = new Pet;