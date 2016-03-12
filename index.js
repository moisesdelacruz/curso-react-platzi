/*
 * Module Despendencies
 */

const express = require('express')
const http = require('http')
const engine = require('socket.io')
const dbapi = require('./db-api')

const port = process.env.PORT || 8080
const app = express()

// Configurar la ruta de archivos estaticos.
app.use('/', express.static(__dirname + '/public'))

app.get('/pokemons', (req, res) => {
	dbapi.pokemons.find((pokemons) => {
		res.json(pokemons)
	})
})

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

var server = http.createServer(app).listen(port, () => {
	console.log(`Server runnig in port: ${port}`)
})

const io = engine.listen(server)

io.on('connection', (socket) => {
	socket.on('message', (msg) => {
		io.emit('message', msg)
	})
})