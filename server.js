// npm install express node-fetch
const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_KEY; // set in env

app.post("/openai", async (req, res) => {
  try {
    const body = req.body;
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "server error"});
  }
});

app.listen(3000, ()=>console.log("proxy listening on 3000"));
