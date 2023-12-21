const { body } = require('express-validator');

exports.loginValidation = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Минимум 5 символов пароля").isLength({ min: 5 }),
];

exports.registerValidation = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Минимум 5 символов пароля").isLength({ min: 5 }),
    body('fullName', "Укажите имя (мин 3 символа)").isLength({ min: 3 }),
    body('avatarUrl', "Некоректная ссылка").optional().isURL(),
];

exports.postCreateValidation = [
    body('title', "Введите заголовок статьи").isLength({ min: 3 }).isString(),
    body('text', "Введите текст статьи").isLength({ min: 5 }).isString(),
    body('tags', "Неверный формат тегов").optional().isArray(),
    body('imageUrl', "Некоректная ссылка").optional().isString(),
];
