const { getCurrent } = require("./getCurrent");
const { login } = require("./login");
const { logout } = require("./logout");
const { register } = require("./register");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
    register,
    login,
    logout,
    getCurrent,
    updateAvatar,
}