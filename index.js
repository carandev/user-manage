import express from 'express'
import { engine } from 'express-handlebars'
import bodyParser from 'body-parser'
import connection from './database.js'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (request, response) => {
  const query = 'SELECT * FROM users'
  const users = []

  connection.query(query, (error, results) => {
    if (error) {
      console.log(error)
    } else {
      console.log(...results)
      users.push(...results)
    }
  })

  response.render('index', { users })
})

app.get('/user/create', (request, response) => {
  response.render('create')
})

app.post('/user/create', (request, response) => {
  const {name, age, email, phone} = request.body

  const query = `INSERT INTO users (name, age, email, phone) VALUES ('${name}', ${age}, '${email}', '${phone}')`

  connection.query(query, error => {
      if (error) {
          console.log(error)
      }
  })

  response.redirect('/')
})

app.listen(3000, () => {
    console.log('Server on http://localhost:3000')
})