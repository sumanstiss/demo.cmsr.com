PUBLISHING.md

This file documents how this repository is published to GitHub Pages and how to publish locally.

Overview
- This repository is configured to build with Vite and publish the generated `dist/` folder to the `gh-pages` branch using a GitHub Actions workflow (`.github/workflows/gh-pages.yml`).
- The CI workflow runs on every push to `main` and performs: install -> optimize images -> build -> publish to `gh-pages`.

Quick checks before publishing
- Ensure `vite.config.js` has the correct `base` value. For GitHub Pages this repo uses:
  - `base: '/demo.cmsr.com/'` (change if your repo name or owner differs)
- Confirm `package.json` has these scripts:
  - `"build": "vite build"`
  - `"predeploy": "npm run build"`
  - `"deploy": "gh-pages -d dist"`
  - `"optimize:images": "imagemin \"public/**/*.{jpg,jpeg,png,svg,gif}\" --out-dir=public"`

Automatic publish (recommended)
1. Commit and push to `main`:

```bash
git add -A
git commit -m "Prepare site for GitHub Pages"
git push origin main
```

2. Open the repository on GitHub and go to the Actions tab to watch the `Deploy to GitHub Pages` workflow run. It will publish `dist/` to the `gh-pages` branch.
3. Expected public URL (replace `OWNER` if needed):

```
https://sumanstiss.github.io/demo.cmsr.com/
```

Local publish (optional)
1. Install dependencies locally (if not already):

```bash
npm install
```

2. Optimize images (optional):

```bash
npm run optimize:images
```

3. Build and publish:

```bash
npm run predeploy
npm run deploy
```

This uses the `gh-pages` package to push `dist/` to `gh-pages`.

Custom domain
- To use a custom domain, add a `CNAME` file at the project root (or in `dist/` before publishing) containing your domain (e.g., `www.example.com`).
- After the site is published, add the DNS records required by GitHub Pages for the custom domain.

Troubleshooting
- 404 / assets not found:
  - Check `vite.config.js` `base` setting. If your site is published at `https://OWNER.github.io/REPO/` then `base` must be `'/REPO/'`.
  - Confirm the workflow published to `gh-pages` (check the `gh-pages` branch contents in GitHub).
- Actions failing to publish:
  - Inspect the Actions logs (Actions tab). The workflow uses the default `GITHUB_TOKEN` so no extra secrets are required.
- Local `npm run deploy` fails:
  - Ensure you have permission to push to the repo and that your `git` user is configured.
- Fonts or CSS issues after publish:
  - Verify `index.html` and `src/index.css` references use absolute paths that match the `base`. Vite builds assets with hashed filenames—if you changed `base` after building, rebuild.

Optimizations & next steps
- Images: convert large images to WebP and add responsive `srcset` to reduce bandwidth.
- SVGs: run `svgo` to shrink SVG files.
- Analytics & SEO: add Open Graph and meta tags to `index.html`.
- Cache headers: when using a CDN or custom host, set long cache TTL for hashed assets and shorter for `index.html`.

Contact
- If you want, I can add an Action that converts images to WebP and keeps fallbacks, or I can add a `PUBLISHING.md` section for custom domain setup with sample DNS records.
