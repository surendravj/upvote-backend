const { register, login } = require("../services/auth.service");

const router = require("express").Router();

router.post("/register",register);

router.post("/login",login);


module.exports=router;