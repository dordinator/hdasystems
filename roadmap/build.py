#!/usr/bin/env python3
"""Builds a self-contained A4 HTML roadmap for HDA Systems, then it is printed to PDF via Chrome."""
import html, os

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_CSS = open(os.path.join(HERE, "fonts", "embedded.css"), encoding="utf-8").read()

SITE = "hdagrowthsystems.co.uk"
PRICE = "Website + Lead System — £299/month"

WELCOME = ("Your step-by-step growth plan for the next six months. Month One builds "
           "your full foundation — website, lead capture, CRM, and initial SEO. From "
           "Month Two, we shift into ongoing SEO reviews, improvements, and reporting "
           "to keep your results growing.")

MONTHS = [
    {
        "n": "One", "phase": "Full System Setup & Foundation",
        "items": [
            ("Kick-Off Call & Offer Review", "We confirm goals, timeline, and strategy, then map your services and customer journey."),
            ("Website & Lead Capture Build", "We build out services, trust, proof, FAQs, quotes, booking, forms, calls, and enquiry flow."),
            ("CRM & Follow-Up Automation", "We set up your CRM pipeline, missed-call text-back, and review request flow."),
            ("Foundational SEO", "We research keywords and optimise titles, descriptions, and your Google Business Profile."),
            ("Tracking, Backups & Security", "We install analytics and Search Console, back up the site, and set up uptime monitoring."),
            ("Indexing & Directory Listings", "We submit your sitemap for indexing and list your business on major directories."),
            ("Launch Health Check", "We test the full visitor-to-enquiry journey end to end and fix any friction points."),
            ("Summary of Work", "A clear, plain-English summary of everything set up this month."),
        ],
    },
    {
        "n": "Two", "phase": "SEO Foundations & On-Page Optimisation",
        "items": [
            ("Homepage Content Optimisation", "We refine your homepage content for maximum visitor engagement and conversion."),
            ("Optimise High-Value Internal Pages", "We optimise your key service and location pages for the terms that drive the most enquiries."),
            ("Schema Structured Data Markup", "We implement schema markup so search engines understand your website content more clearly."),
            ("Indexing & Baseline Performance Report", "We confirm indexing is working correctly and report on your baseline SEO metrics."),
            ("Monthly SEO Performance Report", "We report on rankings, traffic, and visibility progress, with clear priorities for next month."),
            ("Provide Summary of Work", "We summarise completed work so progress stays visible and transparent."),
        ],
    },
    {
        "n": "Three", "phase": "Content Expansion & Reputation Building",
        "items": [
            ("Additional Internal Pages Optimised", "We optimise a further set of key pages for targeted keywords and search relevance."),
            ("Image Alt Tags & Accessibility", "We improve image alt tags and address accessibility issues to help both users and search engines."),
            ("Backlink Profile Analysis", "We review your inbound link health and address any toxic links affecting your rankings."),
            ("Google Review Campaign", "We send review requests by email or text after jobs, appointments, or completed projects."),
            ("Business Directory Resubmission", "We keep your directory listings fresh and consistent for maximum impact."),
            ("Monthly SEO Performance Report", "We report on rankings, traffic, and visibility progress, with key metrics and next steps."),
            ("Provide Summary of Work", "We summarise completed work so progress stays visible and transparent."),
        ],
    },
    {
        "n": "Four", "phase": "Site Health & Campaign Overview",
        "items": [
            ("SEO & Website Health Check", "We monitor SEO progress and adjust for any unexpected Google or website changes."),
            ("Optimisation Campaign Overview", "With the core optimisation complete, we present a full overview for your feedback and alignment."),
            ("Business Directory Resubmission", "We keep your directory listings fresh and consistent for maximum impact."),
            ("Monthly SEO Performance Report", "We report on rankings, traffic, and visibility progress, with key metrics and next steps."),
            ("Provide Summary of Work", "We summarise completed work so progress stays visible and transparent."),
        ],
    },
    {
        "n": "Five", "phase": "Campaign Analysis & Conversion Improvements",
        "items": [
            ("Intensive Campaign Analysis", "We take a deep dive into performance so far, uncovering wins and areas to improve."),
            ("Content Plan Assessment & Scope", "We assess and adapt the content plan based on ongoing performance and audience needs."),
            ("Keyword Targeting & Performance Review", "We review and refine targeted keywords for the best possible search visibility."),
            ("Website Conversion Review", "We review key pages and improve weak headlines, calls-to-action, and trust points."),
            ("Social Media / SEO Integration", "We connect your social channels with your SEO strategy for more prominent visibility."),
            ("SEO & Website Health Check", "We monitor SEO progress and adjust for any unexpected Google or website changes."),
            ("Monthly SEO Performance Report", "We report on rankings, traffic, and visibility progress, with key metrics and next steps."),
            ("Provide Summary of Work", "We summarise completed work so progress stays visible and transparent."),
        ],
    },
    {
        "n": "Six", "phase": "Reactivation & Next Growth Plan",
        "items": [
            ("Past Customer & Lost Lead Reactivation", "We reach out to previous customers and re-engage older enquiries that never converted."),
            ("Referral Push", "We create a simple referral message that past customers can forward to friends or family."),
            ("SEO & Website Health Check", "We monitor SEO progress and adjust for any unexpected Google or website changes."),
            ("Six-Month Performance Review", "We review what has been built, what has improved, and where the best results came from."),
            ("Monthly SEO Performance Report", "We report on rankings, traffic, and visibility progress, with key metrics and next steps."),
            ("Next 90-Day Plan", "We set the next focus areas for SEO, conversions, reviews, automations, and campaigns."),
            ("Provide Summary of Work", "We give you a clear summary of completed work so the ongoing value stays visible."),
        ],
    },
]

