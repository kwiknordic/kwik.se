'use client'

import { Input } from '@/src/components/ui/input'

export default function SearchBox({
  value,
  onChange,
  placeholder,
  ariaLabel = 'Sök',
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  ariaLabel?: string
}) {
  return (
    <div className="search-box">
      <i className="pi pi-search search-ic" aria-hidden="true" />
      <Input
        className="search-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
    </div>
  )
}
