# Widewater Capital — widewatercapital.com

Single-page landing splash for Widewater Capital: the logo centred on a dark steel-blue background. Plain HTML and CSS with no build step. Hosted on GitHub Pages, with the domain registered at GoDaddy.

## Structure

```
index.html                  Splash page
404.html                    Not-found page (GitHub Pages serves it automatically)
assets/css/styles.css       All styles
assets/img/logo*.png|webp   Logo cut out in light steel on a transparent background
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

## Deploying to GitHub Pages

1. **Create the repo** on GitHub, for example `widewater-capital`. GitHub Pages is free for public repos. A private repo needs a paid plan (Pro, Team or Enterprise).
2. **Push this folder:**
   ```bash
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin git@github.com:<your-username>/widewater-capital.git
   git push -u origin main
   ```
3. **Turn on Pages:** repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → Save.
4. **Custom domain:** on the same page, enter `widewatercapital.com` and save. It is already in the `CNAME` file, so it should fill in by itself.

## GoDaddy DNS

In GoDaddy, open **My Products → widewatercapital.com → DNS**:

1. **Remove** the existing `A` record for `@` (usually "Parked"), and turn off any domain forwarding.
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
4. **Edit the `CNAME` record** for `www` so it points to `<your-username>.github.io` (not the repo name). GitHub will then redirect `www.widewatercapital.com` to `widewatercapital.com`.
5. Wait for GitHub's DNS check under **Settings → Pages** to pass. That usually takes minutes but can take up to 24 hours. Then tick **Enforce HTTPS**.

**Recommended:** verify the domain at **GitHub → your profile Settings → Pages → Add a domain**. GitHub gives you a `TXT` record to add in GoDaddy, which stops anyone else from claiming the domain on GitHub Pages.

Check DNS from a terminal:

```bash
dig widewatercapital.com +noall +answer
```
