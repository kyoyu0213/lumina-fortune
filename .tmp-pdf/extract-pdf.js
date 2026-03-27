const fs = require("fs");
const { PDFParse } = require("pdf-parse");

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    throw new Error("PDF path is required");
  }

  const buffer = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();
  process.stdout.write(result.text);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
