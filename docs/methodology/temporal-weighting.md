# Temporal Weighting

**Raw sample counts cannot be compared across versions**. This page explains why.

## The flat streamgraph problem {#the-flat-streamgraph-problem}

Early multi-version experiments profiled every version with a **fixed duration** (`-d 30`). The resulting streamgraphs were **flat**.

The reason is structural. A sampling profiler ticks at a fixed rate; in 30 seconds it collects roughly the same number of samples whatever the code does. In JMH fixed-duration mode, **JMH controls wall time, not operation count**: a fast version simply executes *more operations* inside the same 30 seconds. The sample **proportions** per class stay similar.

Raw samples `s` are a proxy for **proportions within one version**, nothing more. 

## The formula

For a class `c` in version `v`:

$$\tau_{c,v} = \frac{s_{c,v}}{N_v} \times T_v$$

| Symbol | Meaning | Source |
|---|---|---|
| $s_{c,v}$ | samples attributed to `c` in version `v` | JFR sample aggregation |
| $N_v$ | total samples in version `v` | sum of samples over all classes |
| $T_v$ | time of version `v` | `primaryMetric.score` (JMH) or `elapsed / N_ops` (standalone) |

- $\frac{s}{N}$ is the class's **share** of execution — a quantity sampling estimates well;
- $T$ re-anchors that share to a **physical time**.

The product $\tau_{c,v}$ is **the time per operation spent in class `c`**.

::: details τ with T in seconds-per-operation vs total duration
The formula is valid with either anchoring: if $T$ is the total run duration, $\tau$ is the class's total time contribution; if $T$ is time **per operation** (JPV's convention), $\tau$ is the class's per-operation time contribution. The per-operation form is what makes version-to-version comparison meaningful independent of how long each run happened to be.
:::

## Where `T` comes from (per mode)

Two acquisition modes, one formula — details in [Profiling Modes](/methodology/profiling-modes):

- **JMH mode** — `T = primaryMetric.score` from the JMH JSON result.
- **Standalone mode** — `T = \text{elapsed time} / N_{ops}`, with the profiler attached via `-agentpath` and **no duration cap**, so the recording spans exactly the measured execution.
