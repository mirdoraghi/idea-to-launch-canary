# Daily Marker specification

- ID: `DM-SPEC-01`
- Stage: `S1`
- Gate: `HG1`
- Approved limit: 40 characters (the 80-character alternative is out of scope).

## Requirements

- `R-01`: The user can save a trimmed value of 1–40 characters.
- `R-02`: Empty or whitespace-only input performs no write and exposes an accessible validation error.
- `R-03`: The saved value survives reload; clear removes it.

## Non-goals

Accounts, synchronization, backend/database storage, analytics, multi-day history, styling system, and runtime dependencies are out of scope.
