# cearl.cc (Homepage)

Minimalist personal index site (Concept B: Typographic Focus).

## Develop

```bash
npm install
npm run dev
```

## Edit content

- `src/data/profile.ts`: statement / email / GitHub
- `src/data/projects.ts`: featured + archive projects

## Deploy

This repo deploys via GitHub Pages (Actions) to the custom domain `cearl.cc`.

Notes:
- `npm run build` also copies `CNAME`, `robots.txt`, `404.html` into `dist/` and writes `.nojekyll`.
