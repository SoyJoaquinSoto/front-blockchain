const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register

router.post("/", async (req, res) => {
	try {
		const { email, password, passwordVerify } = req.body;

		// validation

		if (!email || !password || !passwordVerify)
			return res
				.status(400)
				.json({ errorMessage: "Ingrese todos los campos requeridos." });

		if (password.length < 6)
			return res.status(400).json({
				errorMessage: "Ingrese una contraseña de por lo menos 6 caracteres.",
			});

		if (password !== passwordVerify)
			return res.status(400).json({
				errorMessage: "Ingrese la misma contraseña.",
			});

		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({
				errorMessage: "Ya existe una cuenta con este email.",
			});

		// hash the password

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		// save a new user account to the db

		const newUser = new User({
			email,
			passwordHash,
			role: "profesor",
		});

		const savedUser = await newUser.save();

		// sign the token

		const token = jwt.sign(
			{
				user: savedUser._id,
			},
			process.env.JWT_SECRET
		);

		// send the token in a HTTP-only cookie

		res
			.cookie("token", token, {
				httpOnly: true,
				secure: true,
				sameSite: "none",
			})
			.send();
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

// log in

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// validate

		if (!email || !password)
			return res
				.status(400)
				.json({ errorMessage: "Ingrese todos los campos requeridos." });

		const existingUser = await User.findOne({ email });
		if (!existingUser)
			return res
				.status(401)
				.json({ errorMessage: "Email o contraseña incorrectos." });

		const passwordCorrect = await bcrypt.compare(
			password,
			existingUser.passwordHash
		);
		if (!passwordCorrect)
			return res
				.status(401)
				.json({ errorMessage: "Email o contraseña incorrectos.." });

		// sign the token

		const token = jwt.sign(
			{
				user: existingUser._id,
				role: existingUser.role,
			},
			process.env.JWT_SECRET
		);

		// send the token in a HTTP-only cookie

		res
			.cookie("token", token, {
				httpOnly: true,
				secure: true,
				sameSite: "none",
			})
			.send();
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

router.get("/logout", (req, res) => {
	res
		.cookie("token", "", {
			httpOnly: true,
			expires: new Date(0),
			secure: true,
			sameSite: "none",
		})
		.send();
});

router.get("/loggedIn", (req, res) => {
	try {
		const token = req.cookies.token;
		if (!token) return res.json(false);
		const role = jwt.decode(token).role;

		jwt.verify(token, process.env.JWT_SECRET);

		res.json({ loggedIn: true, role: role });
	} catch (err) {
		res.json(false);
	}
});

module.exports = router;
