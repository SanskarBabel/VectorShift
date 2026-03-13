import { InputNode } from "./InputNode";
import { OutputNode } from "./OutputNode";
import { LLMNode } from "./LLMNode";
import { TextNode } from "./TextNode";
import { TransformNode } from "./TransformNode";
import { FilterNode } from "./FilterNode";
import { MergeNode } from "./MergeNode";
import { APINode } from "./APINode";
import { MemoryNode } from "./MemoryNode";

export const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  transform: TransformNode,
  filter: FilterNode,
  merge: MergeNode,
  api: APINode,
  memory: MemoryNode,
};

export const nodeMenu = [
  { type: "customInput", label: "Input", icon: "⬆", color: "#6af7c8" },
  { type: "customOutput", label: "Output", icon: "⬇", color: "#f76ac8" },
  { type: "llm", label: "LLM", icon: "🧠", color: "#7c6af7" },
  { type: "text", label: "Text", icon: "✏️", color: "#f7c86a" },
  { type: "transform", label: "Transform", icon: "⚡", color: "#f7a06a" },
  { type: "filter", label: "Filter", icon: "🔍", color: "#6af0f7" },
  { type: "merge", label: "Merge", icon: "🔀", color: "#c86af7" },
  { type: "api", label: "API Call", icon: "🌐", color: "#f76a6a" },
  { type: "memory", label: "Memory", icon: "💾", color: "#6a9af7" },
];
