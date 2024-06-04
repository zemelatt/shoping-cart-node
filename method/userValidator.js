const checkBodyToRegister = (obj) => {
  const { userName, email } = obj;
  return userName.length < 1 && email.length < 1;
};
const checkBodyToLogin = (obj) => {
  const { email, password } = obj;
  return email.length < 1 && password.length < 1;
};
const checkBodyToCatagory = (obj) => {
  const { title } = obj;
  return title.length < 1;
};
module.exports = {
  checkBodyToRegister,
  checkBodyToLogin,
  checkBodyToCatagory,
};
