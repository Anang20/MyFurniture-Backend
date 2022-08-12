import * as xl from 'excel4node';
import { parseISO } from 'date-fns';
import path from 'path';
import * as moment from 'moment';
import { DataToExcel } from './export_excel';

// const data = require('../../yo.json');

const COLOR = {
  HEADER: '#4B88CB',
  BACKGROUND_ODD: '#D5E6F5',
  BACKGROUND_EVEN: '#FFFFFF',
};

interface ExcelInserterParams {
  filename: string;
  sheets: {
    data: any[];
    headers: {
      title: string;
      dataIndex: string;
      width: number;
      defaultValue?: string | number;
    }[];
    name: string;
    startRowFrom?: number;
  }[];
}

export function excelInserter({ filename, sheets }: ExcelInserterParams) {
  const wb = new xl.Workbook({
    dateFormat: 'dddd, mmmm d, yyyy',
  });

  const styleHeader = wb.createStyle({
    font: {
      bold: true,
      color: '#ffffff',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: COLOR.HEADER,
      fgColor: COLOR.HEADER,
    },
  });

  const styleOdd = wb.createStyle({
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: COLOR.BACKGROUND_ODD,
      fgColor: COLOR.BACKGROUND_ODD,
    },
  });

  const styleEven = wb.createStyle({
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: COLOR.BACKGROUND_EVEN,
      fgColor: COLOR.BACKGROUND_EVEN,
    },
  });

  // #4B88CB
  sheets.map((sheet) => {
    const ws = wb.addWorksheet(sheet.name);

    let currentRow = sheet.startRowFrom ?? 1;

    ws.row(currentRow).filter();

    sheet.headers.map((header, index) => {
      ws.cell(currentRow, index + 1)
        .string(header.title)
        .style(styleHeader);

      if (header.width) {
        ws.column(index + 1).setWidth(header.width);
      }
    });
    currentRow++;

    sheet.data.map((it, idx) => {
      const style = idx % 2 ? styleOdd : styleEven;

      sheet.headers.map((header, index) => {
        const cellContent = it[header.dataIndex];

        ws.cell(currentRow, index + 1).style(style);

        if (typeof cellContent === 'string') {
          if (/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/.test(cellContent)) {
            const [year, month, day] = cellContent.split('/');
            const date = parseISO(`${year}-${month}-${day}T00:00:00Z`);
        
            ws.cell(currentRow, index + 1).date(date);
          } else {
            ws.cell(currentRow, index + 1).string(cellContent);
          }
        }

        if (typeof cellContent === 'number') {
          ws.cell(currentRow, index + 1).number(cellContent);
        }

        if (
          (typeof cellContent === 'undefined' || cellContent?.length === 0) &&
          typeof header.defaultValue !== 'undefined'
        ) {
          if (typeof header.defaultValue === 'number') {
            ws.cell(currentRow, index + 1).number(header.defaultValue);
          } else {
            ws.cell(currentRow, index + 1).string(header.defaultValue);
          }
        }
      });

      currentRow++;
    });
  });

  return new Promise((resolve, reject) => {
    wb.write(filename, (err, stats) => {
      if (err) {
        return reject(err);
      }

      return resolve(stats);
    });
  });
}
