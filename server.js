import express from "express";
import qr from "qr-image";
import multer from "multer";
import { createRequire } from "node:module";
import QrCode from "qrcode-reader";
import fs from "fs";
import path from "path";
import i18n from "i18n";

// CommonJS modülleri için require kullan
const require = createRequire(import.meta.url);
const Jimp = require("jimp");
const Jimp = JimpModule.default || JimpModule;

//  Dil desteği ayarları
i18n.configure({
  locales: ["en", "tr"],
  directory: path.join(process.cwd(), "locales"),
  defaultLocale: "tr",
  cookie: "lang",
});

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(i18n.init);
app.use(express.static("public"));

//  Ana sayfa
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

//  Dil değiştir
app.get("/lang/:locale", (req, res) => {
  res.cookie("lang", req.params.locale);
  res.redirect("/");
});

// QR oluştur
app.get("/generate", (req, res) => {
  const url = req.query.url;
  const format = req.query.format || "png";

  if (!url) return res.status(400).send("URL gerekli!");

  const qr_image = qr.image(url, { type: format });
  res.type(format);
  qr_image.pipe(res);
});

// QR çöz
app.post("/decode", upload.single("qrfile"), (req, res) => {
  Jimp.read(req.file.path)
    .then((image) => {
      const qr = new QrCode();
      qr.callback = (err, value) => {
        if (err) return res.send("QR okunamadı!");
        res.send(`✅ Çözülen: ${value.result}`);
      };
      qr.decode(image.bitmap);
    })
    .catch((err) => {
      console.error(err);
      res.send("Görsel okunamadı!");
    });
});

app.listen(3000, () => {
  console.log("✅ Sunucu çalışıyor: http://localhost:3000");
});
