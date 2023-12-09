const express = require("express")

const app = express()

app.get("/getSomething", async (req, res) => {
  res.send("Something")
})

app.listen(3000, () => {
  console.info(`Listening on port 3000.`);
});