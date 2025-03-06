import fs from "fs-extra";
import convertExcelToJson from "convert-excel-to-json";

export const processExcel = async (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      return res.status(400).json({ error: "No File Uploaded" });
    }

    const filePath = `uploads/${req.file.filename}`;

    const excelData = convertExcelToJson({
      sourceFile: filePath,
      header: { rows: 1 },
      columnToKey: { "*": "{{columnHeader}}"}, 
    });

    // Delete the uploaded file after processing
    await fs.remove(filePath);

    res.status(200).json(excelData);
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
