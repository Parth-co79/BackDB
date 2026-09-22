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
app.post("/assignments",async(req,res)=>{
    const {title, deadline, submitted} = req.body;
    try {
    let res = await pool.query(`INSERT INTO assignments
(title, deadline,submitted)
VALUES ($1, $2, $3)
RETURNING *;
`,[title, deadline, submitted]); 
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } 
})


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