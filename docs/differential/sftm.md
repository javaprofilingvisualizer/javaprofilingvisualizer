# Structural Tree Matching

Matching two call trees proceeds in **three stages**: textual similarity, topological propagation, and stochastic assignment.

## Stage 1 — Textual similarity 

Every fully-qualified name is split by `Tokenizer.ts` into tokens: package segments, class name, method name. An **inverted index** token → nodes (`Indexing.ts`) lets each source node preselect plausible candidates in the target tree efficiently.

Candidate scores are **weighted by token rarity**: a rare token (a specific class name) is more discriminating than a common one (`java`, `util`, `get`). Two nodes are similar to the extent that they share *rare* tokens.

This stage prunes an otherwise quadratic candidate space down to short per-node candidate lists (managed through `LinkedList.ts`), bounded by the `f(N) = N^{0.5}` candidate limit retained from the original paper's sensitivity study.

## Stage 2 — Topological propagation

Text alone cannot separate homonyms: overloaded methods, utility methods repeated across packages, or renamed nodes whose new label shares few tokens with the old one. `Neighbors.ts` therefore **propagates similarity through the tree topology**: a candidate pair gains score if its **parents** are similar and if its **children** are similar. The intuition is that even when a class is renamed, who calls it and what it calls usually survives the rename.

## Stage 3 — Stochastic assignment (Metropolis)

The propagated scores define a weighted bipartite assignment problem: choose at most one match per node, maximizing total similarity. `Metropolis.ts` solves it by iteratively proposing match swaps and accepting them with a probability that depends on the score change, escaping local optima that a greedy assignment would get stuck in.


For more details, check out [this article](https://hal.science/hal-03774245v1/).
