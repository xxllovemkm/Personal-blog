export interface Publication {
  title: string;
  venue: string;
  year: string;
  role: string;
  status: string;
  authors: string;
  summary: string;
  links: {
    arxiv?: string;
    project?: string;
    openreview?: string;
  };
}

export const openReviewProfile = 'https://openreview.net/profile?id=~Xuxinglong1';

export const publications: Publication[] = [
  {
    title: 'GGBench: A Geometric Generative Reasoning Benchmark for Unified Multimodal Models',
    venue: 'CVPR',
    year: '2026',
    role: '共同一作',
    status: 'Published',
    authors: 'Jingxuan Wei, Caijun Jia, Xi Bai, Xinglong Xu, Siyuan Li, Linzhuang Sun, Bihui Yu, Conghui He, Lijun Wu, Cheng Tan',
    summary:
      '提出几何生成式推理基准，用可执行 GeoGebra 代码作为机器可验证真值，评测多模态模型的语言推理与精确视觉构造能力。',
    links: {
      arxiv: 'https://arxiv.org/abs/2511.11134',
      project: 'https://opendatalab-raiser.github.io/GGBench/',
    },
  },
  {
    title: 'Programming with Data: Test-Driven Data Engineering for Self-Improving LLMs from Raw Corpora',
    venue: 'arXiv',
    year: '2026',
    role: '共同一作',
    status: 'Preprint',
    authors: 'Chenkai Pan, Xinglong Xu, Yuhang Xu, Yujun Wu, Siyuan Li, Jintao Chen, Conghui He, Jingxuan Wei, Cheng Tan',
    summary:
      '提出 Programming with Data / ProDa 范式，将大模型数据工程映射到测试驱动开发流程，使模型错误可诊断、可回溯、可定向修复。',
    links: {
      arxiv: 'https://arxiv.org/abs/2604.24819',
    },
  },
  {
    title: 'PaperFit: Vision-in-the-Loop Typesetting Optimization for Scientific Documents',
    venue: 'arXiv',
    year: '2026',
    role: '学生一作',
    status: 'Preprint',
    authors: 'Bihui Yu, Xinglong Xu, Junjie Jiang, Jiabei Cheng, Caijun Jia, Siyuan Li, Conghui He, Jingxuan Wei, Cheng Tan',
    summary:
      '形式化 Visual Typesetting Optimization 任务，提出 vision-in-the-loop Agent，将可编译 LaTeX 论文迭代优化为可出版版面。',
    links: {
      arxiv: 'https://arxiv.org/abs/2605.10341',
    },
  },
];
