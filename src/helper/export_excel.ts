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
    width: 40,
  },
  {
    title: 'Nama',
    dataIndex: 'Nama',
    width: 40,
  },
  {
    title: 'Produk',
    dataIndex: 'Produk',
    width: 20,
  },
  {
    title: 'Kuantiti',
    dataIndex: 'Kuantiti',
    width: 10,
  },
  {
    title: 'Harga_barang',
    dataIndex: 'Harga_barang',
    width: 20,
  },
  {
    title: 'Harga_kirim',
    dataIndex: 'Harga_kirim',
    width: 20,
  },
  {
    title: 'Harga_total',
    dataIndex: 'Harga_total',
    width: 20,
  },
];

async function setDataHitLogApi(dataHitLogApi) {
  try {
    const dataFiltered = [];

    await dataHitLogApi.forEach((element, i) => {
      console.log(element[0], 'ini element');
      let sum = 1;
      sum += i;
      const filterElement = [];
      filterElement['No'] = sum;
      filterElement['Tanggal'] = element[0];
      filterElement['Nama'] = element[1];
      filterElement['Produk'] = element[2];
      filterElement['Kuantiti'] = element[3];
      filterElement['Harga_barang'] = element[4];
      filterElement['Harga_kirim'] = element[5];
      filterElement['Harga_total'] = element[6];
      console.log(filterElement, 'ini filter');
      console.log(sum);
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
