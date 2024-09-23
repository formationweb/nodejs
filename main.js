import http from "http";
import fs from "fs/promises";
import path from "path";

const port = process.argv[2] || 3000;

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const server = http.createServer(async (req, res) => {
  if (req.url == "/") {
    try {
      const content = await fs.readFile(
        path.join(__dirname, "static", "index.html"),
        "utf8"
      );
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(content);
    } catch (err) {
      res.writeHead(500);
      res.end();
    }
  } else {
    res.writeHead(404);
    res.end("Page non trouvée");
  }
});

server.listen(port, () => {
  console.log("serveur démarre sur le port", port);
});
