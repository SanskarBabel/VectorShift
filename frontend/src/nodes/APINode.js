import React, { useState } from 'react';
import { BaseNode, FieldLabel, FieldInput, FieldSelect } from './BaseNode';

export function APINode({ id, data }) {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');
  return (
    <BaseNode id={id} title="API Call" icon="🌐" accentColor="#f76a6a"
      inputs={[
        { id: 'body', label: 'body' },
        { id: 'headers', label: 'headers' },
      ]}
      outputs={[
        { id: 'response', label: 'response' },
        { id: 'status', label: 'status' },
      ]}
      minWidth={260}
    >
      <FieldLabel>Method</FieldLabel>
      <FieldSelect value={method} onChange={e => setMethod(e.target.value)} options={[
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' },
        { value: 'PATCH', label: 'PATCH' },
      ]} />
      <div style={{ height: 8 }} />
      <FieldLabel>URL</FieldLabel>
      <FieldInput value={url} onChange={e => setUrl(e.target.value)} placeholder="https://api.example.com/..." />
    </BaseNode>
  );
}
