# Single-Version Visuals — Overview

The Profile module characterizes the cost distribution within a single program version: the JFR recording produced by [async-profiler](https://github.com/async-profiler/async-profiler) is parsed into a hierarchical tree, rendered as two complementary interactive visualizations.

## The two views, and why both

**The treemap shows *distribution*.** Rectangle area is proportional to cost share, nested by package → class → method. It answers "which components dominate?" at a glance, but says nothing about *how* the cost is reached.

**The Sankey shows *flow*.** Samples travel left-to-right along call edges; link width is proportional to sample volume. It answers "through which call paths does the cost arrive?", which the treemap alone could not reveal.

Neither view is differential: both are snapshots of **one** version. Cross-version causality is the job of the [differential module](/differential/overview).