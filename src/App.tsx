import { useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlowProvider,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from '@xyflow/react';
import TopicNode from './components/TopicNode';
import learningMap from './learning-map.json';
import type { LearningMap, Relationship, Topic } from './types';

const map = learningMap as LearningMap;
const nodeTypes = { topic: TopicNode };

function topicTarget(topic: Topic) {
  return `decks/${topic.deck}/index.html#/${topic.slide}`;
}

function edgeClass(rel: Relationship) {
  return `edge--${rel.kind ?? 'related'}`;
}

function LearningMapView() {
  const [activeTopicId, setActiveTopicId] = useState(map.topics[0]?.id ?? '');

  const activeTopic = useMemo(
    () => map.topics.find((topic) => topic.id === activeTopicId) ?? map.topics[0],
    [activeTopicId],
  );

  const nodes: Node[] = useMemo(
    () =>
      map.topics.map((topic) => ({
        id: topic.id,
        type: 'topic',
        position: topic.position,
        data: topic,
      })),
    [],
  );

  const edges: Edge[] = useMemo(
    () =>
      map.relationships.map((rel) => ({
        id: rel.id,
        source: rel.source,
        target: rel.target,
        label: rel.label,
        className: edgeClass(rel),
        animated: rel.kind === 'deepens',
      })),
    [],
  );

  const openTopic = (topic: Topic) => {
    window.location.href = topicTarget(topic);
  };

  const onNodeClick: NodeMouseHandler = (_event, node) => {
    const topic = node.data as Topic;
    setActiveTopicId(topic.id);
  };

  const onNodeDoubleClick: NodeMouseHandler = (_event, node) => {
    openTopic(node.data as Topic);
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="kicker">Client-only learning graph MVP</p>
          <h1>{map.title}</h1>
          <p>{map.description}</p>
        </div>
        <a className="hero__link" href="decks/genai/index.html#/intro">
          Start overview deck
        </a>
      </header>

      <main className="workspace">
        <section className="map-card" aria-label="Interactive learning map">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onNodeDoubleClick={onNodeDoubleClick}
            fitView
            minZoom={0.35}
            maxZoom={1.5}
          >
            <Background />
            <Controls />
            <MiniMap zoomable pannable />
            <Panel position="top-left" className="map-hint">
              Click a node to inspect it. Double-click or use “Open topic” to jump into its deck slide.
            </Panel>
          </ReactFlow>
        </section>

        <aside className="topic-panel" aria-label="Selected topic details">
          <p className="panel-label">Selected topic</p>
          <h2>{activeTopic.title}</h2>
          <p>{activeTopic.description}</p>
          <dl>
            <div>
              <dt>Deck</dt>
              <dd>{activeTopic.deck}</dd>
            </div>
            <div>
              <dt>Slide</dt>
              <dd>{activeTopic.slide}</dd>
            </div>
          </dl>
          <div className="tag-row">
            {activeTopic.tags?.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <button type="button" onClick={() => openTopic(activeTopic)}>
            Open topic
          </button>
          <a className="secondary-link" href="decks/genai/index.html#/how-to-use">
            See navigation pattern
          </a>
        </aside>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <LearningMapView />
    </ReactFlowProvider>
  );
}
