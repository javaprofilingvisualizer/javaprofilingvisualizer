# Streamgraph Visualization

The streamgraph represents the differential view: **one band per class** (or package, or method), the horizontal axis is the version sequence, and band thickness at each version is that entity's cost. Widening bands are regressions, while narrowing bands are improvements. 

Built with **D3.js v7**, self-contained HTML with `__DATA__` injection.

## Two units: Time vs Samples

A toggle switches the vertical unit:

| Mode | Value shown | Valid comparison |
|---|---|---|
| **Time** | $\tau = \frac{s}{N}\times T$ — ms per operation | **across versions** ✓ |
| **Samples** | raw sample proportions | within one version only |

 Raw samples are proxies for proportions *within* a version only; comparing them across versions is meaningless when total run time differs. Full derivation: [Temporal Weighting](/methodology/temporal-weighting).

## Granularity

Three aggregation levels: **package**, **class** and **method**.

## Interaction

- **Focus mode** — click a band to isolate it and see the evolution in consumption of that particular node;
- **Tooltips** — they show the full name history (so renames stay visible), the raw samples and the τ value;
- **Labels** — positioned at the **top** of each band;
- **Filter panel** — controls the granularity and groups small bands.
