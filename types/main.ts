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
    demo?: string
  }
}
