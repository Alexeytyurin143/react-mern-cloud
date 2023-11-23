const fs = require('fs')
const File = require('../models/File')
const config = require('config')

class FileService {
	createDir(req, file) {
		const filePath = this.getPath(req, file)
		return new Promise((resolve, reject) => {
			try {
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath)
					return resolve({ message: 'Файл успешно создан' })
				} else {
					return reject({ message: 'Файл уже существует' })
				}
			} catch (e) {
				return reject({ message: 'Файловая ошибка' })
			}
		})
	}

	deleteFile(req, file) {
		const path = this.getPath(req, file)
		if (file.type === 'dir') {
			fs.rmdirSync(path)
		} else {
			fs.unlinkSync(path)
		}
	}

	getPath(req, file) {
		return req.filePath + '/' + file.user + '/' + file.path
	}
}

module.exports = new FileService()
