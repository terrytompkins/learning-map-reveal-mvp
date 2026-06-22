export type TopicLevel = 'overview' | 'major' | 'topic' | 'deep-dive';

export type Topic = {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  level: TopicLevel;
  deck: string;
  slide: string;
  position: { x: number; y: number };
  tags?: string[];
};

export type Relationship = {
  id: string;
  source: string;
  target: string;
  label?: string;
  kind?: 'contains' | 'depends-on' | 'deepens' | 'related';
};

export type LearningMap = {
  version: string;
  title: string;
  description: string;
  topics: Topic[];
  relationships: Relationship[];
};
