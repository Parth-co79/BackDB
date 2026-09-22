const express = require("express")
const app = express()
const pg = require("pg");
const { Pool } = pg;
app.use(express.json())
const pool = new Pool({
    user: 'nstparth',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'z1',
});

app.get("/assignments",async(req,res)=>{
    try {
    let res = await pool.query('SELECT * FROM assignments'); 
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } 
})
app.post("/assignments", async (req, res) => {
    const { title, deadline } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO assignments (title, deadline)
             VALUES ($1, $2)
             RETURNING *`,
            [title, deadline]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error creating assignment"
        });
    }
});


async function getData() {
  try {
    let res = await pool.query(`INSERT INTO assignments
(title, deadline)
VALUES ('Learn PostgreSQL', '2026-09-20')
RETURNING *;`); // 2. Assigned result to `res`
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  }
}

getData();


app.listen(3000,()=>{
    console.log("Server running on port 3000")
})