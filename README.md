# Societies — website

The landing page, player's manual and art & audio asset list for
[Societies](https://github.com/rsantacroce/societies), a turn-based hex strategy game.

- `index.html`: landing page
- `manual.html`: how to play
- `assets.html`: every art and audio asset the game needs, each with a ready-to-paste prompt
  (also as `ASSETS.md`)

Everything here is **generated**: don't edit by hand. From the game repository run

```sh
python3 tools/gen_site.py ../societies-site
```

then commit here. To preview locally: `python3 -m http.server` in this folder.
