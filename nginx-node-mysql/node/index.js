const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Running at port ${port}`);
});

const mysql = require('mysql');
const config = {
    host: 'mysqldb',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const con = mysql.createConnection(config);

con.connect(err => {
    if (err) {
        console.error(err);
        con.end();
        throw err;
    }
    console.log('Connected!');
    const sql = 'CREATE TABLE IF NOT EXISTS people (id INT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))';
    con.query(sql, (err, _result) => {
        if (err) {
            console.error(err);
            con.end();
            throw err;
        }
        console.log('Table created');

        const query = 'INSERT IGNORE INTO people (id, name, address) VALUES ?';
        const values = [
            [1, 'John', 'Highway 71'],
            [2, 'Peter', 'Lowstreet 4'],
            [3, 'Amy', 'Apple st 652'],
            [4, 'Hannah', 'Mountain 21'],
            [5, 'Michael', 'Valley 345'],
            [6, 'Sandy', 'Ocean blvd 2'],
            [7, 'Betty', 'Green Grass 1'],
            [8, 'Richard', 'Sky st 331'],
            [9, 'Susan', 'One way 98'],
            [10, 'Vicky', 'Yellow Garden 2'],
            [11, 'Ben', 'Park Lane 38'],
            [12, 'William', 'Central st 954'],
            [13, 'Chuck', 'Main Road 989'],
            [14, 'Viola', 'Sideway 1633']
        ];
        con.query(query, [values], (err, result) => {
            if (err) {
                console.error(err);
                con.end();
                throw err;
            }
            console.log(`Number of records inserted: ${result.affectedRows}`);
            con.end();
        });
    });
});

app.get('/', (_req, res) => {
    const con = mysql.createConnection(config);
    con.connect((err) => {
        if (err) {
            console.error(err);
            res.send(`ERROR: ${err}`);
            con.end();
            throw err;
        }
        con.query('SELECT * FROM people', (err, result, _fields) => {
          if (err) {
            console.error(err);
            res.send(`ERROR: ${err}`);
            con.end();
            throw err;
          }
          console.log(result);
          const names = result.map(r => 
            `<tr><td>${r.id}</td><td>${r.name}</td><td>${r.address}</td></tr>`).join('');
          const html = `<html>
                        <head>
                            <style type="text/css">
                            table, th, td {
                                border: 1px solid black;
                                border-collapse: collapse;
                            }
                            </style>
                        </head>
                        <body>
                        <h1>Full Cycle Rocks!</h1>
                        <h2>Nomes Inseridos</h2>
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Endereço</th>
                            </tr>
                            ${names}
                        </table>
                        </body>
                        </html>`;
          res.send(html);
          con.end();
        });
      });    
});