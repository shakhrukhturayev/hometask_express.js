const {Router} = require('express')
const router = Router()
const path = require('path')
const fs = require('fs')

let arr=[] 

router.get('/books',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','books.json'))
})

fs.readFile(path.join(__dirname,'..','books.json'),'utf-8',(err,data)=>{
    if (err) throw err
    arr = JSON.parse(data)     
})

router.get('/books/:id',(req,res,next)=>{
    let book_id=req.params.id
    
    let ans = 'has not found id'
     arr.forEach((index)=>{
        if(index['id']==book_id){
            ans = JSON.stringify(index)
        }
    })

    res.send(ans)
})

router.get('/add-users',(req,res)=>{
    res.render('add-users')
})


router.post('/users',(req,res)=>{
     let has_title=false
     let {author,title}= req.body
     let new_id = arr.length+1
     arr.forEach((v)=>{
        if(v['title']==title){

           has_title=true    
        }
            
     })

     if(!has_title){
        
            arr.push({id:new_id, author, title})    
            fs.writeFileSync(path.join(__dirname,'..','books.json'),JSON.stringify(arr),(err)=>{
                console.log(err)
            }) 
         
     }
     else{
        console.log('already has such an title')
     }
    
   
    res.redirect('/')
})
/* 
* Section -4 
//Method PUT
//Descr Edit new id 
*/

router.get('/edit/:id',(req,res)=>{
    let has_id=false
    let edit_title=''
    let edit_author=''
    let edit_id=req.params.id
    arr.forEach((v)=>{
        if(v['id']==edit_id){
            has_id=true
            edit_title= v['title']
            edit_author=v['author']
        }
    })

   
 if(has_id==false){
console.log('bunaqa id yuq')
}
   
    res.render('edit',{
        id:edit_id,
        title:edit_title,
        author:edit_author
    })
})
router.put('/edit/:id',(req,res)=>{
    let edit_id= req.params.id
    let has_id=false
    let edit_title = req.query.title
    let edit_author= req.query.author
  

    arr[edit_id-1]['title']=edit_title
    arr[edit_id-1]['author']=edit_author

    fs.writeFileSync(path.join(__dirname,'..','books.json'),JSON.stringify(arr),(err)=>{
        console.log(arr)
    })

    res.redirect('/')
    
})

/* 
* Section -5
* Method DELETE
* descr: bor Id ma'lumotlarini o'chirish
 */

router.delete('/delete/:id',(req,res)=>{
    let del_id = req.params.id
    let hasDelId=false

    arr.forEach((val)=>{
     if(val['id']==del_id){
        hasDelId=true
     }     
    })

    if(hasDelId){
        console.log(arr)      

        arr.splice(del_id-1,1)
 
     
        fs.writeFileSync(path.join(__dirname,'..','books.json'),JSON.stringify(arr),(err)=>{
            console.log(err)
        })
        console.log(arr) 
    }
    else{
        console.log('ma\'lumot topilmadi ')
    }
    
})



exports.router = router
exports.arr= arr