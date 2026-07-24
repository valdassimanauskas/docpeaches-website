# Dr. Peaches — Website

Static site for docpeaches.com. No build system or server required — every page is plain HTML/CSS/JS. Open `index.html` in a browser to preview, or upload the whole `website/` folder to any static host (Netlify, Vercel, Cloudflare Pages, shared hosting).

## Structure

- `index.html` — homepage ("Helping People Stay In The Game")
- `about.html`, `consultation.html`, `contact.html` — core pages (hand-written)
- `conditions/` — 108 condition pages + hub index, generated from `02 - INDICATIONS (Valdas)/`
- `treatments/` — 36 procedure pages + hub index, generated from `03 - PROCEDURES & MODALITIES (Valdas)/`
- `css/style.css` — design system (palette + typography from the brand kit)
- `js/main.js` — nav, scroll reveals, mobile menu, contact form handoff
- `assets/img/` — processed brand photos and logo marks

## Regenerating content pages

When any docx in the INDICATIONS or PROCEDURES folders changes, re-run from the Docpeaches folder:

```
python build.py
```

It re-converts every docx (headings, lists, paragraphs) into the styled page template and rebuilds the two hub indexes. Hand-written pages are not touched.

## Notes

- The contact form has no backend yet — submitting opens the visitor's email client pre-addressed to info@docpeaches.com. Swap in Formspree/Netlify Forms/etc. for real submissions.
- The Education section (articles/videos/research) from the sitemap is not built yet — no source content exists for it.
- Fonts load from Google Fonts (Cormorant Garamond + Montserrat).
