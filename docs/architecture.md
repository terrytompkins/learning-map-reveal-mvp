# Architecture Notes

## Goal

Prove that a learning map can act as a high-level concept navigator while Reveal.js decks provide the guided teaching experience.

## Constraints

- No backend for learners.
- Static hosting friendly.
- GitHub Pages compatible.
- Map nodes can deep-link to a deck and slide.
- Slides can link to related decks.
- Related deck links can include a return path.

## Runtime pieces

### 1. React Flow map

The root app is a Vite + React application. It renders `src/learning-map.json` as React Flow nodes and edges.

The map is currently hand-positioned by the `position` field in each topic. That keeps the MVP simple and avoids adding a graph layout dependency.

### 2. Learning map JSON

`src/learning-map.json` is the shared content/navigation model.

In a later version, this should become the source of truth for:

- map nodes
- map edges
- deck scaffolds
- breadcrumbs
- related topic panels
- validation checks

### 3. Reveal.js decks

Decks live under `public/decks/<deck-name>/index.html`. Vite copies everything in `public/` into the final static build.

Each slide that should be directly addressable gets a stable `id`:

```html
<section id="tool-calling">
  ...
</section>
```

The map links to that slide with a Reveal hash:

```text
decks/agents/index.html#/tool-calling
```

### 4. Return navigation

Cross-deck links may include a return target:

```text
../mcp/index.html?returnTo=../agents/index.html%23/mcp-bridge#/intro
```

The shared `deck-nav.js` reads `returnTo` and creates a dynamic return button.

## MVP decisions

### Why not use a backend?

Static files are enough for concept navigation, slide rendering, and return links. A backend would only be needed later for accounts, progress, analytics, collaboration, or server-side content generation.

### Why not use React Router?

GitHub Pages can make client-side route refreshes awkward. This MVP uses ordinary static file paths and Reveal hash routing instead.

### Why hand-code Reveal decks?

Hand-coded decks make the navigation pattern easy to inspect. Once the pattern is proven, a generator can create deck scaffolds from `learning-map.json`.

## Suggested next iteration

1. Add a schema validation script for `learning-map.json`.
2. Add search/filtering to the map.
3. Add local progress state with `localStorage`.
4. Add a deck template generator.
5. Add a Claude Code prompt that expands a topic into a new deck while preserving navigation conventions.
