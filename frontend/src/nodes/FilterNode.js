import React, { useState } from "react";
import { BaseNode, FieldLabel, FieldInput, FieldSelect } from "./BaseNode";

export function FilterNode({ id, data }) {
  const [condition, setCondition] = useState(data?.condition || "contains");
  const [value, setValue] = useState(data?.value || "");
  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      accentColor="#6af0f7"
      inputs={[{ id: "input", label: "input" }]}
      outputs={[
        { id: "pass", label: "pass" },
        { id: "fail", label: "fail" },
      ]}
    >
      <FieldLabel>Condition</FieldLabel>
      <FieldSelect
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        options={[
          { value: "contains", label: "Contains" },
          { value: "equals", label: "Equals" },
          { value: "starts_with", label: "Starts With" },
          { value: "ends_with", label: "Ends With" },
          { value: "greater_than", label: "Greater Than" },
          { value: "less_than", label: "Less Than" },
        ]}
      />
      <div style={{ height: 8 }} />
      <FieldLabel>Value</FieldLabel>
      <FieldInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="filter value..."
      />
    </BaseNode>
  );
}
