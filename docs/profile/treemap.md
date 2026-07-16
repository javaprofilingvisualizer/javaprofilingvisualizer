# Treemap Visualization

The treemap shows the **hierarchical distribution of cost**: each rectangle is a package, class or method; its area is proportional to its share of samples.

## Reading it

- **Nesting** follows the code hierarchy: packages contain classes contain methods.
- **Area** ≈ total cost of the subtree.
- **Click** a rectangle to zoom into that subtree; a breadcrumb navigates back up.
- **Tooltip** shows the fully-qualified name, sample count, and percentage of the total.

## Implementation notes

Built with **D3.js v7** (`d3.treemap()`), as a self-contained HTML template receiving its JSON through the `__DATA__` placeholder.

- **Colour** encodes tree depth on a *magma* scale. The scale's domain is fixed on the **full tree's height**, so a given node keeps the same colour whatever the current zoom level — colours don't shift as you navigate in and out of subtrees.
- **Label colour** is picked per rectangle from the background's perceived luminance, keeping text legible on both dark and light cells.
