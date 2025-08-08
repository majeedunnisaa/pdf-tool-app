async function convertToPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  const files = document.getElementById('imageInput').files;

  for (let i = 0; i < files.length; i++) {
    const imgData = await toBase64(files[i]);
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 10, 10, 180, 250);
  }

  pdf.save('converted.pdf');
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}