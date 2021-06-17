const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

dotenv.config();

// set up server

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth", require("./routers/userRouter"));

app.get("*", function (request, response) {
	response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// connect to mongoDB

mongoose.connect(
	process.env.MDB_CONNECT,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) return console.error(err);
		console.log("Connected to MongoDB");
	}
);

// set up routes
