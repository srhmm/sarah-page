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
      'Urmi Ninad*',
      'Jilles Vreeken*',
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
        code: 'https://github.com/srhmm/spacetime',
    },
  },
  {
    title: 'Identifying Confounding from Causal Mechanism Shifts',
    authors: [
        'Sarah Mameche',
        'Jilles Vreeken',
        'David Kaltenpoth',
    ],
    year: 2024,
    venue: 'AISTATS',
    bibtex: `@inproceedings{mameche2024identifying,
title={Identifying confounding from causal mechanism shifts},
author={Mameche, Sarah and Vreeken, Jilles and Kaltenpoth, David},
booktitle={International Conference on Artificial Intelligence and Statistics (AISTATS)},
year={2024}
}`,
    urls: {
        paper: '/papers/2024-aistats-identifying.pdf',
        code: 'https://github.com/srhmm/coco',
    },
  },
  {
    title: 'Learning Causal Models under Independent Changes',
    authors: [
        'Sarah Mameche',
        'David Kaltenpoth',
        'Jilles Vreeken',
    ],
    year: 2023,
    venue: 'NeurIPS',
    bibtex: `@inproceedings{mameche2023learning,
title={Learning causal models under independent changes},
author={Mameche, Sarah and Kaltenpoth, David and Vreeken, Jilles},
journal={Advances in Neural Information Processing Systems (NeurIPS)},
year={2023}
}`,
    urls: {
        paper: '/papers/2023-neurips-learning.pdf',
        code: 'https://github.com/srhmm/linc',
    },
  },
]
