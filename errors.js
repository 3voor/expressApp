const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

var router = express.Router()

// erros in synchronus code
// app.get('/', function (req, res) {
//     throw new Error('BROKEN') //Express will catch this on its own
// })

// erros in asynchronus code
// app.get('/', function (req, res, next) {
//     fs.readFile('/file-does-not-exitst', function (err, data) {
//         if (err) {
//             console.error(err.stack)
//             next(err) // Pass errors to express
//         } else {
//             res.send(data)
//         }
//     })
// })

// if the callback in a sequence provides no data, only errors, you can simplify this code as follows:
// app.get('/', [
//     function (req, res, next) {
//         fs.writeFile('/inaccesible-path', 'data', next)
//     },
//     function (req, res) {
//         res.send('OK')
//     }
// ])

// catch erros that occur in asynchronus code 
// app.get('/', function (req, res, next) {
//     setTimeout(function () {
//         try {
//             throw new Error('BROKEN')
//         } catch (err) {
//             next(err)
//         }
//     }, 100) //100 miliseconds for timeout
// })

// use promise to avoid the overhead of the try..catch block or when using functions that return promises
// app.get('/', function (req, res, next) {
//     Promise.resolve().then(function () {
//         throw new Error('BROKEN')
//     }).catch(next) // Errors will be passed to Express
// })

// chain of handlers to rely on synchronus errors catching, by reducing the asynchronus code to something trivial
app.get('/', [
    function (req, res, next) {
        fs.readFile('/maybe-valid-file', 'utf-8', function (err, data) {
            res.locals.data = data
            next(err)
        })
    },
    function (req, res) {
        res.locals.data = res.locals.data.split(',')[1]
        res.send(res.locals.data)
    }
])
app.listen(port, () => {
    console.log('app listening in port: '+port)
})