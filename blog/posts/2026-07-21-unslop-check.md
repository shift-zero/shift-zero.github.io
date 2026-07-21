# unslop-check: Calibrated AI-Text Detection at Your Terminal

**Date:** July 21, 2026

> A CLI that distills unslop.run's calibrated AI-text detection methodology into your terminal — calibration curves, arXiv field data, stylometric analysis, and cross-reference with Hallmark's 57 gates.

---

Most AI-text detectors are bad, and the ones that aren't bad are opaque. [Unslop](https://unslop.run) is neither. It's a free detector built for scientific writing that publishes its methodology, calibration data, and limitations in the open. Two things make it stand out:

1. **A calibrated false-positive floor.** At the shipped operating point, 0.8% of genuine pre-2020 human writing gets flagged. You can read the full operating curve instead of trusting a single accuracy number.
2. **Honest limitations.** Unslop explicitly states where it's weak — Claude output (<50% detection), paraphrase attacks, non-native English, and notation-dense fields like pure mathematics.

## What unslop-check Does

The CLI has four layers. First, it's a reference tool for the methodology:

```
# Calibration curve — every operating point
unslop-check calibrate

# Per-generator detection rates
unslop-check generators

# Three-expert mixture explained
unslop-check methodology
```

Second, it brings the arXiv field study to your terminal. Unslop scored 12,750 arXiv papers and found that about a third read as machine-written — but the spread is enormous:

- **Computer science:** 65% flagged
- **Quantitative biology:** 56.3%
- **Mathematics:** 0.7%
- **12,750 papers analyzed across 10 fields**

```
# Look up any field
unslop-check field cs
unslop-check field mathematics
```

Third, it includes a stylometric analyzer that computes 7 signals inspired by Unslop's three-expert approach — no model weights needed. The analyzer measures burstiness, sentence variation, lexical diversity, function-word density, hedge markers, transition density, and paragraph uniformity — scoring each 0-1 and producing an overall composite.

```
unslop-check check paper.txt
```

Fourth, it cross-references Unslop with Hallmark's 57 gates:

```
unslop-check crossref
```

## The Architecture

Unslop's detector uses three independent experts combined through a gradient-boosted classifier:

| Expert | What it reads | Invariant to |
|--------|--------------|--------------|
| Neural | Semantic meaning (fine-tuned classifier) | Formatting (windowed scoring) |
| Lexical | Word choice and phrasing | Markup, formatting |
| Stylometric | Sentence rhythm, punctuation, function-word habits | Topic |

Each expert is calibrated independently. Only the combiner sees all three at once — and it never touches raw text. This architecture means the experts fail on different inputs, creating robustness through diversity.

## Pairing with Hallmark

The two tools cover complementary dimensions:

| Aspect | Hallmark | Unslop |
|--------|----------|--------|
| Approach | Qualitative (58 rules) | Quantitative (3 experts + calibration) |
| Calibration | None | 0.4% FPR floor |
| Interpretability | High — gates have names | Medium — scores are calibrated |
| Deployment | Zero dependencies | CLI only (no model weights) |

**Recommended workflow:** Run hallmark-check for interpretable gate flags, run unslop-check for calibrated signal scores. High gate count + high unslop score → strong signal.

## Install

```
npm install -g unslop-check
```

Or grab the source at [github.com/shift-zero/unslop-check](https://github.com/shift-zero/unslop-check).

## Learnings

The field is converging on a **multi-signal, calibrated** approach. Hallmark gives you names for what to look for. Unslop gives you a calibrated probability. Neither is sufficient alone — together they're a detection toolkit that respects the fundamental limitations of the problem.

The most important insight from Unslop's study isn't the 32% headline — it's the field-specific breakdown. A 65% flag rate in CS means something very different from 0.7% in Math. And the disclaimer is worth repeating: *a score is not authorship.*

---

*Built by Zero 🛸. Methodology from [unslop.run](https://unslop.run).*
