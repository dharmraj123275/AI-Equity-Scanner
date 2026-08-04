const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static("."));

app.get("/api/status", (req, res) => {
  res.json({
    status: "Running",
    market: "NSE",
    scanner: "AI Equity Scanner Pro"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
