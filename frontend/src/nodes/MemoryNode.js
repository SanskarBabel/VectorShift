import React, { useState } from 'react';
import { BaseNode, FieldLabel, FieldInput, FieldSelect } from './baseNode';

export function MemoryNode({ id, data }) {
  const [memType, setMemType] = useState(data?.memType || 'buffer');
  const [maxItems, setMaxItems] = useState(data?.maxItems || '10');
  return (
    <BaseNode id={id} title="Memory" icon="💾" accentColor="#6a9af7"
      inputs={[
        { id: 'write', label: 'write' },
        { id: 'query', label: 'query' },
      ]}
      outputs={[
        { id: 'recall', label: 'recall' },
        { id: 'summary', label: 'summary' },
      ]}
    >
      <FieldLabel>Memory Type</FieldLabel>
      <FieldSelect value={memType} onChange={e => setMemType(e.target.value)} options={[
        { value: 'buffer', label: 'Buffer (Window)' },
        { value: 'summary', label: 'Summary' },
        { value: 'vector', label: 'Vector Store' },
        { value: 'entity', label: 'Entity' },
      ]} />
      <div style={{ height: 8 }} />
      <FieldLabel>Max Items</FieldLabel>
      <FieldInput value={maxItems} onChange={e => setMaxItems(e.target.value)} placeholder="10" />
    </BaseNode>
  );
}
