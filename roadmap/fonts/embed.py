import re, base64, subprocess, sys, os

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

def fetch(url):
    return subprocess.check_output(["curl", "-sL", "-A", UA, url])

files = ["fraunces.css", "geist.css", "geistmono.css"]
out = []
block_re = re.compile(r"@font-face\s*\{[^}]*\}", re.S)
for fn in files:
    css = open(fn, encoding="utf-8").read()
    for block in block_re.findall(css):
        ur = re.search(r"unicode-range:\s*([^;]+);", block)
        # keep only the basic-latin subset to keep size down
        if ur and "U+0000-00FF" not in ur.group(1):
            continue
        m = re.search(r"url\((https://[^)]+\.woff2)\)", block)
        if not m:
            continue
        url = m.group(1)
        data = fetch(url)
        b64 = base64.b64encode(data).decode()
        newblock = block.replace(
            m.group(0),
            f"url(data:font/woff2;base64,{b64}) format('woff2')",
        )
        out.append(newblock)
        fam = re.search(r"font-family:\s*'([^']+)'", block)
        wght = re.search(r"font-weight:\s*([^;]+);", block)
        styl = re.search(r"font-style:\s*([^;]+);", block)
        print(f"embedded {fam.group(1) if fam else '?'} {wght.group(1).strip() if wght else ''} {styl.group(1).strip() if styl else ''} ({len(data)//1024}kb)", file=sys.stderr)

open("embedded.css", "w", encoding="utf-8").write("\n".join(out))
print(f"\nWrote embedded.css with {len(out)} faces, {os.path.getsize('embedded.css')//1024}kb total", file=sys.stderr)
