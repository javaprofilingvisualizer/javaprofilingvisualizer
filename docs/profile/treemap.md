# Treemap Visualization

The treemap shows the **hierarchical distribution of cost**: each rectangle is a package, class or method; its area is proportional to its share of samples.

<figure class="jpv-figure">
  <img src="/treemap-illustration.png" alt="Treemap: nested rectangles sized by sample share, coloured by tree depth" />
  <figcaption><span class="jpv-fig-label">Figure — Treemap.</span> Packages contain classes contain methods; rectangle area tracks the subtree's share of samples, and colour encodes depth (package → class → method).</figcaption>
</figure>

Built with **D3.js v7** as a self-contained HTML template.

## Reading it

- **Nesting** follows the code hierarchy: packages contain classes contain methods.
- **Area** ≈ total cost of the subtree.
- **Click** a rectangle to zoom into that subtree; a breadcrumb navigates back up.
- **Tooltip** shows the fully-qualified name, sample count, and percentage of the total.

