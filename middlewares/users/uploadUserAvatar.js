const { ProcessImage } = require("../../services/users");

exports.uploadUserAvatar = ProcessImage.upload('avatar')