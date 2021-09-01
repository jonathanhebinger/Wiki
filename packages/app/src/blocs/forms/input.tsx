import React, { useEffect } from 'react'
import { useState } from 'react'

export function Input({
  type = 'text',
  value,
  onChange,
}: {
  type?: 'text' | 'number'
  value: string | number
  onChange: (value: string) => void
}) {
  return (
    <input
      type={type}
      className="outline-none px-1 text-gray-600 border-b-2 border-gray-300"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}
