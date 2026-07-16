# Introduction

**Java Profiling Visualizer** is a profiling and visualization tool for Java software, developed during an internship at Inria Lille (Spirals team), in partnership with Berger-Levrault. It answers two questions that performance investigation asks:

1. **Within one version** — *where does the time go?* Which packages, classes and methods dominate the cost, and through which call paths is that cost reached?

2. **Across versions** — *what changed?* When performance improves or regresses between releases, which parts of the call tree are responsible?


## The two modules

The tool is organized around two complementary modules:

### Profile module

The Profile module parses the execution trace captured with [async-profiler 4.4](https://github.com/async-profiler/async-profiler), and produces a hierarchical JSON cost tree and two D3.js visualizations:

- **Treemap** — hierarchical share of cost per package/class/method;
- **Sankey diagram** — the flow of samples along call paths.

### Differential module

The Differential module compares profiles from multiple ordered versions of the same program. It first runs the [SFTM algorithm](/differential/sftm) to produce stable class identities across versions, then renders a D3 **streamgraph** showing how each class's cost evolves version after version.
