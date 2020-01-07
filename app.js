const express = require('express')
const app = express()
const port = 3000

// express.static(root, [options])
// app.get('/', (req, res, err) => {
//     res.send('hello world')
// })

// Get method route
app.get('/', function (req, res) {
    res.send('Get request to the homepage')
})

// Post method route
app.post('/', function (req, res) {
    res.send('Post request tot he homepage')
})

// for all http request methods
app.all('/secret', function(req, res, next) {
    console.log('Accesssing the secret section ...')
    next() // pass control to the next handler
})

app.get('/', function (req, res) {
    res.send('root')
})

app.get('/about', function (req, res) {
    res.send('about')
})

app.get('/random.text', function (req, res) {
    res.send('random.text')
})

app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
})

// app.use(function (req, res, next) {
//     console.log('Time:', Date.now())
//     next()
// })

// app.use('/user/:id', function(req, res, next) {
//     console.log('Request type:', req.method)
//     next()
// })

// app.get('/user/:id', function (req, res, next) {
//     res.send('USER')
// })

// app.use('/user/:id', function(req, res, next) {
//     console.log('Request URL:', req.originalUrl)
//     next()
// }, function (req, res, next) {
//     console.log('Request type:', req.method)
//     next()
// })

// app.get('/user/:id', function  (req, res, next) {
//     console.log('ID:', req.params.id)
//     next()
// }, function (req, res, next) {
//     res.send('User info')
// })

// handler for the /user/:id path, which prints the user ID
// app.get('/user/:id', function (req, res, next) {
//     res.end(req.params.id)
// })

// skipping the rest of the middleware
// app.get('/user/:id', function (req, res, next) {
//     // if the user ID is 0, skip to the next route
//     if (req.params.id === '0') next('route')
//     // otherwise pass the control to the next middleware function in this stack
//     else next()
// }, function (req, res, next)  {
//     // send regular response
//     res.send('regular')
// })

function logOriginalUrl (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
}

function logMethod (req, res, next) {
    console.log('Request type:', req.method)
    next()
}

var logStuff = [logOriginalUrl, logMethod]
app.get('/user/:id', logStuff, function (req, res, next) {
    res.send('User info')
})

app.get('/flights/:from-:to', function (req, res) {
    res.send(req.params)
})

app.listen(port, () => {
    console.log('app listening in port: '+port)
})