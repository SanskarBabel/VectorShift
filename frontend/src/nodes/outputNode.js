import React, { useState } from 'react';
import { BaseNode, FieldLabel, FieldInput, FieldSelect } from './baseNode';

export function OutputNode({ id, data }) {
  const [name, setName] = useState(data?.outputName || 'output');
  const [type, setType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="⬇"
      accentColor="#f76ac8"
      inputs={[{ id: 'value', label: 'value' }]}
    >
      <FieldLabel>Name</FieldLabel>
      <FieldInput value={name} onChange={e => setName(e.target.value)} placeholder="output_name" />
      <div style={{ height: 8 }} />
      <FieldLabel>Type</FieldLabel>
      <FieldSelect
        value={type}
        onChange={e => setType(e.target.value)}
        options={[
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
          { value: 'Image', label: 'Image' },
        ]}
      />
    </BaseNode>
  );
}
