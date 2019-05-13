const app = require("./App");

const port = process.env.PORT || 3000

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

