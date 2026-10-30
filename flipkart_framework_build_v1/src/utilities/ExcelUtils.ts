import ExcelJS from "exceljs";
import path from "path";

/** Read-only Excel lookup service. Returns a row as Map<header, value>. */
export class ExcelUtils {
  constructor(
    private readonly filePath = path.resolve("testdata/TestData.xlsx"),
    private readonly sheetName = "Search",
  ) {}

  /** Find a TCID and return fields such as SearchText and Expected using Map.get(). */
  async getSearchTestCase(tcid: string): Promise<Map<string, string>> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(this.filePath);

    const sheet = workbook.getWorksheet(this.sheetName);
    if (!sheet) {
      throw new Error(`Worksheet ${this.sheetName} not found.`);
    }

    const headers = sheet.getRow(1).values as (string | number | undefined)[];

    for (let rowNumber = 2; rowNumber <= sheet.rowCount; rowNumber += 1) {
      const values = sheet.getRow(rowNumber).values as (
        | string
        | number
        | undefined
      )[];
      const row = new Map<string, string>();

      for (let column = 1; column < headers.length; column += 1) {
        const header = headers[column];
        if (header != null && String(header).trim()) {
          row.set(
            String(header).trim(),
            values[column] == null ? "" : String(values[column]).trim(),
          );
        }
      }

      if (row.get("TCID") === tcid) {
        return row;
      }
    }

    throw new Error(`TCID ${tcid} not found.`);
  }
}
