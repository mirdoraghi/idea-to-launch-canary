# GitHub merge and deploy gates evidence

Task: Roadmap 2.2.3 — merge/deploy gates
Repository: `mirdoraghi/idea-to-launch-canary`
Status: completed

## Verified provider controls

- Default branch: `main`
- Branch protection: enabled
- Required check: `PR CI / repository integrity`
- Strict required checks: enabled
- Administrator enforcement: enabled
- Required approving reviews: zero for the solo-bootstrap baseline
- Force pushes: disabled
- Branch deletion: disabled
- Linear history: required
- GitHub Pages build type: `workflow`
- Deployment environment: `github-pages`

## Delivery readiness

The post-merge workflow uses Node.js 24 and the approved command contract:

- `npm ci`
- `npm run lint`
- `npm test`
- `npm audit --omit=dev --audit-level=high`
- `npm run build`

The deployable directory is `dist/`. Delivery is triggered only when Canary application or build inputs change, preventing premature deployment before the application scaffold exists.

No successful production deployment is claimed yet. End-to-end deployment evidence remains part of the Canary implementation and acceptance tasks.
