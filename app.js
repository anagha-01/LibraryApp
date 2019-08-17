const Express=require('express')
var app=new Express()
var book=[
    {
        'title':'Randaamoozham',
        'author':'M T Vasudevan Nair',
        'publisher':'Cuurent Books',
        'pic':'/img/mt.jpg',
        
    },
    {
        'title':'Khasakkinte ithihasam',
        'author':'O V Vijayan',
        'publisher':'D C Books',
        'pic':"/img/ov.jpg",
        
    },
    {
        'title':'Balyakalasakhi',
        'author':'Vaikkam Muhammad Bashir',
        'publisher':'D C Books',
        'pic':"/img/bash.jpg"
        
    },
    {
        'title':'Neermathalam Poothakalam',
        'author':'Madhavikkutty',
        'publisher':'Curent Books',
        'pic':"/img/madh.jpg"
    },
    {
        'title':'Araachar',
        'author':'K R Meera',
        'publisher':'D C Books',
        'pic':"/img/kr.jpg"
    }
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

]
var aut=[
    {
        'name':'M T Vasudevan Nair',
        'dob':'9 August 1933',
        'place':'Kudallur',
        'pic':"/img/mt.jpg"
    },
    {
        'name':'O V Vijayan',
        'dob':'2 July 1930',
        'place':'Palakkad',
        'pic':"/img/ov.jpg"
    },
    {
        'name':'Vaikkam Muhammad Bashir',
        'dob':'21 January 1908',
        'place':'Thalayolapparambu',
        'pic':"/img/bash.jpg"
    },
    {
        'name':'Madhavikkutty',
        'dob':'31 March 1934',
        'place':'Punnayurkkulam',
        'pic':"/img/madh.jpg"
    },
    {
        'name':'K R Meera',
        'dob':'19 February 1970',
        'place':'Sasthamkotta',
        'pic':"/img/kr.jpg"
    }
]
app.set('view engine','ejs')
app.get('/readmore/:id',(req,res)=>{                                                  //Read more link from books

    const x=req.params.id;
    res.render('single',{'book': book[x],

    nav:[{link:'/books',title:'books'},{link:'/authors',title:'authors'}],

    title:'Library'}   )

})
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
app.get('/authors',(req,res)=>{       
    res.render('authors',
{
    nav:[{link:'/books',title:'books'},{link:'/authors',title:'authors'}],
    title:"Authors",aut:aut
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
app.get('/more/:id',(req,res)=>{                                                     //Read more link from Authors                             

    const y=req.params.id;
    res.render('second',{'aut': aut[y],

    nav:[{link:'/books',title:'books'},{link:'/authors',title:'authors'}],

    title:'Library'}   )

})
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running on http://localhost:3000")
})  