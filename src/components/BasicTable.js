import React, { useMemo } from "react";
import { useTable } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import  "./tables.css";

export const BasicTable = () => {
  
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []); //Assure that the data is not changed by the useMemo hook. If it wasn't, the data will be re-rendered every time.

  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, //array of header groups. Every colomn header belongs to a group. See line 33
    rows, 
    prepareRow,

  } = useTable({

    columns,
    data //ES6 shorthand syntax for "columns: columns, data: data"
  
  })

  return (
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {
              headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th> //For each column in the header group, render the header property. It corresponds to the columns array in the json
              ))
            }
          </tr>
          ))
        }

      </thead>
      <tbody {...getTableBodyProps()}>
        {
          rows.map(row => { 
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map(cell => { //On each row we acess the cells
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>  //With each cell, its called the render function passing in the string 'Cell'
                    //For each column, render the cell property naming the reader for that column
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}