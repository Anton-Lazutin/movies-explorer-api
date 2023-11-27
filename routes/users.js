const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, editUsers } = require('../controllers/users');
const emailRegex = require('../utils/constants');

router.get('/users/me', celebrate({
  params: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailRegex),
  }),
}), getUsers);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailRegex),
  }),
}), editUsers);

module.exports = router;
