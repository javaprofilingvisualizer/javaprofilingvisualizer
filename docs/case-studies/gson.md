# Case study — Gson 

This case study runs the full pipeline on a single, controlled optimization
in [Gson](https://github.com/google/gson), Google's Java JSON library, documented in [this article](https://inria.hal.science/hal-03275286v1).   

It shows the intended workflow end to end: a JMH benchmark profiled across an ordered
sequence of versions, normalized with the [time formula](/methodology/temporal-weighting),
and read off the [streamgraph](/differential/streamgraph) — with the
single-version [treemap](/profile/treemap) and [Sankey](/profile/sankey) used to
confirm *where* and *why* the change happens.

## The question

`Gson.toJsonTree(Object)` serializes a Java object into an in-memory tree of
`JsonElement`s. Its implementation changed: rather than serializing
the object to a JSON **String** and then re-parsing that string back into a
`JsonElement` tree — a full round-trip through the textual form — later versions
write **directly** into the tree through a dedicated `JsonWriter` subclass
(`JsonTreeWriter`) that builds `JsonElement`s as tokens arrive.

The question this case study answers: **does the tool detect that change and attribute it
to the right structures**

## Experimental setup

A single benchmark source is compiled against **seven successive Gson commits**
and profiled identically. 

Each run yields one JSON cost tree; the seven trees are aligned by
[SFTM](/differential/sftm) and fused into a single streamgraph, in **Time mode**
so that bands carry $\tau = \frac{s}{N}\times T$ (milliseconds per operation),
comparable across versions.

## What the streamgraph shows

Read left to right along the commit sequence, the differential view exhibits the
textbook **cost hand-over** signature:

- the band carrying the **string round-trip path** — object → serialized text →
  re-parse — **shrinks toward zero**;
- a band for the **direct tree-writing path** (`JsonTreeWriter`) **appears and
  grows** to absorb the work;
- the **total** thickness at the target version **collapses**, because the whole
  serialize-then-reparse detour is gone.

<figure class="jpv-figure">
  <img src="/streamgraph-illustration.png" alt="Streamgraph of the Gson toJsonTree evolution: a string round-trip band collapsing while a direct tree-writer band appears" />
  <figcaption><span class="jpv-fig-label">Figure — schematic.</span> The differential signature of the change: a string-based serialization band collapsing to zero while a direct tree-writer band appears and absorbs the work. (Illustrative rendering; replace with your own export.)</figcaption>
</figure>

Because the two paths are **different structures** — different classes on the
call tree — this is not a constant-factor speedup hiding inside one method; it is
a genuine **structural** change, exactly the regime the SFTM + streamgraph
combination is designed to surface. Across the swept load sizes, the measured
per-operation time drops by roughly **25× to 40×**, the improvement widening with
larger object graphs (the eliminated round-trip cost scales with output size).

## Confirming it in the single-version views

The streamgraph says *what changed and by how much*; the single-version views say
*where*:

- In the **treemap** of an early version, a large share of area sits under the
  text-serialization and JSON-parsing subtrees — the object is fully rendered to
  characters and read back.
- In the **Sankey** of the same version, sample flow reaches those frames through
  a long caller → callee path (writer → string buffer → parser), visibly absent
  in the later version, where flow terminates in the compact tree-writer frames.

Together the three views form a complete argument: the streamgraph localizes the
change in *version space*, the treemap and Sankey localize it in *call-tree
space*, and τ puts a physical, per-operation number on it.

## Takeaway

Given only per-version JFR recordings and no access to the source diff, JPV
recovers the nature of the optimization (a string round-trip replaced by direct
tree writing), attributes it to the responsible structures, and quantifies it in
comparable per-operation time. This is the pattern the tool targets: **structural
performance changes across versions, made legible and measurable.**
