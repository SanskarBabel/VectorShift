import React, { useState } from 'react';
import { BaseNode, FieldLabel, FieldInput, FieldSelect } from './baseNode';

export function InputNode({ id, data }) {
  const [name, setName] = useState(data?.inputName || 'input');
  const [type, setType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="⬆"
      accentColor="#6af7c8"
      outputs={[{ id: 'value', label: 'value' }]}
    >
      <FieldLabel>Name</FieldLabel>
      <FieldInput value={name} onChange={e => setName(e.target.value)} placeholder="input_name" />
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
