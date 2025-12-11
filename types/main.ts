import type { DemoKey } from '@/components/demo/types'

export type Publication = {
  title: string
  authors: string[]
  year: number
  venue: string
  bibtex: string
  abstract?: string
  urls: {
    paper?: string
    poster?: string
    code?: string
  }
  demoId?: DemoKey // @A: check
}
