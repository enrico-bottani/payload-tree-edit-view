import { SanitizedCollectionConfig } from 'payload/dist/collections/config/types';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Column } from 'payload/dist/admin/components/elements/Table/types';
//import {  } from '/payload/dist/admin/components/elements/TreeView/types';
export type Props = {
  collection: SanitizedCollectionConfig
  data: PaginatedDocs<any>
  newDocumentURL: string
  setListControls: (controls: unknown) => void
  setSort: (sort: string) => void
  tableColumns: Column[]
  columnNames: string[]
  setColumns: (columns: string[]) => void
  hasCreatePermission: boolean
  setLimit: (limit: number) => void
  limit: number
}

export type ListIndexProps = {
  collection: SanitizedCollectionConfig
}

export type ListPreferences = {
  columns: string[]
  limit: number
  sort: number
}

export type TreeViewURLParams = {
  node: string
  page: number;
}