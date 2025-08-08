async function mergePDFs() {
  const files = document.getElementById('mergeInput').files;
  const mergedPdf = await PDFLib.PDFDocument.create();

  for (let file of files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFLib.PDFDocument.load(bytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  download(mergedBytes, "merged.pdf", "application/pdf");
}

function download(blobBytes, filename, mime) {
  const blob = new Blob([blobBytes], { type: mime });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
