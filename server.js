const express = require('express')
const app = express()
const data = require('./data')
const pgPromise = require('pg-promise')()
const database = pgPromise({database: "t1000"})
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require("express-validator")

//mark would use console.log data hear to make sure we have it!



//teach our app to use public for all public files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.use(bodyParser.json())

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
	const id = request.params.id

  database.one('SELECT * FROM t1000 WHERE id =$1', [id])

  .then(robotdata => {
    response.render("info", robotdata)
     })

  // .catch(robotdata => {
  //      response.render("error", robotdata)
  //    })
  })

  app.get('/add', (request, response)=>{
    response.render('addRobot')
  })
app.post('/addId', (request, response) =>{
request.checkBody('username', 'You must enter a Username').notEmpty()
  let errors = request.validationErrors()

if(errors){
  response.render('index', {errors})
} else {

const insertRobot ={
    username: request.body.username,
    email: request.body.email,
    university: request.body.university,
    job: request.body.job
  }
    database
    .one(
      `INSERT INTO "t1000" (username, email, university, job) VALUES ($(username), $(email), $(university), $(job)) RETURNING id`,
      insertRobot
    )
    .then(insertRobotId => {
      robot_id: insertRobotId.id
    })
    .catch(error => {
      console.log(error)
    })

  response.redirect("/")
}
})

app.delete('/info/:id', (request, response) =>{
  const id = request.params.id
  database.none('DELETE FROM "t1000" WHERE ID =$1', [id]).then(() =>{
    response.json({success:true})
  })
})

app.listen(7778, function() {
	console.log('Looking good Billy Ray!!!')
})
