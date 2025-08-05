import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import open from "open";
import path from "path";

async function generateQR() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "Kaç adet URL gireceksiniz?",
      name: "count",
      validate: (input) => !isNaN(input) && Number(input) > 0,
    },
  ]);

  const urls = [];
  for (let i = 0; i < Number(answers.count); i++) {
    const { url, filename, format } = await inquirer.prompt([
      {
        type: "input",
        message: `(${i + 1}) URL girin:`,
        name: "url",
        validate: (input) => input.startsWith("http") || "URL http ile başlamalı!",
      },
      {
        type: "input",
        message: "Dosya adı (uzantısız):",
        name: "filename",
        default: `qr_code_${i + 1}`,
      },
      {
        type: "list",
        message: "Format:",
        name: "format",
        choices: ["png", "svg"],
      },
    ]);
    urls.push({ url, filename, format });
  }

  // ===> 📁 outputs klasörü varsa yoksa oluştur
  const outputDir = path.join(process.cwd(), "outputs");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`✅ 'outputs/' klasörü oluşturuldu.`);
  }

  urls.forEach(async ({ url, filename, format }) => {
    const qr_svg = qr.image(url, { type: format });
    const outputPath = path.join(outputDir, `${filename}.${format}`);
    qr_svg.pipe(fs.createWriteStream(outputPath));

    qr_svg.on("end", async () => {
      console.log(`✅ QR oluşturuldu: ${outputPath}`);
      fs.writeFileSync(path.join(outputDir, `${filename}.txt`), url);
      await open(outputPath);
    });
  });
}

generateQR();
