const mysql = require("mysql");

const db = mysql.createConnection({

});

const app = require('express')();
const port = 8080;

app.listen(
    port,
    () => {console.log("she's alive")

    db.connect(err=>{
        console.log("connected")
        if (err) {
            console.log(err.message);
            return
        }
    });}
)

app.get('/userLogin', (req,res) => {
    const SQL = "SELECT * FROM loginInDetails WHERE lastName = 'Ngobeni'"
    let body = 'NOTHING HERE';

    db.query(SQL, function (err, result) {
        if (err) throw err;
    body = result;

    res.status(200).send(body)
      });
    console.log("Nice");
})
