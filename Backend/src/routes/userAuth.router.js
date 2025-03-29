const express= require('express');
const { login, logout, signUp } = require('../controller/userAuthConroller');
const userAuthRouter = express.Router();

// User Authentication Routes
userAuthRouter.post("/user/signUp", signUp);
userAuthRouter.post("/user/login", login);
userAuthRouter.post("/user/logout", logout);

module.exports = userAuthRouter;