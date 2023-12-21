const PostController = require("./PostController");
const UserController = require("./UserController");

module.exports = {
    getMe: UserController.getMe,
    login: UserController.login,
    register: UserController.register,
    create: PostController.create,
    getAll: PostController.getAll,
    getOne: PostController.getOne,
    remove: PostController.remove,
    update: PostController.update
};
