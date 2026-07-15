# Graph Report - .  (2026-07-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 272 nodes · 370 edges · 55 communities (9 shown, 46 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c67d1ac6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54

## God Nodes (most connected - your core abstractions)
1. `cn()` - 34 edges
2. `compilerOptions` - 16 edges
3. `Button()` - 10 edges
4. `Card()` - 7 edges
5. `CardContent()` - 7 edges
6. `tailwind` - 6 edges
7. `aliases` - 6 edges
8. `Config` - 6 edges
9. `include` - 6 edges
10. `CardHeader()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  components/ui/card.tsx → lib/utils.ts
- `FooterProps` --references--> `Config`  [EXTRACTED]
  components/footer.tsx → lib/types.ts
- `NavbarProps` --references--> `Config`  [EXTRACTED]
  components/navbar.tsx → lib/types.ts
- `Badge()` --calls--> `cn()`  [EXTRACTED]
  components/ui/badge.tsx → lib/utils.ts
- `Button()` --calls--> `cn()`  [EXTRACTED]
  components/ui/button.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (55 total, 46 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (25): CatalogSectionProps, FooterProps, GameSectionProps, HeroSectionProps, NavbarProps, GameObject, PlatformGameProps, ServicesSectionProps (+17 more)

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (20): QuoteFormProps, DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay(), DialogTitle(), Input(), Label() (+12 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (29): ./*, dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+21 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (25): devDependencies, postcss, tailwindcss, @tailwindcss/postcss, tw-animate-css, @types/node, @types/react, @types/react-dom (+17 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 5 - "Community 5"
Cohesion: 0.18
Nodes (12): next-themes, dependencies, next-themes, @radix-ui/react-collapsible, @radix-ui/react-menubar, @radix-ui/react-slot, @radix-ui/react-tabs, @radix-ui/react-toast (+4 more)

### Community 6 - "Community 6"
Cohesion: 0.33
Nodes (4): geistMono, metadata, orbitron, viewport

### Community 7 - "Community 7"
Cohesion: 0.40
Nodes (4): GallerySectionProps, Dialog(), DialogContent(), GaleriaImagen

## Knowledge Gaps
- **115 isolated node(s):** `orbitron`, `geistMono`, `metadata`, `viewport`, `$schema` (+110 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 5` to `Community 3`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 20`, `Community 21`, `Community 22`, `Community 23`, `Community 24`, `Community 25`, `Community 26`, `Community 27`, `Community 28`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 36`, `Community 37`, `Community 38`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`?**
  _High betweenness centrality (0.202) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 1` to `Community 0`, `Community 7`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `orbitron`, `geistMono`, `metadata` to the rest of the system?**
  _115 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07801418439716312 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.12701612903225806 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._