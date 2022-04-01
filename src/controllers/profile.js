const getDb = require('../services/db')

exports.create = async (req,res) => {
    const db = await getDb();

    // const email = req.body.email
    // const firstName = req.body.firstName
    const { email, firstName } = req.body

    try {
        // await db.query(`INSERT INTO FoodleProfile (email, firstName) VALUES (?,?)`, [email, firstName])

        await db.query('INSERT INTO FoodleProfile (email, firstname) VALUES (?, ?)', [
            email,
            firstName,
          ]);

        res.send('Profile Added').status(200)
    } catch (err) {
        res.status(500).json(err)
    }

    db.close()
 }

 exports.get = async (req,res) => {
    const db = await getDb();
    // const {email, firstName} = req.body

    try {
        const [ profiles ] = await db.query(`SELECT * FROM FoodleProfile`)
        res.status(200).json(profiles)
    } catch (err) {
        res.status(500).json(err)
    }

    db.close()
 }