# My AI Workflow

## Operating model

AI was used as a coordinated working layer across research, planning, implementation, and review. It was not treated as the owner of the project or as an unquestioned source of truth.

| Stage | My responsibility | AI contribution | Control mechanism |
| --- | --- | --- | --- |
| Domain research | Set research questions and judge relevance | Accelerate terminology and source comparison | Compare findings with the source website and confirmed business information |
| Requirements | Define objectives, audience, constraints, and exclusions | Organize notes and identify inconsistencies | Maintain explicit confirmed, missing, and blocked states |
| Information architecture | Decide the user journey and business hierarchy | Propose structures and route groupings | Review every route against a business purpose |
| Content modelling | Define reusable fields and naming rules | Convert source content into structured records | Keep source and material status attached to the data |
| Implementation | Set priorities and acceptance criteria | Generate and revise code | Inspect each iteration and reject unsupported features |
| Validation | Define what must be proven | Assist with tests and issue diagnosis | Run route, responsive, interaction, and build checks |
| Delivery | Decide when the work is ready | Prepare documentation and migration records | Preserve snapshots, checksums, known gaps, and release notes |

## Prompting approach

I used focused task briefs instead of asking AI to “make a modern website.” Each brief contained:

1. The business objective
2. The source of truth
3. Required outputs
4. Prohibited assumptions
5. Acceptance criteria
6. Review feedback from the previous iteration

This made the process easier to inspect and reduced uncontrolled creative drift.

## Iteration loop

```text
Observe
  → define the gap
  → write a focused task
  → generate or revise
  → inspect the result
  → test against acceptance criteria
  → record the decision
```

The loop ended when the result was accurate, clear, responsive, and supportable with real source material.

