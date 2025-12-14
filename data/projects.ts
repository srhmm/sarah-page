import { Project } from '@/types/main'

export const programmingProjects: Project[] = [
  {
    title: 'prettypgfplots',
    subtitle: 'support for creating scientific plots in LaTeX with pgfplots',
    authors: ['Sarah Mameche'],
    year: 2025,
    language: 'LaTeX',
    bibtex: '',
    urls: {
        documentation: '/projects/2025-latex-prettypgfplots.pdf',
        sty: '/projects/2025-latex-prettypgfplots.sty',
        code: 'https://github.com/srhmm/prettypgfplots',
    },
    //demoId: 'prettypgfplots-line',
  },
  {
    title: 'causalchange',
    subtitle: 'causal discovery algorithms under different forms of distribution shift',
    authors: ['Sarah Mameche'],
    year: 2025,
    language: 'Python',
    bibtex: '',
    urls: {
        documentation: 'https://github.com/srhmm/causalchange', // later '/projects/2025-python-causalchange.pdf',
        zip:  'https://github.com/srhmm/causalchange', // later '/projects/2025-python-causalchange.zip',
        code: 'https://github.com/srhmm/causalchange',
    },
    //demoId: 'causal-change',
  },
]
