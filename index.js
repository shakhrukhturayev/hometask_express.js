const express = require('express')
const mainRouter = require('./routes/main')
const basicRouter = require('./routes/basic')
const {engine} = require('express-handlebars')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', 'views')


app.use(mainRouter.router)
app.use(basicRouter)




app.use((req,res)=>{
    res.status(404).send('<h1> OOps page not found</h1>')
})

const PORT = process.env.PORT || 4200

app.listen(PORT,()=>{
    console.log('connected on ' +`${PORT}`)
})