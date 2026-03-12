import React, { useState } from 'react';
import { BaseNode, FieldLabel, FieldSelect } from './baseNode';

export function TransformNode({ id, data }) {
  const [op, setOp] = useState(data?.operation || 'uppercase');
  return (
    <BaseNode id={id} title="Transform" icon="⚡" accentColor="#f7a06a"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'output', label: 'output' }]}
    >
      <FieldLabel>Operation</FieldLabel>
      <FieldSelect value={op} onChange={e => setOp(e.target.value)} options={[
        { value: 'uppercase', label: 'Uppercase' },
        { value: 'lowercase', label: 'Lowercase' },
        { value: 'trim', label: 'Trim Whitespace' },
        { value: 'reverse', label: 'Reverse' },
        { value: 'json_parse', label: 'JSON Parse' },
        { value: 'json_stringify', label: 'JSON Stringify' },
      ]} />
    </BaseNode>
  );
}
