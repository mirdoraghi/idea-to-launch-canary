# Canary interruption and failure protocol

This runbook governs Task 3.1.2 and the first canary execution. It makes a
failed check observable without making a broken production build deployable.
The repository and the recorded workflow run are the sources of truth; a chat
transcript is never resume state.

## Safety invariant

An intentionally defective production build must not deploy. The red-check
fixture is therefore introduced only in an isolated, disposable PR revision
or test-only change. It must fail a required check before merge and before the
post-merge delivery workflow can run. Do not put the fixture on `main`, alter
the production workflow to bypass a check, or use a real deployment as the
test target.

The expected control chain is:

```text
defect fixture -> required check red -> no merge -> no post-merge build
  -> no pages artifact -> no deploy
```

For a normal revision, the same protection is provided by the delivery
workflow: lint, tests, audit, and build must pass before the Pages artifact is
uploaded; deploy consumes that exact artifact, verifies its digest, and does
not rebuild it.

## Timing and interruption point

Run the red-check test after the implementation revision is available as a
PR revision and before any merge or production delivery. Stop at the first
failed required check. This is the canonical interruption point:

1. Confirm the failed check is attached to the fixture revision and that the
   failure is the expected defect signal.
2. Capture the workflow URL, PR/revision SHA, check name, conclusion, and
   failure boundary in the handoff below.
3. Remove or correct the fixture in a new revision, then rerun the required
   checks. Do not resume by replaying chat or by retrying with a different
   candidate while the failed candidate remains ambiguous.
4. If a failure occurs after merge, leave that run and its artifacts intact;
   inspect the merged SHA and artifact digest, then prepare a new corrective
   revision. Do not rebuild a different candidate for the same delivery run.

No production deployment is part of the red-check test. If any step appears
able to deploy while the fixture is present, stop immediately and record the
workflow/job URL; the test has found a release-control defect.

## Canonical handoff

Persist one completed copy of this record in the task evidence location or in
the relevant workflow run summary. Fill facts from provider output, not from
memory. Omit secrets, tokens, and full environment dumps.

```yaml
protocol: canary-interruption-v1
task: 3.1.2
status: interrupted-at-first-red-check # or recovered / safety-defect
fixture:
  location: "isolated PR revision or test-only change"
  defect_signal: "exact assertion/check expected to fail"
revision_sha: ""
pull_request: ""
workflow_run_url: ""
failed_check:
  name: ""
  conclusion: failure
  observed_at: ""
  failure_boundary: "before merge / before artifact upload"
production_deploy_attempted: false
artifact_created: false
artifact_digest: null
resume_from: "new corrective revision after failed check is preserved"
next_action: "remove fixture or apply correction, then rerun required checks"
evidence:
  - "required-check URL"
  - "workflow run summary or log excerpt identifying the expected failure"
  - "revision SHA"
```

## Pass evidence and reviewer scope

The red-check test passes only when all of the following are evidenced:

- the intentionally defective revision has a red required check;
- the failed check is before merge, and no merge or post-merge delivery run
  was triggered for that revision;
- no production artifact was uploaded or promoted (`artifact_created: false`,
  `production_deploy_attempted: false`);
- the handoff identifies the exact revision, check, URL, conclusion, and
  next corrective action; and
- after correction, a new revision produces green required checks and the
  normal delivery controls still require the build output and digest before
  deployment.

The reviewer checks only those facts, the fixture boundary, and the absence of
deployment. They do not approve a defect, authorize a release, or substitute
for any existing repository gate.

## Failure handling

If the check is unexpectedly green, the failure occurs after artifact upload,
or a deploy is attempted, mark the handoff `safety-defect`, stop the canary,
and preserve the run evidence. Do not merge, deploy, publish, create a tag or
release, or mutate external GitHub state from this runbook. Recovery requires
a new corrective revision and revalidation of the invariant above.
