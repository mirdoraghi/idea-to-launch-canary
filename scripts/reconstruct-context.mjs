import { readFile } from 'node:fs/promises';
const canonical = ['docs/manifests/daily-marker.yaml', 'docs/product/daily-marker/spec.md', 'docs/product/daily-marker/ux.md', 'docs/product/daily-marker/architecture-recovery.md', 'docs/runbooks/canary-interruption.md', 'docs/evidence/github-gates.md'];
const started = Date.now();
for (const file of canonical) await readFile(file, 'utf8');
console.log(JSON.stringify({ canonical, recovered: true, elapsedMs: Date.now() - started, transcriptUsed: false }));
