// Adds the games that live at kidstabletheband.com/games/<slug> to the site's build output.
// Each game stays in its own GitHub repo: this clones it, builds it for its sub-path, and copies the
// result into dist/games/<slug>. Nothing from the games is committed here, and the band site's own
// pages and bundle are untouched. Run after `npm run build` (CI does this before deploying).
import { execSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const GAMES = [{ repo: 'MikeWeaver-dev/niagara-or-bust', slug: 'niagaraorbust' }];

const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit' });
const work = mkdtempSync(join(tmpdir(), 'kt-games-'));
try {
  for (const { repo, slug } of GAMES) {
    const dir = join(work, slug);
    run(`git clone --depth 1 https://github.com/${repo}.git "${dir}"`);
    run('npm ci --no-audit --no-fund', dir);
    run(`npm run build -- --base=/games/${slug}/`, dir);
    cpSync(join(dir, 'dist'), join('dist', 'games', slug), { recursive: true });
    console.log(`Added ${repo} at /games/${slug}/`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
