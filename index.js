const express = require("express")
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.post("/dialogflow-fulfillment", (request, response) => {
    console.info("test")
})

app.listen(port, () => {
    console.info(`Listening on port ${port}`)
})