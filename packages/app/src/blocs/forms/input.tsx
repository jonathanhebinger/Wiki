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
      className="outline-none bg-gray-100 rounded px-2 text-gray-700"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}

export function Checkbox({
  checked,
  onChange,
  className = '',
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}) {
  return (
    <input
      type="checkbox"
      className={'w-5 h-5 ' + className}
      checked={checked}
      onChange={e => {
        onChange(e.target.checked)
        e.stopPropagation()
      }}
      onClick={e => {
        e.stopPropagation()
      }}
    />
  )
}
