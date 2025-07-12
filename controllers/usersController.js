const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel");

exports.signup = async (req, res) => {
	try {
		const { name, email, password, preferences } = req.body;

		if (!name || !email) {
			return res.status(400).send({ message: `name and email are required fields`});
		}

		if (typeof password !== "string" || password.length < 8) {
			return res.status(400).send({ message: `Password must be at least 8 characters long` });
		}

		const user = await userModel.create({
			name,
			email,
			password: await bcrypt.hash(password, 10),
			preferences,
		});

		res.status(200).send({ message: `User registered successfully` });
	} catch (err) {
		if (err.name === "MongooseError") {
      return res.status(409).send({ message: err.message });
    };

    if (err.name === "ValidationError") {
      const message = err.errors[Object.keys(err.errors)[0]].message;
      return res.status(400).send({ message: message || `Input validation failed` })
    }

    console.error(err);
    res.status(500).send({ message: err.message });
	}
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).send({ message: `Incorrect email or password`});
    }

    const token = jwt.sign(
		  { sub: user.id },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" },
		);

    res.status(200).send({
      message: `Successfully logged in`,
      id: user._id,
      token,
    })
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: e.message });
  }
};