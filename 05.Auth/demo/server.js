const express=require('express');
const bodyParser= require('express').urlencoded;
const expressSession=require('express-session');
const bcrypt=require('bcrypt');

const users={};

const app=express();
app.use(bodyParser({extended:false }));
app.use(expressSession({
    secret: 'my random secret',
    resave:false,
    saveUninitialized: true,
    cookie:{ secure:false }
}));

app.all('*',(req, res, next)=>{
    console.log('>>>',req.method,req.url,req.body);
    console.log('>>> Session data: ',req.session);
    next();
})

app.get('/',(req, res)=>{
    res.send(`<h1>Welcome</h1>
    <a href="/">Home</a>
    <a href="/register">Register</a>
    <a href="/login">Login</a>
    `);
});

app.get('/register', (req,res)=>{
    res.send(`
    <h1>Register</h1><a href="/">Home</a><a href="/login">Login</a>
    <form action="/register" method="POST">
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Repeat: <input type="password" name="repass"></label>
    <input type="submit" value="Register">
    </form>
    `)
})

app.get('/login', (req,res)=>{
    res.send(`
    <h1>Register</h1><a href="/">Home</a><a href="/register">Register</a>
    <form action="/login" method="POST">
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <input type="submit" value="Login">
    </form>
    `)
})

app.post('/register',async (req,res)=>{
    const id=('00000000' + (Math.random() *99999999 | 0).toString(16)).slice(-4);

    const hashedPassword=await bcrypt.hash(req.body.password, 8);

    users[id]={
        username: req.body.username,
        hashedPassword
    };

    res.redirect('/login');
});

app.post('/login',async (req,res)=>{  
    const username = req.body.username
    
    const user = Object.values(users).find(([id, u]) => u.username == username);
    const passwordMatch=await bcrypt.compare(req.body.password, user.hashedPassword)

    if( user && passwordMatch ){
        req.session.user={
            _id: user.id,
            username
        };
        res.redirect('/');
    }else{
        res.send('Wrong Password');
    }
});


app.listen(3000);