WORD_NUM = {"One": 1, "Two": 2, "Three": 3, "Four": 4, "Five": 5, "Six": 6}

def e(s):
    return html.escape(s)

def logo(mark_only=False):
    return ('<span class="logo"><span class="logo-dot"></span>'
            '<span class="logo-word"><b>HDA</b>&nbsp;Systems</span></span>')

def progress(active):
    dots = []
    for i in range(1, 7):
        cls = "on" if i <= active else ""
        cls2 = "cur" if i == active else cls
        dots.append(f'<span class="pdot {cls2}"></span>')
    return f'<span class="progress">{"".join(dots)}</span>'

def cover():
    contents = []
    for m in MONTHS:
        idx = f"{WORD_NUM[m['n']]:02d}"
        contents.append(
            f'<li><span class="ci-num">{idx}</span>'
            f'<span class="ci-body"><span class="ci-title">Month {m["n"]}</span>'
            f'<span class="ci-phase">{e(m["phase"])}</span></span></li>'
        )
    return f"""
<section class="page cover">
  <div class="grid-tex"></div>
  <div class="blob"></div>
  <header class="cov-top">
    {logo()}
    <span class="eyebrow"><span class="eb-dot"></span>{e(PRICE)}</span>
  </header>

  <div class="cov-hero">
    <span class="kicker">Six-Month Growth Roadmap</span>
    <h1 class="cov-title">Your Growth<br><em>System.</em></h1>
    <p class="cov-lede">{e(WELCOME)}</p>
  </div>

  <div class="cov-lower">
    <div class="contents">
      <span class="lbl">What's inside</span>
      <ol class="ci-list">{''.join(contents)}</ol>
    </div>
  </div>

  <footer class="foot">
    <span>{e(SITE)}</span><span class="foot-sep"></span><span>Page 1</span>
  </footer>
</section>"""

def month_page(m, page_no):
    idx = WORD_NUM[m["n"]]
    idx2 = f"{idx:02d}"
    rows = []
    for i, (title, desc) in enumerate(m["items"], start=1):
        rows.append(f"""
      <li class="item">
        <span class="it-num">{i:02d}</span>
        <span class="it-body">
          <span class="it-title">{e(title)}</span>
          <span class="it-desc">{e(desc)}</span>
        </span>
      </li>""")
    return f"""
<section class="page month">
  <div class="grid-tex"></div>
  <header class="pg-head">
    {logo()}
    <span class="run">Six-Month Growth Roadmap</span>
  </header>

  <div class="month-head">
    <div class="mh-left">
      <span class="eyebrow"><span class="eb-dot"></span>Month {idx2} · of 06</span>
      <h2 class="mh-title">{e(m["phase"])}</h2>
    </div>
    <div class="mh-index"><span class="mh-word">Month</span><span class="mh-big">{e(m["n"])}</span></div>
  </div>

  {progress(idx)}

  <ol class="items">{''.join(rows)}</ol>

  <footer class="foot">
    <span>{e(SITE)}</span><span class="foot-sep"></span><span>Page {page_no}</span>
  </footer>
</section>"""

