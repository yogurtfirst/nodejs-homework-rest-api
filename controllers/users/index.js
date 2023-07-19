const { getCurrent } = require("./getCurrent");
const { login } = require("./login");
const { logout } = require("./logout");
const { register } = require("./register");
const { resendVerificationMail } = require("./resendVerificationMail");
const { updateAvatar } = require("./updateAvatar");
const { verifyUser } = require("./verifyUser");

module.exports = {
    register,
    login,
    logout,
    getCurrent,
    updateAvatar,
    verifyUser,
    resendVerificationMail,
}