const express = require('express')
const app = express()
const data = require('./data')
const pgPromise = require('pg-promise')()

const database = pgPromise({database: "t1000"})

//mark would use console.log data hear to make sure we have it!
console.log(data)

const mustacheExpress = require('mustache-express')

//teach our app to use public for all public files
app.use(express.static('public'))

//teach our app to use mustache engine for rendering template
app.engine('mustache', mustacheExpress())

//teach our app where the views (templates) live
app.set('views', './views')

//teach our app to use mustache engine for our template
app.set('view engine', 'mustache')

app.get('/', (request, response) => {
  database.any('SELECT * FROM "t1000" ').then(robodata => {
	response.render('index', {users: robotdata})
})
})
// app.get('/info/:id', (request, response) => {
// 	const requestId = parseInt(request.params.id)
//
// 	const foundUser = data.users.find(user => user.id === requestId)
//
// 	response.render('info', foundUser)
// })
/*
app.get('users/:id', (request, response) => {
	response.render('users', data)
  const requestId = request.params.id
})
*/
app.listen(7777, function() {
	console.log('Looking good Billy Ray!!!')
})
