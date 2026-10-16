# Swopify landing

Published at https://panstrilka.github.io/swopify-landing/ using GitHub Pages from the root of `main`.

The phone and tablet composition (up to 900 px) lives in `Mobile.jsx` and `mobile.css`. It shares the original camera, map and locker artwork with the desktop landing. The camera story uses native scrolling without a scroll lock; the swap is an optional interactive demo. Reduced motion preferences, safe area insets, short screens and keyboard navigation are supported.

## Build

Install the dependencies from `pnpm-lock.yaml` with `pnpm install --frozen-lockfile`, then run `pnpm build`. Commit the generated `app.js`, updated cache versions in `index.html`, and the `vendor/` files alongside the sources. GitHub Pages serves these files directly; no workflow or runtime JSX compiler is needed.

`build.mjs` compiles each JSX module in its own scope and copies the official React production UMD files. React's license is in `vendor/REACT-LICENSE.txt`. `photo-headphones.webp` is the 640 px optimized version used in both layouts; the original PNG remains available as source artwork.

## Validation

Visually checked at 320 × 568, 375 × 667, 390 × 844, 430 × 932, 768 × 1024 and 1365 × 900. Checked camera/photo transitions, interactive swap and replay, both delivery tabs, anchors, image loading, horizontal overflow and console errors. Reduced motion styles and logic are included; validation was in browser viewports rather than physical phones.

The exchange on this landing is a demonstration. Mobile calls to action point to that demonstration; they do not submit listings or claim that an app-store destination is connected.
