const express = require('express')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const db = require('./db')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.use(session({
    secret: 'molestadinho', // use qualquer senha, mas coloque uma segura
    resave: false,
    saveUninitialized: true,
}));

// Rota de cadastro
app.post('/index', async(req, res)=>{
    try {
        const exists = await db.query('SELECT 1 FROM user s where email =$1')
    } catch (error) {
        
    }
})