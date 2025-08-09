import { Publication } from '@/types/main'

export const conferencePublications: Publication[] = [
  {
    title: 'Information-Theoretic Causal Discovery in Topological Order',
    authors: ['Sascha Xu', 'Sarah Mameche', 'Jilles Vreeken'],
    year: 2025,
    venue: 'AISTATS',
    bibtex: `@inproceedings{xu2025information,
  title={Information-Theoretic Causal Discovery in Topological Order},
  author={Xu, Sascha and Mameche, Sarah and Vreeken, Jilles},
  booktitle={International Conference on Artificial Intelligence and Statistics (AISTATS)},
  year={2025}
}`,
    abstract:
      'Identifying causal relationships is a cornerstone task in science, but most data-driven methods offer ambiguous results or require restrictive assumptions. Recent work on the basis of information theory shows promising results across many domains, but leaves open how to provably identify causal graphs. Here, we develop a general information-theoretic framework called Topic for causal discovery in topological order. Topic is based on the universal measure of Kolmogorov complexity and is fully identifiable. We show that Topic’s guarantees extend to both the i.i.d. and non-i.i.d. continuous settings. Our evaluations on continuous, time series, and interventional data show that Topic, using domain-specific approximations of Kolmogorov complexity, learns faithful topological orderings and frequently outperforms specialized methods.',
    urls: {
      paper: '/papers/2025-aistats-information-theoretic.pdf',
      code: 'https://github.com/srhmm/topic',
    },
  },
  {
    title: 'SpaceTime: Causal Discovery from Non-Stationary Time Series',
    authors: [
      'Sarah Mameche',
      'Lénaïg Cornanguer',
      'Ninad Urmi',
      'Jilles Vreeken',
    ],
    year: 2025,
    venue: 'AAAI',
    bibtex: `@inproceedings{mameche2025spacetime,
  title={SPACETIME: Causal Discovery from Non-Stationary Time Series},
  author={Mameche, Sarah and Cornanguer, L{\\'e}na{\\"\\i}g and Ninad, Urmi and Vreeken, Jilles},
  booktitle={Proceedings of the AAAI Conference on Artificial Intelligence (AAAI)},
  year={2025}
}`,
    urls: {
      paper: '/papers/2025-aaai-spacetime.pdf',
    },
  },
]
