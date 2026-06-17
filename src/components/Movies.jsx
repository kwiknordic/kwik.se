import React, { useMemo, useState, useEffect, useRef } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table'
import movies from '../data/movies.json'
import Header from './universal/Header'
import Title from './universal/Title'
import '../css/movies.css'

const PAGE_SIZE = 20

function Movies() {
  const [sorting, setSorting] = useState([{ id: 'rating', desc: true }])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [isLoading, setIsLoading] = useState(false)
  const sentinelRef = useRef(null)

  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Titel',
      },
      {
        accessorKey: 'rating',
        header: '',
        sortingFn: (a, b) => {
          const diff = a.original.rating - b.original.rating
          if (diff !== 0) return diff
          return a.original.title.localeCompare(b.original.title)
        },
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
    [],
  )

  const table = useReactTable({
    data: movies,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const allRows = table.getRowModel().rows
  const visibleRows = allRows.slice(0, visibleCount)
  const hasMore = visibleCount < allRows.length

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true)
          setTimeout(() => {
            setVisibleCount((c) => c + PAGE_SIZE)
            setIsLoading(false)
          }, 900)
        }
      },
      { rootMargin: '100px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, isLoading])

  return (
    <>
      <header id="header">
        <Header />
      </header>
      <div className="movies-page">
        <div className="title-section sub-main">
          <Title
            title="Filmtips"
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
              {visibleRows.map((row) => (
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
          <div ref={sentinelRef} className="movies-scroll-sentinel" />
          {isLoading && (
            <div className="movies-loading">
              <span className="movies-loading-dot" />
              <span className="movies-loading-dot" />
              <span className="movies-loading-dot" />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Movies
