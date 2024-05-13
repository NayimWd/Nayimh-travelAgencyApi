const app = require("./app");
// dotenv configure
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 6000;
app.listen(port, () => {
	console.log("Server is runnig on port:", port);
});
