function staticPath(path) {
	return function (req, res, next) {
		req.staticPath = path
		next()
	}
}

module.exports = staticPath
