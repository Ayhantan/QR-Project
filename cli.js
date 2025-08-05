#!/usr/bin/env node
import { Command } from "commander";
import qr from "qr-image";
import fs from "fs";
import open from "open";

const program = new Command();

program
  .option("-u, --url <url>", "URL to encode")
  .option("-f, --format <format>", "Format: png/svg", "png")
  .option("-o, --output <filename>", "Output file name", "qr_code")
  .action((options) => {
    const { url, format, output } = options;
    if (!url) {
      console.error("❌ URL gerekli!");
      process.exit(1);
    }
    const qr_svg = qr.image(url, { type: format });
    const outputPath = `outputs/${output}.${format}`;
    qr_svg.pipe(fs.createWriteStream(outputPath));
    qr_svg.on("end", async () => {
      console.log(`✅ QR oluşturuldu: ${outputPath}`);
      fs.writeFileSync(`outputs/${output}.txt`, url);
      await open(outputPath);
    });
  });

program.parse(process.argv);
