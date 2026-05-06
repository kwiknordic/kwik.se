import React, { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import movies from '../data/movies.js'
import Header from './universal/Header'
import Title from './universal/Title'
import '../css/movies.css'

function Movies() {
  const [sorting, setSorting] = useState([{ id: 'rating', desc: true }])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Titel',
      },
      {
        accessorKey: 'rating',
        header: 'Mitt betyg',
        cell: (info) => {
          const rating = info.getValue()
          const stars = []
          for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
              stars.push(<i key={i} className="fa-solid fa-star rating-star" />)
            } else if (rating >= i - 0.5) {
              stars.push(<i key={i} className="fa-solid fa-star-half-stroke rating-star" />)
            } else {
              stars.push(<i key={i} className="fa-regular fa-star rating-star" />)
            }
          }
          return <span className="rating-stars">{stars}</span>
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data: movies,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <header id="header">
        <Header />
      </header>
      <div className="movies-page">
        <div className="title-section sub-main">
          <Title
            title="Filmer"
            tag="h1"
            subTitle={<span>Betygsatt totalt {movies.length} filmer</span>}
            priority="header"
          />
        </div>
        <div className="align-container-center info-box movies-table-wrapper">
          <table className="movies-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className={header.id === 'rating' ? 'col-rating' : ''}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={cell.column.id === 'rating' ? 'col-rating' : ''}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="movies-pagination">
          <div className="movies-pagination-buttons">
            <button
              className="movies-pagination-btn"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              ← Föregående
            </button>
            <button
              className="movies-pagination-btn"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              Nästa →
            </button>
          </div>

          <div className="movies-pagination-info">
            <span>Sida</span>
            <strong className="page-current">{table.getState().pagination.pageIndex + 1}</strong>
            <strong className="page-total">av {table.getPageCount()}</strong>
          </div>
        </div>
      </div>
    </>
  )
}

export default Movies
