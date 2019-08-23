const Express=require('express')
var bodyParser=require('body-parser')
const Mongoose=require('mongoose')
var request=require('request')
var app=new Express()


// var book=[
//     {
//         'title':'Randaamoozham',
//         'author':'M T Vasudevan Nair',
//         'publisher':'Cuurent Books',
//         'pic':'/img/mt.jpg',
        
//     },
//     {
//         'title':'Khasakkinte ithihasam',
//         'author':'O V Vijayan',
//         'publisher':'D C Books',
//         'pic':"/img/ov.jpg",
        
//     },
//     {
//         'title':'Balyakalasakhi',
//         'author':'Vaikkam Muhammad Bashir',
//         'publisher':'D C Books',
//         'pic':"/img/bash.jpg"
        
//     },
//     {
//         'title':'Neermathalam Poothakalam',
//         'author':'Madhavikkutty',
//         'publisher':'Curent Books',
//         'pic':"/img/madh.jpg"
//     },
//     {
//         'title':'Araachar',
//         'author':'K R Meera',
//         'publisher':'D C Books',
//         'pic':"/img/kr.jpg"
//     }
    // {
    //     'title':'Oru Desathinte Katha',
    //     'author':'S K Pottakkad',
    //     'publisher':'D C Books',
        
    // },
    // {
    //     'title':'Mayyazhippuzhayude Theerangalil',
    //     'author':'M Mukundan',
    //     'publisher':'D C Books',
        
    // },
    // {
    //     'title':'Chemmeen',
    //     'author':'Thakazhi',
    //     'publisher':'D C Books',
        
    // }, 
    // {
    //     'title':'Ini Njan Urangatte',
    //     'author':'P K Balakrishnan',
    //     'publisher':'D C Books',
        
    // },
    // {
    //     'title':'Aadujeevitham',
    //     'author':'Benyamin',
    //     'publisher':'D C Books',
        
    // }

//]
// var aut=[
//     {
//         'name':'M T Vasudevan Nair',
//         'dob':'9 August 1933',
//         'place':'Kudallur',
//         'pic':"/img/mt.jpg"
//     },
//     {
//         'name':'O V Vijayan',
//         'dob':'2 July 1930',
//         'place':'Palakkad',
//         'pic':"/img/ov.jpg"
//     },
//     {
//         'name':'Vaikkam Muhammad Bashir',
//         'dob':'21 January 1908',
//         'place':'Thalayolapparambu',
//         'pic':"/img/bash.jpg"
//     },
//     {
//         'name':'Madhavikkutty',
//         'dob':'31 March 1934',
//         'place':'Punnayurkkulam',
//         'pic':"/img/madh.jpg"
//     },
//     {
//         'name':'K R Meera',
//         'dob':'19 February 1970',
//         'place':'Sasthamkotta',
//         'pic':"/img/kr.jpg"
//     }
// ]


app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const BookModel=Mongoose.model("bookdetails",{
    name:String,
    author:String,
    publisher:String,
    img:String
})


const AutModel=Mongoose.model("autdetails",{
    aname:String,
    dob:String,
    place:String,
    img:String
})


Mongoose.connect("mongodb://localhost:27017/bookdb")
app.get('/readmore/:id',(req,res)=>{                                                  //Readmore link from books

    const x=req.params.id;
    res.render('single',{'book': book[x],

    nav:[{link:'/books',title:'books'},{link:'/authors',title:'authors'}],

    title:'Library'}   )

})


app.use(Express.static(__dirname+"/public"))
app.get('/',(req,res)=>{       
    res.render('index',
{
    nav:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addb',title:'Add Books'},{link:'/addAut',title:'Add Authors'}],
    title:"Library"
}) 
})

const getAut="http://localhost:3000/getAutApi"

app.get('/authors',(req,res)=>{
    request(getAut,(error,response,body)=>{
        var aut=JSON.parse(body)
        console.log(aut)       
    res.render('authors',
{aut:aut,nav:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addb',title:'Add Books'},{link:'/addAut',title:'Add Authors'}],
    title:"Authors"
}) 
})
})


const getdataApi="http://localhost:3000/getdatas"

app.get('/books',(req,res)=>{
    request(getdataApi,(error,response,body)=>{
        var data=JSON.parse(body)
        console.log(data)
        res.render('books',{data:data,nav:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addb',title:'Add Books'},{link:'/addAut',title:'Add Authors'}]})
    })        
})




app.get('/login',(req,res)=>{
    res.render('login')
})


app.get('/signup',(req,res)=>{
    res.render('signup')
})


app.get('/more/:id',(req,res)=>{                                                     //Read more link from Authors                             

    const y=req.params.id;
    res.render('second',{'aut': aut[y],

    nav:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addb',title:'Add Books'},,{link:'/addAut',title:'Add Authors'}],

    title:'Library'}   )

})


app.get('/addb',(req,res)=>{
    res.render('addb',{nav:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addb',title:'Add Books'},{link:'/addAut',title:'Add Authors'}]})
})


app.get('/addAut',(req,res)=>{
    res.render('addAut',{nav:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addb',title:'Add Books'},{link:'/addAut',title:'Add Authors'}]})
})


app.post('/readApi',(req,res)=>{
    console.log(req.body)
    var book=new BookModel(req.body)
    var result=book.save((error,data)=>{
        if(error){
            throw error
        }
        else{
            res.send(result)
        }
    })
    
})


app.post('/readAutApi',(req,res)=>{
    console.log(req.body)
    var aut=new AutModel(req.body)
    var result=aut.save((error,data)=>{
        if(error)
        {
            throw error
        }
        else{
            res.send(result)
        }
    })
})


app.get('/getdatas',(req,res)=>{
    result=BookModel.find((error,data)=>{
        if(error)
        {
            throw error
        }
        else{
            res.send(data)
        }
    })
})


app.get('/getAutApi',(req,res)=>{
    result=AutModel.find((error,data)=>{
        if(error)
        {
            throw error
        }
        else
        {
            res.send(data)
        }
    })
})

// app.get('/viewb',(req,res)=>{
//     res.render('viewb',
//     {
//         nav:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addb',title:'Add Books'}],
//         title:"Library"
//     }
//     ) 
// })

app.get('/singlebookFetchApi/:id',(req,res)=>{

    var id=req.params.id;

    BookModel.find({_id:id},(error,data)=>{
        if(error){
            throw error;
        }
        else{

            res.send(data);
        }
    })

})


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running on http://localhost:3000")
})  