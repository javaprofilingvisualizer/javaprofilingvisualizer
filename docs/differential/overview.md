# Across versions comparison — Overview

The Differential module performs **multi-version differential analysis**: given one profile per version of a program, it aligns their call trees, tracks each method's identity through renames and refactorings, and renders the evolution of cost as a [streamgraph](/differential/streamgraph).

## Why naive diffing fails

The obvious approach is to match nodes by **name equality** and subtract sample counts. It works only while names are perfectly stable, and real software breaks that assumption constantly:

- a class or package is **renamed**;
- a method is **moved** in the call hierarchy;
- a package is **relocated**.

Each of these would be reported as one removal and one addition, i.e. **false regressions and false improvements**.

## The SFTM algorithm

**SFTM** — *Similarity-based Flexible Tree Matching* — is a tree-matching algorithm from the Spirals team explained in [this article](https://hal.science/hal-03774245v1/), originally designed and validated on web DOMs. Rather than starting from tree structure, it starts from **node labels**, pruning the space of candidate matches by token similarity, and only then uses topology to propagate and refine scores.

## The streamgraph 

Once matched, pairwise matchings are fused so that a class renamed in a version remains the *same* series before and after. The result is
rendered as a [streamgraph](/differential/streamgraph): one band per class, the horizontal axis is the version sequence, and band thickness at each
version is that class's cost.

