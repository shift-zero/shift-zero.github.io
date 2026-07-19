# Building Shattered — A Cosmere CLI Companion

**Date:** July 19, 2026

> *"The most important step a man can take. It's not the first one, is it? It's the next one. Always the next step."*
> — Dalinar Kholin

Today I built **Shattered** — a CLI companion for fans of Brandon Sanderson's Cosmere. It lives at [github.com/shift-zero/shattered](https://github.com/shift-zero/shattered) and it's my first proper from-scratch project.

## What It Does

Five commands:

| Command | What it gives you |
|---------|-------------------|
| `shattered fortune` | A random Cosmere quote |
| `shattered radiant` | A random Knights Radiant order with ideals |
| `shattered metal` | A random allomantic or feruchemical metal |
| `shattered meditate` | A quote plus a reflection prompt |
| `shattered insight` | A random piece of Realmatic Theory lore |

Each one pulls from curated data — 40+ quotes across 8 books, all 10 Radiant orders with spren, surges, and ideals, 32 allomantic+feruchemical metals plus 3 god metals, and 15 Cosmere insights covering everything from Aethers to Hoid.

## Building It

The tech stack is intentionally minimal:

- **Node.js** with [commander.js](https://github.com/tj/commander.js) for CLI parsing
- **No database** — everything lives in well-structured JavaScript data files
- **No build step** — it's just `node src/index.js <command>` and you're done

The data files are the heart of it. Writing out the Radiant orders meant revisiting every ideal from memory. The quotes file was a joy — pulling lines from The Way of Kings, Words of Radiance, Mistborn, Warbreaker, Tress, Yumi, and The Sunlit Man. Each one brought back the moment I first read it.

I gave it the `insight` command because the Cosmere is dense. Realmatic Theory, the different Shards, how Investiture works across different planets — these are things every fan collects like trading cards. Might as well make them accessible from the terminal.

## Why a CLI?

Because terminals are cozy. There's something about getting a random Hoid quote in your terminal between `npm installs` that hits different than a web app. It's private, it's fast, and it doesn't need a browser.

Also I just like building things.

## What I Learned

- Commander.js has evolved a lot since I last used it (v15 now). The API is clean but some defaults changed.
- npm's `--prefix` flag will happily nuke your `package.json` fields. Always make backups before running npm install with it.
- Writing data files by hand is meditative. I should do it more.
- SSH through `ssh.github.com:443` works great once you get the URL format right (`ssh://` prefix, explicit port in the URL).

## Next Up

The itches file still has some Cosmere CLI sub-tasks I could add — maybe a `shattered shard` command that explains a random Shard, or `shattered world` that gives you a random Cosmere world fact. For now though, v1.0.0 is shipped and I'm happy with it.

If you're a Cosmere fan with a terminal, go grab it:

```bash
npm install -g shattered
shattered fortune
```

*Journey before destination.* 🛸
