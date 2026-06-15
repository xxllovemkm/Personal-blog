export interface Publication {
  title: string;
  url: string;
  source: 'openreview' | 'arxiv' | 'local';
  venue?: string;
  status?: string;
  rank?: string;
}

export const openReviewProfile = 'https://openreview.net/profile?id=~Xinglong_Xu2';
const openReviewProfileId = '~Xinglong_Xu2';

const fallbackPublications: Publication[] = [
  {
    title: 'Bridging Modal Isolation in Interleaved Thinking: Supervising Modality Transitions via Stepwise Reinforcement',
    url: 'https://arxiv.org/abs/2606.12886',
    source: 'arxiv',
    venue: 'EMNLP 2026',
    status: '在投',
    rank: 'CCF-B',
  },
  {
    title: 'PaperFlow: Profiling, Recommending, and Adapting Across Daily Paper Streams',
    url: 'https://arxiv.org/abs/2606.07454',
    source: 'arxiv',
    venue: 'EMNLP 2026',
    status: '在投',
    rank: 'CCF-B',
  },
  {
    title: 'The Trinity of Consistency as a Defining Principle for General World Models',
    url: 'https://arxiv.org/abs/2602.23152',
    source: 'arxiv',
    venue: 'arXiv',
    status: 'Preprint',
  },
  {
    title: 'GGBench: A Geometric Generative Reasoning Benchmark for Unified Multimodal Models',
    url: 'https://arxiv.org/abs/2511.11134',
    source: 'arxiv',
    venue: 'CVPR 2026',
    status: '已发表',
    rank: 'CCF-A',
  },
  {
    title: 'Programming with Data: Test-Driven Data Engineering for Self-Improving LLMs from Raw Corpora',
    url: 'https://arxiv.org/abs/2604.24819',
    source: 'arxiv',
    venue: 'Nature Machine Intelligence',
    status: '在投',
    rank: '中科院一区 Top',
  },
  {
    title: 'PaperFit: Vision-in-the-Loop Typesetting Optimization for Scientific Documents',
    url: 'https://arxiv.org/abs/2605.10341',
    source: 'arxiv',
    venue: 'NeurIPS 2026',
    status: '在投',
    rank: 'CCF-A',
  },
  {
    title: 'PAGER: Bridging the Semantic-Execution Gap in Point-Precise Geometric GUI Control',
    url: 'https://arxiv.org/abs/2605.15963',
    source: 'arxiv',
    venue: 'NeurIPS 2026',
    status: '在投',
    rank: 'CCF-A',
  },
];

let publicationCache: Publication[] | undefined;

function valueOfOpenReviewField(field: unknown): string | undefined {
  if (typeof field === 'string') return field;
  if (field && typeof field === 'object' && 'value' in field) {
    const value = (field as { value?: unknown }).value;
    return typeof value === 'string' ? value : undefined;
  }
  return undefined;
}

function normalizeOpenReviewNote(note: any): Publication | undefined {
  const title = valueOfOpenReviewField(note?.content?.title);
  if (!title) return undefined;

  return {
    title,
    url: `https://openreview.net/forum?id=${note.forum || note.id}`,
    source: 'openreview',
    venue: valueOfOpenReviewField(note?.content?.venue) || valueOfOpenReviewField(note?.content?.venueid),
  };
}

async function fetchOpenReviewPublications(): Promise<Publication[]> {
  const encodedProfileId = encodeURIComponent(openReviewProfileId);
  const endpoints = [
    `https://api2.openreview.net/notes?content.authorids=${encodedProfileId}&limit=100`,
    `https://api2.openreview.net/notes?content.authors.username=${encodedProfileId}&limit=100`,
  ];

  const publications = new Map<string, Publication>();

  for (const endpoint of endpoints) {
    const response = await fetch(endpoint);
    if (!response.ok) continue;

    const data = await response.json();
    for (const note of data.notes || []) {
      const publication = normalizeOpenReviewNote(note);
      if (publication) publications.set(publication.title, publication);
    }
  }

  return [...publications.values()];
}

export async function getPublications(): Promise<Publication[]> {
  if (publicationCache) return publicationCache;

  try {
    const openReviewPublications = await fetchOpenReviewPublications();
    publicationCache = openReviewPublications.length > 0
      ? openReviewPublications
      : fallbackPublications;
  } catch {
    publicationCache = fallbackPublications;
  }

  return publicationCache;
}
