export type DemoKey = 'causal-mixture-models' | 'topic-ordering' | 'prettypgfplots-line' | 'causal-change' //| 'space-time'

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
  demoId?: DemoKey
}

export type Project = {
    title: string
    subtitle: string
    authors: string[]
    year: number
    language: string
    bibtex: string
    abstract?: string
    urls: {
        documentation?: string
        zip?: string
        sty?: string
        code?: string
    }
    demoId?: DemoKey
}
