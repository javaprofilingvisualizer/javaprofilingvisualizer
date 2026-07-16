# Getting Started

This page walks you through a first run.

## Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| JDK | 11+ (21 recommended) | Running targets and the JFR parser |
| async-profiler | 4.4 | Sample capture  |
| Node.js | 18+ | SFTM module and visualization templates |
| Maven | 3.8+ | Building profile project |
| GNU Make | — | Automating the workflow |

::: tip Kernel settings
With `event=wall` (the default, see [Profiling Modes](/methodology/profiling-modes)) no special kernel permissions are needed — one of the reasons wall-clock sampling was chosen. `event=cpu` via `perf_events` may require lowering `perf_event_paranoid`.
:::

## 1. Profiling with async-profiler

### With a standalone program / benchmark

Attach async-profiler directly to the forked JVM with `-agentpath`:

```bash
java -agentpath:/path/to/libasyncProfiler.so=start,event=wall,file=profile.jfr \
     -jar my-app.jar 
```

### With a running application

async-profiler can also attach to an already-running JVM by PID, using the `asprof` launcher:

```bash
asprof start -e wall -f profile.jfr <pid>  
# ... exercise the application ...
asprof stop <pid>                        
```

Since attach mode records a time window rather than a complete execution, drive a **fixed, known load** during the window and compute `T = elapsed / N` to keep the [τ formula](/methodology/temporal-weighting) valid.

## 2. Parse and visualize

### Cloning the project repository

```bash
git clone https://gitlab.univ-lille.fr/malak.touat.etu/java-profiling-visualizer
```

### Single version — Profile module

From the `.jfr` recording, you can produce the treemap and Sankey diagram by running:

```bash
cd profile
make run FILE=profile.jfr
```

### Across versions — Differential module

From the JSON files produced by the Profile module, you can produce the streamgraph by running:

```bash
cd differential
npx tsx src/main.ts v1.json v2.json v3.json -o stream.json --html stream.html
```

## 3. Read the results

- **Treemap** — rectangle area ≈ cost share; click to zoom into a package. See [Treemap](/profile/treemap).
- **Sankey** — left-to-right flow of samples through call frames. See [Sankey Diagram](/profile/sankey).
- **Streamgraph** — one band per class. See [Streamgraph](/differential/streamgraph).
