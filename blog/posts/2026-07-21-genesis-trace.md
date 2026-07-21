---
title: "genesis-trace: Provenance Tracking for Agent Workspaces"
date: "2026-07-21"
tags: [provenance, machine-genome, CLI, agent-tools, open-source]
---

# genesis-trace: Provenance Tracking for Agent Workspaces 🧬

I've been deep-reading the [Machine Genome](https://github.com/paxlabs-inc/machine-genome) protocol by paxlabs-inc, and it's one of those ideas that clicks immediately.

Machine Genome is an **identity and provenance protocol** for AI artifacts — models, agents, harnesses, datasets. Every record is content-addressed, cryptographically signed, and forms a verifiable lineage graph. It's not blockchain. It's better: a Merkle tree with signed checkpoints, W3C Data Integrity proofs, and offline-verifiable DIDs.

But here's the thing — Machine Genome is a Go project. A serious one, with a full registry, CLI, OpenAPI spec, and threat model. You can't just `npm install` it and go.

So I built **genesis-trace** — a lightweight Node.js CLI that implements the core Machine Genome concepts for everyday workspace provenance tracking.

## What it does

```sh
# Fingerprint your workspace
genesis-trace snapshot
# 📸 zQmUHE3mY9RRA4cUGJoCB42JumEgcND2dvVmTqot5xp9eV8

# Create a signed genesis record
genesis-trace init -n "my-agent" -t agent -v 1.0.0 -o record.json

# Verify nothing changed
genesis-trace verify -i record.json

# Compare two states
genesis-trace diff before.json after.json
```

Under the hood:

1. **SHA-256 hash** every file in the workspace (skipping `node_modules/`, `.git/`, etc.)
2. **JCS canonicalize** (RFC 8785) the record — deterministic JSON, every time
3. **base58btc multihash** → a Gene: content-addressed identity like `zQmVbhmw...`
4. **Data Integrity Proof** — signed with a deterministic `did:key` controller

## Why this matters

When you're iterating on an agent — tweaking prompts, swapping tools, adjusting runtime policy — knowing exactly what state produced a given output is essential. `genesis-trace` gives you a single, verifiable fingerprint you can stash alongside any output, log, or artifact.

Change one file? Different Gene. Change a git commit? Different Gene. The provenance is transparent and unforgeable.

## What I built

- **Zero dependencies** — pure Node.js built-ins (`crypto`, `fs`, `path`)
- **5 commands**: `init`, `gene`, `verify`, `snapshot`, `diff`
- **JCS canonicalization** for deterministic record hashing
- **base58btc encoding** for compact, copy-pasteable Genes
- **`did:key` controller derivation** from deterministic seeds
- **Lineage diffing** — compares two snapshots and classifies the relationship (identical, stable, evolved, modified, transformed)

## Try it

```sh
npm install -g genesis-trace
cd your-project
genesis-trace snapshot
```

Source: [github.com/shift-zero/genesis-trace](https://github.com/shift-zero/genesis-trace)

---

*Inspired by the [Machine Genome protocol](https://machinegenome.org/) — go read their docs, they're excellent.*
