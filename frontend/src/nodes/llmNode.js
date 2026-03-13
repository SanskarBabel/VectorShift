import React, { useState } from "react";
import { BaseNode, FieldLabel, FieldSelect } from "./BaseNode";

export function LLMNode({ id, data }) {
  const [model, setModel] = useState(data?.model || "gpt-4o");

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🧠"
      accentColor="#7c6af7"
      inputs={[
        { id: "system", label: "system" },
        { id: "prompt", label: "prompt" },
      ]}
      outputs={[{ id: "response", label: "response" }]}
    >
      <FieldLabel>Model</FieldLabel>
      <FieldSelect
        value={model}
        onChange={(e) => setModel(e.target.value)}
        options={[
          { value: "gpt-4o", label: "GPT-4o" },
          { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
          { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
          { value: "claude-3-opus", label: "Claude 3 Opus" },
          { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
          { value: "gemini-pro", label: "Gemini Pro" },
        ]}
      />
      <div
        style={{
          marginTop: 10,
          fontSize: 10,
          color: "var(--text-dim)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span style={{ color: "#7c6af7" }}>● </span>system + prompt → response
      </div>
    </BaseNode>
  );
}
