# EvoFish

Place EvoFish game files here: `apps/game/public/evofish/`

The main entry point must be `index.html`.

The game is loaded in an iframe at `/evofish/index.html`.
Game logic is NOT modified — only the iframe wrapper is part of BlackCrown.

Query params passed to the iframe:
- `quality=low|med|high`
- `t=timestamp` (cache-bust)
