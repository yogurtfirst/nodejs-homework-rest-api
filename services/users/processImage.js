const multer = require('multer')
const jimp = require('jimp')
const path = require('path')
const uuid = require('uuid').v4
const fse = require('fs-extra')

const { AppError } = require('../../utils')

class ProcessImage {
  static upload(name) {
    const multerStorage = multer.diskStorage({
        destination: (req, file, cbk) => {
            cbk(null, 'tmp')
        },
        filename: (req, file, cbk) => {
            const extension = file.mimetype.split('/')[1]
    
            cbk(null, `${req.user.id}-${uuid()}.${extension}`)
        }
    })

    const multerFilter = (req, file, cbk) => {
      if (file.mimetype.startsWith('image/')) {
        cbk(null, true)
      } else {
        cbk(new AppError(400, 'Please, upload images only!'), false)
      }
    }

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(name)
  }

  static async save(file) {
    const fileName = `${uuid()}.jpeg`
    const fullFilePath = path.join(process.cwd(), 'public', 'avatars')

    await fse.ensureDir(fullFilePath)
    await jimp.read(file.path).then(img => {
        return img
            .resize(250, 250)
            .quality(90)
            .write(path.join(fullFilePath, fileName))
    })
    
    return path.join('avatars', fileName)
  }
}

module.exports = ProcessImage