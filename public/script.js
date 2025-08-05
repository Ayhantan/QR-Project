const langs = {
  en: {
    title: "QR Code Generator",
    generate_title: "Generate a QR Code",
    enter_url: "Enter URL:",
    format: "Select Format:",
    generate_btn: "Generate",
    decode_title: "Decode a QR Code",
    upload_file: "Upload QR Image:",
    decode_btn: "Decode",
    language: "Language:"
  },
  tr: {
    title: "QR Kod Oluşturucu",
    generate_title: "QR Kod Oluştur",
    enter_url: "URL Girin:",
    format: "Format Seçin:",
    generate_btn: "Oluştur",
    decode_title: "QR Kod Çöz",
    upload_file: "QR Görsel Yükle:",
    decode_btn: "Çöz",
    language: "Dil:"
  }
};

function setLang(lang) {
  localStorage.setItem("lang", lang);
  updateTexts();
}

function updateTexts() {
  const lang = localStorage.getItem("lang") || "tr";
  const t = langs[lang];
  document.getElementById("title").innerText = t.title;
  document.getElementById("generate-title").innerText = t.generate_title;
  document.getElementById("enter-url-label").innerText = t.enter_url;
  document.getElementById("format-label").innerText = t.format;
  document.getElementById("generate-btn").innerText = t.generate_btn;
  document.getElementById("decode-title").innerText = t.decode_title;
  document.getElementById("upload-file-label").innerText = t.upload_file;
  document.getElementById("decode-btn").innerText = t.decode_btn;
  document.getElementById("language-label").innerText = t.language;
}

updateTexts();
