const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const authRouter = require('./routes/auth.routes')
const fileRouter = require('./routes/file.routes')
const corsMiddleware = require('./middleware/cors.middleware')
const filePathMiddleware = require('./middleware/filepath.middleware')
const staticPathMiddleware = require('./middleware/staticpath.middleware')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(fileUpload({ defCharset: 'utf8', defParamCharset: 'utf8' }))
app.use(corsMiddleware)
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
app.use(staticPathMiddleware(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(express.static('static'))
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)

		app.listen(PORT, () => {
			console.log('Ракета полетела на порту', PORT)
		})
	} catch (e) {}
}

start()
