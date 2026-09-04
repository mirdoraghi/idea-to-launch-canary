# Canary interruption and recovery protocol

This runbook uses observed repository and GitHub evidence. It must not create another intentionally defective revision merely to repeat an already demonstrated failure.

## Accepted observed scenarios

The Canary audit must verify these provider records:

- PRs were blocked by branch protection until `PR CI / repository integrity` completed successfully.
- Post-merge delivery run `33926528488` failed during its build boundary.
- The failed run did not produce or promote a deployable Pages artifact.
- Recovery corrected the delivery contract from `site/` to `dist/`.
- GitHub Pages uses Actions and the `github-pages` environment exists.

These facts must be rechecked from GitHub before being used as acceptance evidence. A URL or historical statement alone is insufficient.

## Session-boundary test

Task 3.2.1 starts in a fresh Codex execution. It reconstructs implementation context only from canonical repository artifacts:

- Daily Marker manifest and product documents
- workflow and review policies
- repository evidence and runbooks
- GitHub Issue and PR state

Chat transcripts are not resume state. Record the files and provider state used, the reconstruction start and finish time, and whether usable context was recovered within ten minutes.

## Implementation safety

The current Canary revision must be implemented with green deterministic checks. Do not introduce another deliberate production defect.

Before merge:

- verify the Issue is ready and unblocked;
- assign the single operator and apply `flow:in-progress`;
- reread the Issue and stop before branch creation if assignee or flow state is no longer canonical;
- concurrent claiming remains unsupported;
- run lint, tests, audit, and build;
- require the protected PR check to pass.

## Delivery evidence

Task 3.2.2 must record:

- merged SHA;
- required-check result;
- immutable artifact digest;
- Pages deployment URL;
- HTTP marker smoke result;
- browser acceptance results;
- confirmation that deployment used the artifact built from the merged SHA without rebuilding.

## Failure handling

Any new unexpected failure is preserved with its run URL, SHA, boundary, root cause, and owner. It must be corrected through a new revision and must not be bypassed. No artificial failure is required unless the existing evidence cannot be verified.
