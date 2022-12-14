import express from 'express'
import { engine } from 'express-handlebars'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

const users = []

app.get('/', (request, response) => {
  response.render('index', { users })
})

app.get('/user/create', (request, response) => {
  response.render('create')
})

app.post('/user/create', (request, response) => {
  const user = request.body

  users.push(user)

  response.redirect('/')
})

app.listen(3000, () => {
    console.log('Server on http://localhost:3000')
})