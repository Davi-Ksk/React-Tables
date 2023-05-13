import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUNMS } from "./columns";
import  "./tables.css";

export const SortingTable = () => {
  
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []); //Assure that the data is not changed by the useMemo hook. If it wasn't, the data will be re-rendered every time.

  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, //array of header groups. Every colomn header belongs to a group. See line 33
    footerGroups,
    rows, 
    prepareRow,

  } = useTable({

    columns,
    data //ES6 shorthand syntax for "columns: columns, data: data"
  
  },
  useSortBy)

  return (
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {
              headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                  </span>
                </th> //For each column in the header group, render the header property. It corresponds to the columns array in the json
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
                  row.cells.map(cell => { //Acess the cells on each row
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>  //With each cell, its called the render function passing in the string 'Cell'
                    //For each column, render the cell property naming the reader for that column
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
      <tfoot>
        {
          footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {
                footerGroup.headers.map(column => (
                  <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                ))
              }
            </tr>
          ))
        }
      </tfoot>
    </table>
  )
}