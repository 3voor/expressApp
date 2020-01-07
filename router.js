const express = require('express')
const app = express()
const port = 3000

var router = express.Router()

// a middleware function with no mount path. This code is executed for everu request to the router
router.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
}, function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
})

// a middleware sub-stack that hanldes GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next router
    if (req.params.id === '0') next('route')
    // otherwise pass control to the next middleware function in this stack
    else next()
}, function (req, res, next) {
    // render a regular page
    res.render('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
    console.log(req.params.id)
    res.render('special')
})

// mount the router on the app
// app.use('/', router)


// to skip the rest of the routers middleware functions, call next('router') to pass control back out of the router instance

// predicate the router with a check and bail out when needed
router.use(function (req, res, next) {
    console.log(req.headers)
    if (!req.headers['x-auth']) return next('router')
    next()
})

router.get('/', function (req, res) {
    res.send('hello, user!')
})

// use the router and 401 anything failing through
app.use('/admin', router, function (req, res) {
    res.sendStatus(401)
})

// error-handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})



app.listen(port, () => {
    console.log('app listening in port: '+port)
})