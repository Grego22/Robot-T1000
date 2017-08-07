const express = require('express')
const app = express()
const data = require('./data')
const pgPromise = require('pg-promise')()
const database = pgPromise({database: "t1000"})
const mustacheExpress = require('mustache-express')

//mark would use console.log data hear to make sure we have it!



//teach our app to use public for all public files
app.use(express.static('public'))

//teach our app to use mustache engine for rendering template
app.engine('mustache', mustacheExpress())

//teach our app where the views (templates) live
app.set('views', './views')

//teach our app to use mustache engine for our template
app.set('view engine', 'mustache')

app.get('/', (request, response) => {
  database.any('SELECT * FROM "t1000" ').then(robotdata => {
	response.render('index', {users: robotdata})
  })
})
app.get('/info/:id', (request, response) => {
	const id = (request.params.id)
  database.one('SELECT * FROM "t1000" WHERE id =$1', [id])
  .then(robotdata => {
	response.render('info', robotdata)
})
})

app.listen(7778, function() {
	console.log('Looking good Billy Ray!!!')
})
