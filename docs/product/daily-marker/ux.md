# Daily Marker UX note

- ID: `DM-UX-01`
- Stage: `S3`
- Gate: `HG2`
- Risk flag: `ux`

## States and outcomes

- Empty: no saved note is shown; the input is available for entry.
- Valid submit: the trimmed note is saved and displayed.
- Invalid submit: no storage write occurs; an error is exposed programmatically, associated with the input, and focus remains on or returns to the invalid input.
- Clear: the saved note is removed and the empty state returns.

- `UX-ERR-01`: validation error is available to assistive technology.
- `UX-ERR-02`: validation error is associated with the invalid input.
- `UX-ERR-03`: invalid submit leaves focus on or returns focus to the invalid input.

This note specifies observable outcomes, not an implementation technique.
