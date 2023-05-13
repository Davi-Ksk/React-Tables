import React, { useMemo } from "react";
import { useTable, useGlobalFilter,  useFilters } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUNMS } from "./columns";
import  "./tables.css";
import { GlobalFilter } from "./GlobalFilter";

export const FilteringTable  = () => {
  
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []); //Assure that the data is not changed by the useMemo hook. If it wasn't, the data will be re-rendered every time.

  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, //array of header groups. Every colomn header belongs to a group. See line 33
    footerGroups,
    rows, 
    prepareRow,
    state,
    setGlobalFilter,

  } = useTable({

    columns,
    data //ES6 shorthand syntax for "columns: columns, data: data"
  
  },
  useFilters, //This hook is used to filter the table. It is used to filter the table by column. 
  useGlobalFilter) //This hook is used to filter the table. It is used to filter the table by global filter. 

  const { globalFilter } = state

  return (
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {
              headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
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
    </>
  )
}