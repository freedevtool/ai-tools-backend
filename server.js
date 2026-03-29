const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

// Health check
app.get("/", (req, res) => {
  res.send("API Running");
});

/* CAPTION GENERATOR */
app.post("/caption", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a creative caption writer." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    res.json({
      result: data.choices?.[0]?.message?.content || "No result"
    });

  } catch (err) {
    res.status(500).json({ error: "Caption API failed" });
  }
});

/* PARAPHRASER */
app.post("/paraphrase", async (req, res) => {
  try {
    const text = req.body.text;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Rewrite the sentence clearly and naturally." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();

    res.json({
      result: data.choices?.[0]?.message?.content || "No result"
    });

  } catch (err) {
    res.status(500).json({ error: "Paraphrase API failed" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server running"));
