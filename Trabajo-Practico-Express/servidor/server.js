const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

const reactPath = path.join(__dirname, "..", "proyecto-react", "dist");

app.use(express.static(reactPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
