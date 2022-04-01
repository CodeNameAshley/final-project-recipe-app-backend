const getDb = require('../services/db')

exports.create = async (req,res) => {
    const db = await getDb();

    const { id , image , title } = req.body

    try {
        await db.query('INSERT INTO RecipeCard (id, image, title) VALUES (?, ?, ?)', [
            id,
            image,
            title,
          ]);

        res.send('Recipe Added').status(201)
    } catch (err) {
        res.status(500).json(err)
    }

    db.close()
 }

 exports.get = async (req,res) => {
    const db = await getDb();

    try {
        const [ recipes ] = await db.query(`SELECT * FROM RecipeCard`)
        res.status(200).json(recipes)
    } catch (err) {
        res.status(500).json(err)
    }

    db.close()
 }