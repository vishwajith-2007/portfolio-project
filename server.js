const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()

app.use(cors())
app.use(express.json())

const pool = new Pool({

connectionString:"postgresql://portfolio_user:S4CXsexGZsQPiOzCG6wMXZfe0KqWoNMe@dpg-d6fd0fggjchc73flsuu0-a.singapore-postgres.render.com/portfolio_tqk2",

ssl:{
rejectUnauthorized:false
}

})

pool.query(`
CREATE TABLE IF NOT EXISTS contacts(

id SERIAL PRIMARY KEY,
name TEXT,
email TEXT,
message TEXT

)
`)
app.post("/contact", async (req, res) => {

try {

const { name, email, message } = req.body

await pool.query(

"INSERT INTO contacts(name,email,message) VALUES($1,$2,$3)",

[name, email, message]

)

res.send("Data saved successfully")

}
catch(err){

console.log(err)

res.send("Error saving data")

}

})
app.get("/contacts", async (req, res) => {

const result = await pool.query("SELECT * FROM contacts")

res.json(result.rows)

})
app.listen(3000, ()=>{

console.log("Server running on port 3000")

})