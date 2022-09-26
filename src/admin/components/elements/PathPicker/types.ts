import { SanitizedCollectionConfig } from "payload/types"

export type Props = {
  limit?: number,
  totalPages?: number,
  page?: number,
  node?: string,
  hasPrevPage?: boolean,
  hasNextPage?: boolean,
  collection: SanitizedCollectionConfig,
  prevPage?: number,
  nextPage?: number,
  numberOfNeighbors?: number,
  disableHistoryChange?: boolean,
  onChange?: (node: string) => void,
}

export type Node = {
  type: 'Page' | 'Separator' | 'ClickableArrow'
  props?: {
    page?: number
    updatePage: (page?: number) => void
    isFirstPage?: boolean
    isLastPage?: boolean
    isDisabled?: boolean
    direction?: 'right' | 'left'
  }
} | number
