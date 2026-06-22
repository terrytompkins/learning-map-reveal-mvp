# Claude Code Expansion Prompt

You are working in a Vite + React static site that connects a React Flow learning map to Reveal.js decks.

Project conventions:

- The learning map is defined in `src/learning-map.json`.
- The React Flow app renders topics and relationships from that JSON.
- Each topic has `id`, `title`, `description`, `level`, `deck`, `slide`, and `position`.
- Reveal.js decks live in `public/decks/<deck-name>/index.html`.
- Any slide that should be addressable from the map must have a stable HTML `id`.
- Map links use the pattern `decks/<deck-name>/index.html#/<slide-id>`.
- Cross-deck links should include `returnTo` and `returnLabel` query parameters when the learner should be able to return to the originating slide.
- All learner-facing content must run as static files. Do not add a backend.

Task:

Expand the MVP by adding one new topic deck for `RAG`.

Requirements:

1. Add or update topics in `src/learning-map.json` for:
   - RAG overview
   - chunking
   - embeddings
   - retrieval
   - reranking
   - grounded generation
   - RAG evaluation
2. Create `public/decks/rag/index.html` using the same Reveal.js and shared deck navigation pattern as the existing decks.
3. Add stable slide IDs matching the `slide` values in the map JSON.
4. Add at least one vertical slide stack for a local deep dive.
5. Add at least one cross-deck link from the RAG deck to the MCP deck, preserving a return link.
6. Keep the project client-only and GitHub Pages compatible.
7. Run `npm run build` and fix any errors.

After implementation, summarize:

- files changed
- new map nodes
- new deck links
- any assumptions made
