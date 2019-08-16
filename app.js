const Express=require('express')
var app=new Express()
app.set('view engine','ejs')
app.use(Express.static(__dirname+"/public"))
app.get('/',(req,res)=>{       
    res.render('index',
{
    nav:[{link:'/books',title:'Books'},{link:'/authors',title:'Authors'}],
    title:"Library"
}
) 
}
)
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running on http://localhost:3000")
})  