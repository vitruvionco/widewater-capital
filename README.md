# Widewater Capital — widewatercapital.com

Single-page landing site for Widewater Capital: the logo on a dark steel-blue background, then a few short parallax-scrolling sections. Plain HTML, CSS and a small script, with no build step. Hosted on GitHub Pages, with the domain registered at GoDaddy.

## Structure

```
index.html                  Home page: logo hero, statement, image band, three pillars
404.html                    Not-found page (GitHub Pages serves it automatically)
assets/css/styles.css       All styles
assets/js/main.js           Parallax + scroll fade-ins (off when the visitor prefers reduced motion)
assets/img/logo*.png|webp   Logo cut out in light steel on a transparent background
assets/img/monogram.*       "WC" monogram for the watermark and footer
assets/img/bg-*.jpg|webp    Estuary photo as a steel-blue duotone (800/1280/1672px)
assets/img/og-image.jpg     Preview image shown when the link is shared
assets/img/*icon*, favicon  Browser and home-screen icons (WC monogram)
favicon.ico                 Fallback favicon
CNAME                       Tells GitHub Pages to serve the site at widewatercapital.com
.nojekyll                   Serve files as-is (skip GitHub's Jekyll processing)
robots.txt, sitemap.xml     Search engine basics
Estuary.png                 Original photo (kept locally, git-ignored)
Widewater Capital Logo.png  Original logo (kept locally, git-ignored)
```

The images in `assets/img` were generated from the two source files. If the logo or photo changes, regenerate them, or ask Claude to.

## Preview locally

```bash
python3 -m http.server 8742
```

Then open http://localhost:8742.

## Hosting

- **Repo:** https://github.com/vitruvionco/widewater-capital (public, branch `main`)
- **GitHub Pages:** deploys from `main`, folder `/ (root)`, with custom domain `widewatercapital.com`
- **Settings:** https://github.com/vitruvionco/widewater-capital/settings/pages

To update the site, commit to `main` and push. GitHub redeploys in about a minute.

## GoDaddy DNS

In GoDaddy, open **My Products → widewatercapital.com → DNS**:

1. **Remove** the two existing `A` records for `@` (`76.223.105.230` and `13.248.243.5`, GoDaddy's parking/site-builder addresses). Turn off any domain forwarding, and disconnect any GoDaddy Website Builder site from the domain.
2. **Add four `A` records**, Name `@`:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. **Add four `AAAA` records** (IPv6), Name `@`:
   ```
   2606:50c0:8000::153
   2606:50c0:8001::153
   2606:50c0:8002::153
   2606:50c0:8003::153
   ```
4. **Edit the `CNAME` record** for `www` so it points to `vitruvionco.github.io` (it currently points to `@`). GitHub will then redirect `www.widewatercapital.com` to `widewatercapital.com`.
5. Wait for GitHub's DNS check under **Settings → Pages** to pass. That usually takes minutes but can take up to 24 hours. Then tick **Enforce HTTPS**.

**Recommended:** verify the domain at **GitHub → your profile Settings → Pages → Add a domain**. GitHub gives you a `TXT` record to add in GoDaddy, which stops anyone else from claiming the domain on GitHub Pages.

Check DNS from a terminal:

```bash
dig widewatercapital.com +noall +answer
```
