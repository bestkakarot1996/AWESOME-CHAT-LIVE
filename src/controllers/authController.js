let getLoginRegister = (req,res) => 
{
  return res.render("authLogin/loginRegister");
}

module.exports = {
  getLoginRegister: getLoginRegister
};