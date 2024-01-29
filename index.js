const express = require('express');
const short =require('shortid')
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const {v4: uuidv4} =require('uuid')
const cookieparser = require('cookie-parser')




//middlewears
app.use(cookieparser())
app.set("view engine","ejs")
app.set('views',path.resolve('./views'))
app.use(express.urlencoded({extended:false}))



// sessionidtouser mapping
const sessionidtouserid = new Map();
async function setuser(id,user){
    sessionidtouserid.set(id,user);
}
async function getuser(id){
    return sessionidtouserid.get(id)
}


// authentication
async function authorizationuser(req,res,next){
    const userid = req.cookies?.uid;
    if(!userid){
        return res.redirect('/user/login')
    }
    console.log(userid)
    const user = getuser(userid);
    if(!user){
        return res.redirect('/user/login')
    }
    req.User =user;
    next();
}




// homepage request

app.get('/',async(req,res)=>{
    return res.render('getpage')
})

app.get('/user/login',async(req,res)=>{
    return res.render('login')
})
app.get('/user/signup',(req,res)=>{
    return res.render('signup')
})

//userschema mongoose
const userschema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
    }
})
const User = mongoose.model('users',userschema);



// urlschema mongoose
const urlschema = new mongoose.Schema({
    shorturl: {
        type: String,
    },
    directurl: {
        type: String,
        require: true
    }
})
const urls = mongoose.model("urlschema", urlschema)
mongoose.connect("mongodb://127.0.0.1:27017/tetserver").then((req, res) => {
    console.log("mongoose connected")
}).catch((err) => console.log(err))



//user methods
app.post('/user/signup',async(req,res)=>{
    const body = req.body;
    if(!body||
        !body.name||
        !body.email||
        !body.password){
            return res.render('signup',{
                error:'all credentials are required'
            })
        }
        const {name,email,password} = req.body;
        await User.create({
            name:name,
            email:email,
            password:password
        })
        return res.render('login')
})

app.post('/user/login',async(req,res)=>{
    const{ email, password } = req.body;
    const user1 = await User.findOne({email,password})
    if(!user1){
        return res.render('login')
    }
    const sessionid = uuidv4();
    setuser(sessionid,user1)
    res.cookie("uid",sessionid)
    return res.render('getpage')
})




// url methods

app.post('/urls',authorizationuser ,async(req, res) => {
    const body = req.body;
    if (!body ||
        !body.directurl) {
        console.log(body)
    }
    const shortid = short()
    await urls.create({
        shorturl:shortid,
        directurl:body.directurl
    })
    return res.render('red',{
        ur:`http://localhost:8000/urls/${shortid}`
    })
})
app.get('/urls/:shortid',async(req,res)=>{
    const result =await urls.findOne({shorturl:req.params.shortid})
    const direct = result.directurl;
    return res.redirect(direct);
})



const port = 8000;
app.listen(port, () => {
    console.log("server conneected.....")
})