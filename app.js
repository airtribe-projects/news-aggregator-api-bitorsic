require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', require('./routes/usersRoute'));

(async () => {
	try {
		console.log("[+] Connecting to MongoDB...");
		await mongoose.connect(process.env.MONGODB_URL);
		console.log("[+] Connection Successful");

		app.listen(port, () => { console.log('[+] Server running on port ' + port) });
	} catch (e) {
		console.log("[-] Connection Failed");
	}
})();



module.exports = app;