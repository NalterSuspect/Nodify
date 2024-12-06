const bcrypt = require('bcrypt');
const db = require('../services/db.service')

async function register(req, res, async) {
  res.render('user/register')
}

async function registerUser(req,res,next){
  try{
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    db.createUser(req.body.username, hashedPassword)
    res.redirect("login");
  }catch{
    res.redirect("register");
  }
}

async function login(req, res, next) {
  if(!req.session.user){
    res.render('user/login');
  }else{
    res.redirect('/profile/posts');
  }
}

async function loginUser(req, res, next) {
  const userObj = await db.getUser(req.body.username);
  const match =await bcrypt.compare(req.body.password, userObj.password);
  if (match) {
    req.session.idUser = userObj.id;
    res.redirect('/callback');
  } else {
    res.redirect('login');
  }
}

async function logout(req, res, next) {
  
}

module.exports = {
  login,
  loginUser,
  logout,
  register,
  registerUser
};