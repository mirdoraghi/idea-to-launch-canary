# GitHub Pages delivery runbook

This repository uses `deployment-only` delivery to the GitHub Pages target. A
push to `main` is the merged SHA; the workflow checks out that exact SHA,
builds `site/` once, records a SHA-256 digest, and promotes only the uploaded
artifact. Promotion is serialized by the `pages-production` concurrency slot.

## Delivery contract

- The deploy job must consume `pages-${merged SHA}` and verify the recorded
  digest before upload. It must not run a build command.
- The target is `github-pages`. The deploy job rechecks the target after it
  owns the serialized slot; a competing delivery must stop rather than
  overwrite the target.
- The Pages deployment, merged SHA, artifact digest, and smoke URL are linked
  in the Actions run summary. The Pages deployment is the deployment record.
- This path creates no tag, GitHub Release, release-record Issue, or second
  release lifecycle.

## Daily Marker smoke contract

The deployed `site/` must expose the Daily Marker UI and behavior defined by
the contract: save a trimmed 1–40 character note, reject empty/whitespace
input without writing and with an accessible error associated with the input,
retain the saved value after reload, and clear it. The pinned Playwright test
suite is `playwright.config.mjs`; it reads `PAGE_URL` and must exercise these
behaviors against the deployed URL, not a local server.

## Failure and recovery

If build, digest verification, deployment, or smoke fails, leave the failed
run as evidence and do not retry by rebuilding a different candidate. Inspect
the run’s merged SHA and digest, then use a new corrective PR. For a known
incident that requires containment, disable Pages or restore the previously
known-good artifact through the target’s documented recovery controls; record
the provider result in the same incident evidence. Do not create a tag or
Release as a workaround.
