import ExcelJS from 'exceljs';

const workbook = new ExcelJS.Workbook();

const worksheet = workbook.addWorksheet('My Sheet');

// worksheet.getCell('A1').value = {
//     text: 'baidu',
//     hyperlink: 'http://www.baidu.com',
//   };

  
//   worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
//   worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) })

  const rows = [
//   [5,'Bob',new Date()], // row by array
  {id:6, name: 'Barbara', dob: new Date()},
  {id:6, name: 'Barbara', dob: new Date()},
  {id:{
        text: 'baidu',
        hyperlink: 'http://www.baidu.com',
      }, name: 'Barbara', dob: new Date()}
];



worksheet.columns = get_cols(rows[0])
function get_cols(o) {
    let cols = Object.keys(o).map(k => {
        return {
            "header": k,
            "key": k,
        }
    })
    return cols
}



// add new rows and return them as array of row objects
const newRows = worksheet.addRows(rows);

let filename = "test.xlsx"
await workbook.xlsx.writeFile(filename);