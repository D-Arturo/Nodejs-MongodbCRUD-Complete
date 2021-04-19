const { Router } = require("express");
const router = Router();

const {
  renderSignUpForm,
  signup,
  renderSigninForm,
  signin,
  logout
} = require("../controllers/users.controller");

//Para Registrarse
router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", signup);

//Para Logear
router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signin);

//Para desconectar
router.get("/users/logout", logout);

module.exports = router;
