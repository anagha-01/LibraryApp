const Express=require('express')
var app=new Express()
var book=[
    {
        'title':'Randaamoozham',
        'author':'M T Vasudevan Nair',
        'publisher':'Cuurent Books',
        
    },
    {
        'title':'Araachar',
        'author':'K R Meera',
        'publisher':'D C Books',
        
    },
    {
        'title':'Khasakkinte ithihasam',
        'author':'O V Vijayan',
        'publisher':'D C Books',
        
    },
    {
        'title':'Balyakalasakhi',
        'author':'Vaikkam Muhammad Bashir',
        'publisher':'D C Books',
        
    },
    {
        'title':'Neermathalam Poothakalam',
        'author':'Madhavikkutty',
        'publisher':'Curent Books',
        
    }

]
app.set('view engine','ejs')
app.use(Express.static(__dirname+"/public"))
app.get('/',(req,res)=>{       
    res.render('index',
{
    nav:[{link:'/books',title:'books'},{link:'/authors',title:'authors'}],
    title:"Library"
}
) 
}
)
app.get('/books',(req,res)=>{       
    res.render('books',
{
    nav:[{link:'/books',title:'books'},{link:'/authors',title:'authors'}],
    title:"Books",book:book
}
) 
}
)
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running on http://localhost:3000")
})  