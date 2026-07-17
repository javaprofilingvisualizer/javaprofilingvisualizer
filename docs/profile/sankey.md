# Sankey Diagram

The Sankey diagram shows **how cost flows through call paths**: nodes are stack frames, links carry samples from caller to callee, and link width is proportional to sample volume. Where the treemap answers *which* components are expensive, the Sankey answers *through which paths* they are reached.

<figure class="jpv-figure">
  <img src="/sankey-illustration.png" alt="Sankey diagram: frames as nodes with left-to-right flow ribbons" />
  <figcaption><span class="jpv-fig-label">Figure — Sankey.</span> Samples flow left to right along caller → callee edges; ribbon width tracks sample volume. </figcaption>
</figure>

Built on **D3 v7** as a self-contained HTML template.

## The cycle problem {#cycles}

`d3-sankey` computes a layered left-to-right layout and **rejects cyclic graphs** — but real call graphs are full of cycles: recursion, mutual recursion, callbacks. Instead of deleting a back-edge `A → B`, the target node is **duplicated**: the edge is redirected to a fresh replica `B#2` (then `B#3`, …).  

```
   before:            after unfolding:
   A ──▶ B            A ──▶ B ──▶ C ──▶ B#2
        ▲ │
        └─C
```


## Terminal samples: synthetic `$` leaves

The graph materializes terminal samples explicitly: every node with samples (the frame was at the top of the stack) is given a **synthetic
terminal leaf**, named after the node with a `$` suffix and linked to it by a
flow carrying exactly its self-sample count. These leaves are placed at the
**far right** of the diagram, isolating terminal consumption so it stays
visible instead of being lost among the call flows.

## Interactive filters

Dense traces produce unreadable diagrams; four controls restore legibility:

| Control | Effect |
|---|---|
| **Granularity** | Switch between **package** view and **class** view |
| **Package depth** | Truncate names to their first *k* package segments, merging all nodes and links sharing the truncated prefix |
| **Minimum link threshold** | Hide links below a sample-count floor |
| **Low-flow grouping** | Nodes whose total flow (in + out) falls below the threshold are folded into a per-root aggregate node |

plus **focus mode** (click a node to isolate its upstream/downstream paths), **drag-and-drop** node repositioning, and tooltips with exact sample counts.
