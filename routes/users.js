const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, editUserData } = require('../controllers/users');
const emailRegex = require('../utils/constants');

router.get('/me', celebrate({
  params: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailRegex),
  }),
}), getUsers);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailRegex),
  }),
}), editUserData);

module.exports = router;
