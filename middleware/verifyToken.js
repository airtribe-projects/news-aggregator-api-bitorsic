const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			throw new Error(`Authorization header not provided`);
		}

		const authHeader = req.headers.authorization.split(" ");
		if (authHeader[0] !== "Bearer") {
			throw new Error(`Invalid Authorization header`);
		}

		const { sub } = jwt.verify(authHeader[1], process.env.JWT_SECRET);

		req.user = { id: sub };
		next();
	} catch (e) {
		res.status(401).send({ message: e.message });
	}
};

module.exports = verifyToken;