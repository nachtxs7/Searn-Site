const express = require('express')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const db = require('./db')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.static('frontend'))

app.use(session({
    secret: 'molestadinho', // use qualquer senha, mas coloque uma segura
    resave: false,
    saveUninitialized: true,
}));

// Rota de cadastro
app.post('/index', async(req, res)=>{

    const { nome, email, password } = req.body

    if(!nome || !email || !password){
        return res.send('Preencha todos os campos') // obrigatorio preencer os campos
    }

    try {
        const exists = await db.query('SELECT 1 FROM users WHERE email = $1', [email])

        if(exists.rowCount > 0){
            return res.send('Email já cadastrado')
        }

        const hashedpassword = await bcrypt.hash(password, 10) // Isso vai fazer a criptografia das senhas

        await db.query(
            'INSERT INTO users (nome, email, password) VALUES ($1, $2, $3)', [nome, email, hashedpassword]
        )

        res.redirect('/pages/login.html')

    } catch (error) {
        console.error(error)
        res.send('Erro no cadastro')
    }
})

// Rota de login
app.post('/login', async (req, res) =>{
    const { email, password } = req.body

    try {
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1', [email]
        )

        if(result.rowCount === 0 ){
            return res.send('Usuario não encontrado')
        }

        const user = result.rows[0]
        const valid = await bcrypt.compare(password, user.password)

        console.log('Senha válida?', valid)

        if(!valid){
            return res.send('Senha incorreta')
        }

        req.session.userId = user.id
        res.redirect('/dashboard')
    } catch (error) {
        res.send('Erro no login')
    }
})

// Rota do dashboard protegida
app.get('/dashboard', (req, res) =>{
    if (!req.session.userId){
        return res.redirect('/pages/login.html') // isso faz com que o usuario não possa acessar sem estar logado
    }
    res.sendFile(__dirname + '/frontend/pages/dashboard.html') // quando o usurio estiver logado, ele entra na pagina
})


// Rota de logout
app.get('/logout', (req, res) =>{
    req.session.destroy() // destroi a sessão do usuario após ele sair 
    res.redirect('/pages/login.html')
    // quando a sessão for destruida, ele volta para a pagina de login
})

app.listen(PORT, ()=>{
    console.log(`Servidor está rodando :p http://localhost:${PORT}`)
})