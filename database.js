const mysql = require('mysql');
const dbConfig = require('./config'); // Import the database configuration

// Create a MySQL connection
const con = mysql.createConnection(dbConfig);

// Connect to the database
con.connect((err) => {
  if (err) throw err;
  console.log('MySQL Database Connected!');
});

module.exports = con; // Export the connection object

