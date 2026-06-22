import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { Topic } from '../types';

type TopicNodeData = Topic;

const levelLabels: Record<Topic['level'], string> = {
  overview: 'Start',
  major: 'Deck',
  topic: 'Slide',
  'deep-dive': 'Deep dive',
};

export default function TopicNode({ data, selected }: NodeProps) {
  const topic = data as unknown as TopicNodeData;

  return (
    <div className={`topic-node topic-node--${topic.level} ${selected ? 'topic-node--selected' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <div className="topic-node__eyebrow">{levelLabels[topic.level]}</div>
      <div className="topic-node__title">{topic.shortTitle ?? topic.title}</div>
      <div className="topic-node__meta">{topic.deck} / {topic.slide}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