def build():
    pages = [cover()]
    for i, m in enumerate(MONTHS, start=2):
        pages.append(month_page(m, i))

    doc = f"""<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<title>HDA Systems — Growth System Roadmap</title>
<style>
{FONT_CSS}

:root {{
  --paper:#f4ede1; --paper2:#faf3e8; --panel:#fbf6ec;
  --ink:#2c2620; --ink-soft:#7a6f63; --ink-mute:#9b9084;
  --terra:#c4623f; --terra-deep:#a94d2c; --gold:#c99a5b; --sage:#7f8a6f;
  --line:rgba(44,38,32,.12); --line-soft:rgba(44,38,32,.08);
  --serif:'Fraunces',Georgia,serif; --sans:'Geist','Helvetica Neue',Arial,sans-serif;
  --mono:'Geist Mono',ui-monospace,monospace;
}}

* {{ margin:0; padding:0; box-sizing:border-box;
     -webkit-print-color-adjust:exact; print-color-adjust:exact; }}

html,body {{ background:#d9cdbb; font-family:var(--sans); color:var(--ink); }}

@page {{ size:A4; margin:0; }}

.page {{
  position:relative; width:210mm; height:297mm; overflow:hidden;
  background:var(--paper); margin:0 auto;
  padding:18mm 20mm 15mm;
  display:flex; flex-direction:column;
}}
@media screen {{ .page {{ margin:10mm auto; box-shadow:0 12px 40px rgba(0,0,0,.28); }} }}

/* faint grid + decorative blob */
.grid-tex {{ position:absolute; inset:0; pointer-events:none; opacity:.5;
  background-image:linear-gradient(rgba(44,38,32,.028) 1px,transparent 1px),
    linear-gradient(90deg,rgba(44,38,32,.028) 1px,transparent 1px);
  background-size:26px 26px; }}
.blob {{ position:absolute; top:-90mm; right:-70mm; width:180mm; height:180mm;
  border-radius:50%; pointer-events:none;
  background:radial-gradient(circle at 35% 35%, rgba(196,98,63,.20), rgba(201,154,91,.10) 45%, transparent 68%); }}

/* logo lockup */
.logo {{ display:inline-flex; align-items:center; gap:8px; font-family:var(--sans);
  font-size:11.5pt; letter-spacing:.01em; color:var(--ink); }}
.logo-dot {{ width:9px; height:9px; border-radius:50%; background:var(--terra);
  box-shadow:0 0 0 3px rgba(196,98,63,.16); }}
.logo-word b {{ font-weight:700; }}
.logo-word {{ font-weight:400; }}

/* eyebrow pill */
.eyebrow {{ display:inline-flex; align-items:center; gap:8px;
  font-family:var(--mono); font-size:7.4pt; font-weight:500; letter-spacing:.16em;
  text-transform:uppercase; color:var(--terra-deep);
  border:1px solid rgba(196,98,63,.34); border-radius:999px; padding:5px 12px 4px;
  background:rgba(255,255,255,.35); }}
.eb-dot {{ width:6px; height:6px; border-radius:50%; background:var(--terra); }}

/* footer */
.foot {{ margin-top:auto; display:flex; align-items:center; gap:12px;
  font-family:var(--mono); font-size:7.6pt; letter-spacing:.1em; text-transform:uppercase;
  color:var(--ink-mute); position:relative; z-index:2; padding-top:8mm; }}
.foot-sep {{ flex:1; height:1px; background:var(--line-soft); }}

/* ---------- COVER ---------- */
.cover {{ padding:22mm 22mm 16mm; }}
.cov-top {{ display:flex; align-items:center; justify-content:space-between;
  position:relative; z-index:2; }}
.cov-hero {{ position:relative; z-index:2; margin-top:34mm; }}
.kicker {{ font-family:var(--mono); font-size:8pt; letter-spacing:.26em;
  text-transform:uppercase; color:var(--ink-soft); display:block; margin-bottom:10mm; }}
.cov-title {{ font-family:var(--serif); font-weight:500; font-size:64pt; line-height:.96;
  letter-spacing:-.015em; color:var(--ink); }}
.cov-title em {{ font-style:italic; font-weight:500; color:var(--terra); }}
.cov-lede {{ font-family:var(--serif); font-weight:400; font-size:13.5pt; line-height:1.55;
  color:var(--ink-soft); max-width:150mm; margin-top:12mm; }}

.cov-lower {{ position:relative; z-index:2; margin-top:auto;
  padding-top:12mm; border-top:1px solid var(--line); }}
.lbl {{ font-family:var(--mono); font-size:7.2pt; letter-spacing:.18em;
  text-transform:uppercase; color:var(--ink-mute); display:block; margin-bottom:9px; }}

.ci-list {{ list-style:none; columns:3; column-gap:12mm; }}
.ci-list li {{ display:flex; gap:9px; align-items:baseline; padding:3.6mm 0;
  border-bottom:1px solid var(--line-soft); break-inside:avoid; }}
.ci-num {{ font-family:var(--mono); font-size:8pt; font-weight:600; color:var(--terra);
  min-width:20px; }}
.ci-body {{ display:flex; flex-direction:column; gap:1px; }}
.ci-title {{ font-family:var(--mono); font-size:6.8pt; letter-spacing:.12em;
  text-transform:uppercase; color:var(--ink-mute); }}
.ci-phase {{ font-family:var(--serif); font-size:10.5pt; font-weight:500; color:var(--ink);
  line-height:1.2; }}

/* ---------- MONTH PAGES ---------- */
.pg-head {{ display:flex; align-items:center; justify-content:space-between;
  position:relative; z-index:2; padding-bottom:7mm; border-bottom:1px solid var(--line); }}
.run {{ font-family:var(--mono); font-size:7.6pt; letter-spacing:.18em;
  text-transform:uppercase; color:var(--ink-mute); }}

.month-head {{ position:relative; z-index:2; display:flex; align-items:flex-end;
  justify-content:space-between; margin-top:11mm; gap:10mm; }}
.mh-left {{ max-width:130mm; }}
.mh-title {{ font-family:var(--serif); font-weight:500; font-size:29pt; line-height:1.04;
  letter-spacing:-.01em; color:var(--ink); margin-top:8px; }}
.mh-index {{ text-align:right; line-height:.8; }}
.mh-word {{ display:block; font-family:var(--mono); font-size:7.6pt; letter-spacing:.2em;
  text-transform:uppercase; color:var(--ink-mute); }}
.mh-big {{ font-family:var(--serif); font-style:italic; font-weight:500; font-size:34pt;
  color:var(--terra); }}

.progress {{ position:relative; z-index:2; display:flex; gap:7px; margin:9mm 0 8mm; }}
.pdot {{ height:5px; flex:1; border-radius:999px; background:rgba(44,38,32,.10); }}
.pdot.on {{ background:var(--gold); }}
.pdot.cur {{ background:var(--terra); }}

.items {{ position:relative; z-index:2; list-style:none; flex:1;
  display:flex; flex-direction:column; }}
.item {{ display:flex; gap:14px; align-items:flex-start; padding:4mm 0 0;
  flex:1; min-height:0; }}
.item + .item {{ border-top:1px solid var(--line-soft); }}
.it-num {{ font-family:var(--mono); font-size:9pt; font-weight:600; color:var(--terra);
  min-width:30px; line-height:1.35; }}
.it-body {{ display:flex; flex-direction:column; gap:2.5px; padding:0; align-self:flex-start; }}
.it-title {{ font-family:var(--sans); font-size:12pt; font-weight:600; letter-spacing:-.005em;
  color:var(--ink); }}
.it-desc {{ font-family:var(--sans); font-size:9.6pt; font-weight:400; line-height:1.42;
  color:var(--ink-soft); max-width:150mm; }}

/* tighter rhythm when a month has many items */
.items.dense .it-title {{ font-size:11pt; }}
.items.dense .it-desc {{ font-size:9.2pt; }}
</style>
</head>
<body>
{''.join(pages)}
<script>
// give many-item months a denser class so 8-item pages breathe evenly
document.querySelectorAll('.items').forEach(function(o){{
  if(o.querySelectorAll('.item').length >= 8) o.classList.add('dense');
}});
</script>
</body>
</html>"""
    out = os.path.join(HERE, "roadmap.html")
    open(out, "w", encoding="utf-8").write(doc)
    print("wrote", out, f"({os.path.getsize(out)//1024}kb)")

if __name__ == "__main__":
    build()
