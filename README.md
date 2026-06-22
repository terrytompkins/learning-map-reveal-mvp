# Learning Map + Reveal.js MVP

This is a client-only MVP for a learning experience that connects an interactive React Flow concept map to topic-focused Reveal.js decks.

The prototype demonstrates this navigation pattern:

```text
Mindmap → specific topic slide → vertical deep dive or related deck → return link → map
```

## What is included

- A Vite + React app that renders the learning map using `@xyflow/react`.
- A shared `src/learning-map.json` file that defines concepts, positions, deck names, slide IDs, and relationships.
- Three static Reveal.js decks under `public/decks/`:
  - `genai`
  - `agents`
  - `mcp`
- Static cross-deck links with return navigation.
- A GitHub Pages deployment workflow.

## Local development

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Production build

```bash
npm run build
npm run preview
```

The static site will be generated in `dist/`.

## GitHub Pages deployment

1. Create a new GitHub repository.
2. Copy this project into the repository.
3. Commit and push to the default branch.
4. In GitHub, go to **Settings → Pages**.
5. Set the source to **GitHub Actions**.
6. The included workflow in `.github/workflows/deploy.yml` will build and publish the site.

The project uses `base: './'` in `vite.config.ts`, so the built asset paths should work on GitHub Pages project sites without knowing the repository name ahead of time.

## How the map links to slides

Each topic in `src/learning-map.json` has this shape:

```json
{
  "id": "tool-calling",
  "title": "Tool Calling",
  "deck": "agents",
  "slide": "tool-calling",
  "position": { "x": 820, "y": -105 }
}
```

The React app turns that into a link like this:

```text
decks/agents/index.html#/tool-calling
```

Reveal.js uses the hash to navigate directly to the slide whose section has the matching ID:

```html
<section id="tool-calling">
  ...
</section>
```

## How cross-deck return navigation works

A link from the Agents deck to the MCP deck can include a return target:

```html
<a href="../mcp/index.html?returnTo=../agents/index.html%23/mcp-bridge&returnLabel=Return%20to%20Agents#/intro">
  Open the MCP deck
</a>
```

Each deck includes `public/decks/shared/deck-nav.js`, which reads `returnTo` and shows a return link when one is present.

## Design conventions

Use these rules to keep the content navigable:

1. Use the mindmap for orientation and topic selection.
2. Use horizontal Reveal.js slides for the main teaching path.
3. Use vertical slides for a local deep dive that only needs a few slides.
4. Create a separate deck when a topic is broad enough to become its own learning path.
5. Every deck should include a `Map` link.
6. Every cross-deck link should include a `returnTo` target.

## Next useful enhancements

- Generate deck scaffolds from `learning-map.json`.
- Add breadcrumbs based on the concept graph.
- Add a search box over topics and slide IDs.
- Add a local-only progress marker using browser `localStorage`.
- Add print/export affordances for learners who want a linear handout.
- Add a schema validation script for `learning-map.json`.

## Notes

This MVP intentionally avoids a backend. It does not track users, store progress on a server, or require authentication.

Reveal.js assets are loaded from jsDelivr in the deck HTML files. The map app dependencies are bundled by Vite during build.
