---
layout: home

hero:
  name: Java Profiling Visualizer
  tagline: A profiling and visualization pipeline that turns java execution traces into treemaps, Sankey diagrams and differential streamgraphs.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Introduction
      link: /guide/introduction
    - theme: alt
      text: Repository 
      link: https://gitlab.univ-lille.fr/malak.touat.etu/java-profiling-visualizer
---
## The three visualizations

<div class="jpv-showcase">
  <a href="/profile/treemap">
    <img src="/treemap-illustration.png" alt="Treemap illustration" />
    <div class="cap"><b>Treemap</b><span>Hierarchical share of cost per package, class and method.</span></div>
  </a>
  <a href="/profile/sankey">
    <img src="/sankey-illustration.png" alt="Sankey diagram illustration" />
    <div class="cap"><b>Sankey</b><span>Flow of execution samples along caller → callee edges.</span></div>
  </a>
  <a href="/differential/streamgraph">
    <img src="/streamgraph-illustration.png" alt="Streamgraph illustration" />
    <div class="cap"><b>Streamgraph</b><span>Cost evolution across an ordered version sequence.</span></div>
  </a>
</div>
