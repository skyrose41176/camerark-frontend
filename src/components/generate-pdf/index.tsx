import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Content, TDocumentDefinitions} from 'pdfmake/interfaces';
import {BoPhanVaiTro, TrangThaiPhu, TrangThaiXuLy} from 'src/constants';
import {NguoiXuLy, NhanSu, PhieuYeuCau} from 'src/models';
import {colors} from 'src/theme';
import {formatDatetimeHHmmDDMMYYYY} from 'src/utils/format';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
interface Props {
  phieuYeuCau: PhieuYeuCau;
  dataTdv?: NhanSu;
  nguoiXuLys?: NguoiXuLy[];
}
const generatePdf = ({phieuYeuCau, dataTdv, nguoiXuLys}: Props): Promise<Blob | void | string> => {
  const thaoTacTdv = phieuYeuCau?.lichSuThaoTacs?.find(item => item.vaiTro === BoPhanVaiTro.TDV);

  const thaoTacTrungGian = phieuYeuCau?.lichSuThaoTacs?.filter(
    item =>
      item.vaiTro === BoPhanVaiTro.TRUNG_GIAN &&
      (item.buoc === TrangThaiXuLy.CHAP_THUAN || item.buoc === TrangThaiXuLy.TU_CHOI)
  );
  const thaoTacCNTT = phieuYeuCau?.lichSuThaoTacs?.filter(
    item =>
      item.vaiTro === BoPhanVaiTro.CNTT &&
      (item.buoc === TrangThaiXuLy.CHAP_THUAN ||
        item.buoc === TrangThaiXuLy.TU_CHOI ||
        item.buoc === TrangThaiXuLy.CAP_TREN_DONG_Y ||
        item.buoc === TrangThaiXuLy.CAP_TREN_TU_CHOI)
  );
  const thaoTacNghiepVu = phieuYeuCau?.lichSuThaoTacs?.filter(
    item =>
      item.vaiTro === BoPhanVaiTro.NGHIEP_VU &&
      (item.buoc === TrangThaiXuLy.CHAP_THUAN ||
        item.buoc === TrangThaiXuLy.TU_CHOI ||
        item.buoc === TrangThaiXuLy.CAP_TREN_DONG_Y ||
        item.buoc === TrangThaiXuLy.CAP_TREN_TU_CHOI)
  );

  const renderTrungGian = () => {
    if (thaoTacTrungGian?.length <= 0) return '';
    const ttTg = thaoTacTrungGian?.map(item => {
      var ngXuLy = nguoiXuLys?.find(i => i.email === item?.createdBy);
      return {...item, ...ngXuLy};
    });
    const renderNgXuLy = ttTg?.map(item => {
      return [
        [
          {
            border: [false, false, false, true],
            text: item?.tenBoPhanXuLy,
            colSpan: 2,
            fillColor: '#dddddd',
          },
          {},
        ],
        [
          {
            border: [false, false, false, false],
            text: item?.tenNhanSu,
            fontSize: 10,
          },
          {
            alignment: 'center',
            fontSize: 10,
            border: [false, false, false, false],
            color: item?.buoc === TrangThaiXuLy.CHAP_THUAN ? colors.success : colors.error,
            text: item?.buoc === TrangThaiXuLy.CHAP_THUAN ? 'ĐỒNG Ý' : 'TỪ CHỐI',
          },
        ],
        [
          {
            border: [false, false, false, false],
            text: item?.noiDung,
            fontSize: 10,
            style: 'reason',
          },
          {
            alignment: 'center',
            fontSize: 10,
            border: [false, false, false, false],
            text: item?.created ? formatDatetimeHHmmDDMMYYYY(item?.created) : '',
          },
        ],
      ];
    });

    let doc = {
      table: {
        widths: ['*', 150],
        body: renderNgXuLy?.flatMap(item => item),
      },
    };
    return doc;
  };

  const renderCNTT = (): Content => {
    if (thaoTacCNTT?.length <= 0) return '';
    const ttCntt = thaoTacCNTT?.map(item => {
      var ngXuLy = nguoiXuLys?.find(i => i.email === item?.createdBy);
      return {...item, ...ngXuLy};
    });
    const ngXuLy = ttCntt.find(
      item => item.buoc === TrangThaiXuLy.CHAP_THUAN || item.buoc === TrangThaiXuLy.TU_CHOI
    );
    const capTren = ttCntt.find(
      item =>
        item.buoc === TrangThaiXuLy.CAP_TREN_DONG_Y || item.buoc === TrangThaiXuLy.CAP_TREN_TU_CHOI
    );
    const renderCapTren = capTren
      ? [
          [
            {
              border: [false, false, false, false],
              text: 'CẤP LÃNH ĐẠO',
              fontSize: 11,
              colSpan: 2,
            },
            {},
          ],
          [
            {
              border: [false, false, false, false],
              text: capTren?.tenNhanSu,
              fontSize: 10,
            },
            {
              alignment: 'center',
              fontSize: 10,
              border: [false, false, false, false],
              color:
                capTren?.buoc === TrangThaiXuLy.CAP_TREN_DONG_Y ? colors.success : colors.error,
              text: capTren?.buoc === TrangThaiXuLy.CAP_TREN_DONG_Y ? 'ĐỒNG Ý' : 'TỪ CHỐI',
            },
          ],
          [
            {
              border: [false, false, false, false],
              text: capTren?.noiDung,
              fontSize: 10,
              style: 'reason',
            },
            {
              alignment: 'center',
              fontSize: 10,
              border: [false, false, false, false],
              text: capTren?.created ? formatDatetimeHHmmDDMMYYYY(capTren?.created) : '',
            },
          ],
        ]
      : [];
    const renderNgXuLy = ngXuLy
      ? [
          [
            {
              border: [false, false, false, false],
              text: 'NHÂN SỰ XỬ LÝ',
              fontSize: 11,
              colSpan: 2,
            },
            {},
          ],
          [
            {
              border: [false, false, false, false],
              text: ngXuLy?.tenNhanSu,
              fontSize: 10,
            },
            {
              alignment: 'center',
              fontSize: 10,
              border: [false, false, false, false],
              color: ngXuLy?.buoc === TrangThaiXuLy.CHAP_THUAN ? colors.success : colors.error,
              text: ngXuLy?.buoc === TrangThaiXuLy.CHAP_THUAN ? 'ĐỒNG Ý' : 'TỪ CHỐI',
            },
          ],
          [
            {
              border: [false, false, false, false],
              text: ngXuLy?.noiDung,
              fontSize: 10,
              style: 'reason',
            },
            {
              alignment: 'center',
              fontSize: 10,
              border: [false, false, false, false],
              text: ngXuLy?.created ? formatDatetimeHHmmDDMMYYYY(ngXuLy?.created) : '',
            },
          ],
        ]
      : [];
    let doc = {
      table: {
        widths: ['*', 150],
        body: [
          [
            {
              border: [false, false, false, true],
              text: ttCntt?.[0]?.tenBoPhanXuLy,
              colSpan: 2,
              fillColor: '#dddddd',
            },
            {},
          ],
          ...renderNgXuLy,
          ...renderCapTren,
        ],
      },
    };
    return doc;
  };

  const renderNghiepVu = () => {
    if (thaoTacNghiepVu?.length <= 0) return '';

    const ttNv = thaoTacNghiepVu?.map(item => {
      var ngXuLy = nguoiXuLys?.find(i => i.email === item?.createdBy);
      return {...item, ...ngXuLy};
    });
    const group: {data: any[]; tenBoPhanXuLy?: string; boPhanXuLyId?: number}[] = [];
    for (let i = 0; i < ttNv.length; i++) {
      const index: number = group.findIndex(item => item.boPhanXuLyId === ttNv[i].boPhanXuLyId);
      if (index !== -1) {
        group[index] = {
          ...group[index],
          data: [...group[index].data, ttNv[i]],
        };
      } else {
        group.push({
          tenBoPhanXuLy: ttNv[i].tenBoPhanXuLy,
          boPhanXuLyId: ttNv[i].boPhanXuLyId,
          data: [ttNv[i]],
        });
      }
    }

    const renderBoPhanXuLy = group?.map(item => {
      const ngXuLy = item?.data?.find(
        i => i.buoc === TrangThaiXuLy.CHAP_THUAN || i.buoc === TrangThaiXuLy.TU_CHOI
      );
      const capTren = item?.data?.find(
        i => i.buoc === TrangThaiXuLy.CAP_TREN_DONG_Y || i.buoc === TrangThaiXuLy.CAP_TREN_TU_CHOI
      );
      const renderNgXuLy = ngXuLy
        ? [
            [
              {
                border: [false, false, false, false],
                text: 'NHÂN SỰ XỬ LÝ',
                fontSize: 11,
                colSpan: 2,
              },
              {},
            ],
            [
              {
                border: [false, false, false, false],
                text: ngXuLy?.tenNhanSu,
                fontSize: 10,
              },
              {
                alignment: 'center',
                fontSize: 10,
                border: [false, false, false, false],
                color: ngXuLy?.buoc === TrangThaiXuLy.CHAP_THUAN ? colors.success : colors.error,
                text: ngXuLy?.buoc === TrangThaiXuLy.CHAP_THUAN ? 'ĐỒNG Ý' : 'TỪ CHỐI',
              },
            ],
            [
              {
                border: [false, false, false, false],
                text: ngXuLy?.noiDung,
                fontSize: 10,
                style: 'reason',
              },
              {
                alignment: 'center',
                fontSize: 10,
                border: [false, false, false, false],
                text: ngXuLy?.created ? formatDatetimeHHmmDDMMYYYY(ngXuLy?.created) : '',
              },
            ],
          ]
        : [];
      const renderCapTren = capTren
        ? [
            [
              {
                border: [false, false, false, false],
                text: 'CẤP LÃNH ĐẠO',
                fontSize: 11,
                colSpan: 2,
              },
              {},
            ],
            [
              {
                border: [false, false, false, false],
                text: capTren?.tenNhanSu,
                fontSize: 10,
              },
              {
                alignment: 'center',
                fontSize: 10,
                border: [false, false, false, false],
                color:
                  capTren?.buoc === TrangThaiXuLy.CAP_TREN_DONG_Y ? colors.success : colors.error,
                text: capTren?.buoc === TrangThaiXuLy.CAP_TREN_DONG_Y ? 'ĐỒNG Ý' : 'TỪ CHỐI',
              },
            ],
            [
              {
                border: [false, false, false, false],
                text: capTren?.noiDung,
                fontSize: 10,
                style: 'reason',
              },
              {
                alignment: 'center',
                fontSize: 10,
                border: [false, false, false, false],
                text: capTren?.created ? formatDatetimeHHmmDDMMYYYY(capTren?.created) : '',
              },
            ],
          ]
        : [];
      return [
        [
          {
            border: [false, false, false, true],
            text: item?.tenBoPhanXuLy,
            colSpan: 2,
            fillColor: '#dddddd',
          },
          {},
        ],
        ...renderNgXuLy,
        ...renderCapTren,
      ];
    });
    let doc = {
      table: {
        widths: ['*', 150],
        body: renderBoPhanXuLy?.flatMap(item => item),
      },
    };
    return doc;
  };

  let docDefinition: TDocumentDefinitions;
  docDefinition = {
    pageSize: 'A4',
    header: {
      columns: [
        {
          margin: [20, 10, 2, 10],
          text: moment().format('HH:mm DD/MM/YYYY'),
          fontSize: 10,
        },
        {
          margin: 10,
          text: '',
          fontSize: 10,
          alignment: 'center',
        },
      ],
    },
    content: [
      {
        columns: [
          [
            {
              text: 'NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN VIỆT NAM THƯƠNG TÍN',
              bold: true,
              fontSize: 10,
              headlineLevel: 1,
            },
            {
              text: [
                'Mã phiếu yêu cầu số ',
                {text: `#${phieuYeuCau.id} `, bold: true},
                'đã được tạo bởi ',
                {
                  text: `#${phieuYeuCau.tenNhanSu}`,
                  bold: true,
                },
              ],
              color: '#555',
              margin: [0, 5, 0, 0],
            },
            {
              text: [
                'Tình trạng: ',
                {
                  text: phieuYeuCau?.trangThaiPhu === TrangThaiPhu.OPEN ? 'OPEN' : 'CLOSED',
                  bold: true,
                  color:
                    phieuYeuCau?.trangThaiPhu === TrangThaiPhu.OPEN ? colors.success : colors.error,
                },
              ],
              color: '#555',
              margin: [0, 5, 0, 10],
            },
          ],
          // {
          //   qr: `Mã đề xuất: ${maDeXuat}`,
          //   fit: "60",
          //   alignment: "right",
          //   width: "100",
          // },
        ],
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 10,
            x2: 595 - 2 * 40,
            y2: 10,
            lineWidth: 0.5,
            lineColor: '#BDBDBD',
          },
        ],
      },
      {
        text: `PHIẾU YÊU CẦU XỬ LÝ SỰ CỐ`,
        margin: [0, 15, 0, 0],
        bold: true,
        fontSize: 13,
        headlineLevel: 1,
        alignment: 'center',
      },
      {
        text: `Kính gửi: Khối Công Nghệ Thông Tin`,
        margin: [0, 20, 0, 20],
        bold: true,
        fontSize: 12,
        headlineLevel: 1,
        alignment: 'center',
      },
      {
        text: 'THÔNG TIN PHIẾU YÊU CẦU',
        margin: [0, 10, 0, 0],
        style: 'title1',
      },
      {
        text: `Đơn vị yêu cầu: ${phieuYeuCau.tenDonVi}`,
        margin: [0, 6, 0, 0],
        fontSize: 10,
      },
      {
        text: `Người yêu cầu: ${phieuYeuCau.tenNhanSu}`,
        margin: [0, 6, 0, 0],
        fontSize: 10,
      },
      {
        text: `Số điện thoại: ${phieuYeuCau.sdt}`,
        margin: [0, 6, 0, 0],
        fontSize: 10,
      },
      {
        text: `Email: ${phieuYeuCau.createdBy}`,
        margin: [0, 6, 0, 0],
        fontSize: 10,
      },
      {
        text: `Thời gian tạo: ${
          phieuYeuCau.created ? formatDatetimeHHmmDDMMYYYY(phieuYeuCau.created) : ''
        }`,
        margin: [0, 6, 30, 0],
        fontSize: 10,
      },
      {
        text: `Loại nghiệp vụ: ${phieuYeuCau.tenLoaiNghiepVu}`,
        margin: [0, 6, 30, 0],
        fontSize: 10,
      },
      {
        text: `Loại yêu cầu: ${phieuYeuCau.tenLoaiYeuCau}`,
        margin: [0, 6, 30, 0],
        fontSize: 10,
      },
      {
        text: `Mức độ ưu tiên: ${phieuYeuCau.uuTien}`,
        margin: [0, 6, 30, 0],
        fontSize: 10,
      },
      {
        text: `Mô tả chi tiết: ${phieuYeuCau.moTa}`,
        margin: [0, 6, 30, 0],
        fontSize: 10,
      },
      thaoTacTdv
        ? {
            text: 'TRƯỞNG ĐƠN VỊ',
            margin: [0, 20, 0, 0],
            style: 'title1',
          }
        : '',
      thaoTacTdv
        ? {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 10,
                x2: 595 - 2 * 40,
                y2: 10,
                lineWidth: 0.5,
                lineColor: '#BDBDBD',
              },
            ],
          }
        : '',
      thaoTacTdv
        ? {
            table: {
              widths: ['*', 150],
              body: [
                [
                  {
                    border: [false, false, false, false],
                    text: dataTdv?.ten,
                    fontSize: 10,
                  },
                  {
                    alignment: 'center',
                    fontSize: 10,
                    border: [false, false, false, false],
                    color:
                      thaoTacTdv?.buoc === TrangThaiXuLy.CHAP_THUAN ? colors.success : colors.error,
                    text: thaoTacTdv?.buoc === TrangThaiXuLy.CHAP_THUAN ? 'ĐỒNG Ý' : 'TỪ CHỐI',
                  },
                ],
                [
                  {
                    border: [false, false, false, false],
                    text: thaoTacTdv?.noiDung,
                    fontSize: 10,
                    style: 'reason',
                  },
                  {
                    alignment: 'center',
                    fontSize: 10,
                    border: [false, false, false, false],
                    text: thaoTacTdv?.created
                      ? formatDatetimeHHmmDDMMYYYY(thaoTacTdv?.created)
                      : '',
                  },
                ],
              ],
            },
          }
        : '',
      thaoTacTrungGian?.length > 0
        ? {
            text: 'Ý KIẾN PHÒNG NGHIỆP VỤ',
            margin: [0, 20, 0, 0],
            style: 'title1',
          }
        : '',
      thaoTacTrungGian?.length > 0
        ? {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 10,
                x2: 595 - 2 * 40,
                y2: 10,
                lineWidth: 0.5,
                lineColor: '#BDBDBD',
              },
            ],
          }
        : '',
      renderTrungGian(),
      thaoTacCNTT?.length > 0 || thaoTacNghiepVu?.length > 0
        ? {
            text: 'PHẦN XỬ LÝ CỦA CNTT',
            margin: [0, 20, 0, 0],
            style: 'title1',
          }
        : '',
      thaoTacCNTT?.length > 0 || thaoTacNghiepVu?.length > 0
        ? {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 10,
                x2: 595 - 2 * 40,
                y2: 10,
                lineWidth: 0.5,
                lineColor: '#BDBDBD',
              },
            ],
          }
        : '',
      renderCNTT(),
      renderNghiepVu(),
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      title1: {
        fontSize: 12,
        bold: true,
      },
      reason: {
        fontSize: 10,
        italics: true,
        color: '#555',
      },
      bigger: {
        fontSize: 15,
        italics: true,
      },
    },
  };
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  return new Promise((resolve, reject) => {
    pdfDocGenerator.getBase64(base64 => {
      resolve(`data:application/pdf;base64,${base64}`);
    });
  });
};
export default generatePdf;
