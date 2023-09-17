const {Router} = require('express')
const router = Router()
const arr = require('./main.js')

router.get('/',(req,res)=>{
   
    res.render('main')
})


module.exports = router