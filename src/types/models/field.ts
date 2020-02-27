import { INote } from 'src/types'

export type Key = keyof INote

export interface IField {
  required: boolean
  editable: boolean
  editing: boolean
  value: { old: any; new: any },
}

export type IFields = {
  [ K in Key ]: IField
}
