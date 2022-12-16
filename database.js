import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'user_manage_db'
})

connection.connect(error => {
    if (error) {
        console.error(error)
    } else {
        console.log('Database connected')
    }
})

export default connection