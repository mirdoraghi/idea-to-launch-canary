# Daily Marker architecture, impact, and recovery

- ID: `DM-ARCH-01`
- Stage: `S4`
- Gate: `HG3`
- Boundary: browser UI and browser `localStorage`; no server boundary.

## Failure and recovery

- Storage unavailable or write fails: show an accessible error, do not claim persistence, and retain the user-entered value in the current UI where possible.
- Malformed stored value: ignore it and return to the empty state.
- Deployment failure or failed smoke: stop promotion and either roll back to the previous verified artifact digest or disable Pages. HRO owns that decision.

## Delivery and validation

- Target: GitHub Pages, deployment-only.
- Build: deterministic static build from the merged SHA; deploy the same artifact digest.
- Validation: automated checks plus smoke for load, trimmed save, reload persistence, whitespace rejection, and clear.
- Recovery authority: HRO; trigger is failed deployment/smoke; validate by target health and the five smoke behaviors before resuming.
