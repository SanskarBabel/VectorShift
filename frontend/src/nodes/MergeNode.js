import React, { useState } from 'react';
import { BaseNode, FieldLabel, FieldInput, FieldSelect } from './baseNode';

export function MergeNode({ id, data }) {
  const [separator, setSeparator] = useState(data?.separator || '\\n');
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');
  return (
    <BaseNode id={id} title="Merge" icon="🔀" accentColor="#c86af7"
      inputs={[
        { id: 'input_a', label: 'A' },
        { id: 'input_b', label: 'B' },
      ]}
      outputs={[{ id: 'merged', label: 'merged' }]}
    >
      <FieldLabel>Strategy</FieldLabel>
      <FieldSelect value={strategy} onChange={e => setStrategy(e.target.value)} options={[
        { value: 'concat', label: 'Concatenate' },
        { value: 'interleave', label: 'Interleave' },
        { value: 'zip', label: 'Zip' },
      ]} />
      <div style={{ height: 8 }} />
      <FieldLabel>Separator</FieldLabel>
      <FieldInput value={separator} onChange={e => setSeparator(e.target.value)} placeholder="separator..." />
    </BaseNode>
  );
}
