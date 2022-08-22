import * as moment from 'moment';
import * as path from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import { excelInserter } from './excel_inserter';

export async function generateExcel(data, type) {
  try {
    const filename = `${moment().format('YYYYMMDDHHMM')}-${type}.xlsx`;
    const filepath = path.join(__dirname + '/../../uploads/export', filename);
    console.log(data, 'ini datanya');
    await DataToExcel(filepath, data, type);
    return filename;
  } catch (e) {
    console.log(e, 'generateExcel');
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

// const hitLogApiData = [
//   {
//     title: 'Time',
//     dataIndex: 'time',
//     width: 20,
//   },
//   {
//     title: 'Success',
//     dataIndex: 'success',
//     width: 20,
//   },
//   {
//     title: 'Failed',
//     dataIndex: 'failed',
//     width: 20,
//   },
//   {
//     title: 'Total',
//     dataIndex: 'total',
//     width: 20,
//   },
// ];
const laporanTransaksi = [
  {
    title: 'No',
    dataIndex: 'No',
    width: 5,
  },
  {
    title: 'Tanggal',
    dataIndex: 'Tanggal',
    width: 15,
  },
  {
    title: 'No Order',
    dataIndex: 'NoOrder',
    width: 15,
  },
  {
    title: 'Nama',
    dataIndex: 'Nama',
    width:25,
  },
  {
    title: 'Total Order',
    dataIndex: 'TotalOrder',
    width: 15,
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    width: 15,
  },
 
];

async function setDataHitLogApi(dataHitLogApi) {
  try {
    const dataFiltered = [];

    await dataHitLogApi.forEach((element, i) => {
      console.log(element[0], 'ini element');
      const filterElement = [];
      filterElement['No'] = element.No;
      filterElement['Tanggal']= element.Tanggal
      filterElement['NoOrder']= element.NoOrder
      filterElement['Nama'] = element.Nama
      filterElement['TotalOrder'] = element.totalOrder
      filterElement['Status'] = element.status
      console.log(filterElement, 'ini filter');
      dataFiltered.push(filterElement);
    });

    return dataFiltered;
  } catch (e) {
    console.log(e, 'setDataHitLogAPI');
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function DataToExcel(filepath, data, type) {
  try {
    if (type === 'Hit-Log-Api') {
      const dataFiltered = await setDataHitLogApi(data);

      await excelInserter({
        filename: filepath,
        sheets: [
          {
            name: 'Laporan Transaksi',
            startRowFrom: 1,
            headers: laporanTransaksi,
            data: dataFiltered,
          },
        ],
      });
    } else if (type === 'XXX 1') {
      //kode yang sama tapi beda set header dan data nya
    } else if (type === 'Customer-Register') {
      //kode yang sama tapi beda set header dan data nya
    } else if (type === 'Summary-Services') {
      //kode yang sama tapi beda set header dan data nya
    } else if (type === 'Top-Rate') {
      //kode yang sama tapi beda set header dan data nya
    }
  } catch (e) {
    console.log(e, 'dataToExcel');
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
