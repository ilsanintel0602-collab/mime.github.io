
export type Category = '전체' | '교육' | '언어' | '음성' | '진행' | '해외경험';

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  category: Category;
  description: string;
  details: string[];
}

export interface WorkItem {
  id: number;
  type: '오디오북' | '봉사' | '진행';
  title: string;
  subtitle: string;
  date: string;
  desc: string;
  imageUrl?: string;
}

export interface FinderQuestion {
  id: number;
  question: string;
  options: { label: string; value: string }[];
}

export interface FinderResult {
  title: string;
  reason: string;
  matchScore: number;
}
