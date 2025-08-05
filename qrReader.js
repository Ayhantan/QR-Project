import Jimp from "jimp";
import QrCode from "qrcode-reader";
import fs from "fs";

const filePath = process.argv[2];
if (!filePath) {
  console.error("Lütfen bir QR dosya yolu verin!");
  process.exit(1);
}

Jimp.read(fs.readFileSync(filePath), (err, image) => {
  if (err) throw err;
  const qr = new QrCode();
  qr.callback = (err, value) => {
    if (err) console.error(err);
    else console.log("✅ Çözülen QR:", value.result);
  };
  qr.decode(image.bitmap);
});
