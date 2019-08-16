let getLoginRegister = (req,res) => 
{
  return res.render("authLogin/master");
}

module.exports = {
  getLoginRegister: getLoginRegister
};