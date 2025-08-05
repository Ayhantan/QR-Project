import express from "express";
import qr from "qr-image";
import multer from "multer";
import Jimp from "jimp";
import QrCode from "qrcode-reader";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/generate", (req, res) => {
  const url = req.query.url;
  const qr_png = qr.image(url, { type: "png" });
  res.type("png");
  qr_png.pipe(res);
});

app.post("/decode", upload.single("qrfile"), (req, res) => {
  Jimp.read(req.file.path, (err, image) => {
    if (err) throw err;
    const qr = new QrCode();
    qr.callback = (err, value) => {
      if (err) return res.send("QR okunamadı!");
      res.send(`✅ Çözülen: ${value.result}`);
    };
    qr.decode(image.bitmap);
  });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
