# Scope & Limitations

This page records what the Java Profiling Visualizer tool detects well, what it detects indirectly, and what it does not claim.

## What the streamgraph detects well: structural change

The SFTM + streamgraph combination is built to reveal **structural call-tree changes**:

- classes/methods **appearing** (new bands from zero);
- classes/methods **disappearing** (bands to zero);
- **renames** tracked as continuous bands;
- **replacements** shown as a hand-over between bands;
- **cost shifting** between existing structures.

## What it detects indirectly: constant-factor changes

A method that keeps its name, position and callees but simply becomes 2× slower produces **no structural signal**. It *is* visible in the **Time mode**: its band thickens, because its `s/N` share grows and/or `T` grows. But attribution is weaker — the streamgraph says *this band got thicker*, not *why*. Drilling down requires looking at the single-version Sankey, and ultimately the source difference. 

## Comparability requirements

The τ comparison assumes each version performs **the same logical work per operation**. Guaranteeing it required real care in the case studies:

- one benchmark source compiled against N library versions;
- identical parameters and operation counts across versions;
- fixed-load rather than fixed-duration workloads.

## Beyond time: energy

The pipeline was designed with the Spirals team's energy work (notably [PowerAPI](https://powerapi.org/)) in mind. For now, this version treats **time as a proxy for energy**.
