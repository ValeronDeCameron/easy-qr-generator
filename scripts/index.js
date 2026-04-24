const createQrInput = document.getElementById("createQrInput");
const createQrButton = document.getElementById("createQrButton");
const qrcodeDiv = document.getElementById("qrcode");
const errorDiv = document.getElementById("error");
const downloadPngButton = document.getElementById("downloadPng");
const downloadJpgButton = document.getElementById("downloadJpg");
const downloadSvgButton = document.getElementById("downloadSvg");
const clearBtn = document.getElementById("clearBtn");

let qrCodeVariable = "";

const getRandomUID = (length = 4) =>
  Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
const clearAll = () => {
  fetch("./assets/defaultQrCode.svg")
    .then(res => res.text())
    .then(svg => {
      qrcodeDiv.innerHTML = svg;
    });
  downloadPngButton.disabled = true;
  downloadJpgButton.disabled = true;
  downloadSvgButton.disabled = true;
  createQrInput.value = "";
};

// Generate QR-code as svg element
const generateQr = () => {
  const dataForQr = createQrInput.value;
  if (!dataForQr.trim()) {
    clearAll();
    errorDiv.classList.remove("noDisplay");
    return;
  }
  qrcodeDiv.innerHTML = "";
  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
    data: dataForQr,
    imageOptions: {
      margin: 20,
    },
  });
  qrCodeVariable = qrCode;
};

// add Error message for validation
createQrInput.addEventListener("input", () => {
  errorDiv.classList.add("noDisplay");
  const value = createQrInput.value;
  if (value.length > 0) {
    clearBtn.classList.remove("noDisplay");
  } else {
    clearBtn.classList.add("noDisplay");
  }
});

// post generated QR-code to div
createQrButton.addEventListener("click", () => {
  generateQr();
  console.log(typeof qrCodeVariable);
  console.log(qrCodeVariable);
  qrCodeVariable.append(qrcodeDiv);
  downloadPngButton.disabled = false;
  downloadJpgButton.disabled = false;
  downloadSvgButton.disabled = false;
});

clearBtn.addEventListener("click", () => {
  createQrInput.value = "";
  createQrInput.focus();
  const value = createQrInput.value;
  if (value.length > 0) {
    clearBtn.classList.remove("noDisplay");
  } else {
    clearBtn.classList.add("noDisplay");
  }
});

downloadPngButton.addEventListener("click", () => {
  console.log(qrCodeVariable);
  qrCodeVariable.download({ name: "qr-" + getRandomUID(), extension: "png" });
});
downloadJpgButton.addEventListener("click", () => {
  console.log(qrCodeVariable);
  qrCodeVariable.download({ name: "qr-" + getRandomUID(), extension: "jpeg" });
});
downloadSvgButton.addEventListener("click", () => {
  console.log(qrCodeVariable);
  qrCodeVariable.download({ name: "qr-" + getRandomUID(), extension: "svg" });
});

clearAll();
