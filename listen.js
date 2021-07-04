const app = require("./app");
const db = require('./db/connection.js');

const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});