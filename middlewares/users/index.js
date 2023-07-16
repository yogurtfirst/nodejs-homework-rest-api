const { checkAccess } = require("./checkAccess");
const { checkRegisterUserData } = require("./checkRegisterUserData");
const { uploadUserAvatar } = require("./uploadUserAvatar");

module.exports = {
    checkRegisterUserData,
    checkAccess,
    uploadUserAvatar,
}