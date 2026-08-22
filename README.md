# Business Logic Flaw — Demo

This small Node/Express app demonstrates a business-logic flaw where a negative `quantity` in a purchase results in a refund (the server trusts the supplied number).

Run:

```bash
cd "business-logic-flaw-node"
npm install
npm start
```

Open http://localhost:3000 in your browser. Use the form to buy a product. To demonstrate the flaw: set `Quantity` to a negative number (for example `-5`) — the server will add money to the user's balance because it multiplies price * quantity and subtracts the result.

Files:
- `index.js` — Express server and vulnerable `POST /purchase`
- `public/index.html` — minimal UI

Notes for the assignment video:
1. Show the app running normally (positive quantity purchase).
2. Demonstrate entering a negative quantity and show balance increasing.
3. Explain the bug: server does not validate that `quantity` is positive.
4. Fix: add a server-side check rejecting non-positive quantities.

Screenshots:
- [Initial UI](screenshots/initial-ui.svg)
- [Normal purchase (curl)](screenshots/normal-purchase.svg)
- [Exploit showing refund](screenshots/exploit.svg)
- [Vulnerable code excerpt](screenshots/code-line.svg)

- [Initial UI (captured)](screenshots/auto/ui.png)
- [Normal purchase (captured)](screenshots/auto/normal_purchase.png)
- [Exploit showing refund (captured)](screenshots/auto/exploit_purchase.png)
- [Vulnerable code excerpt](screenshots/code-line.svg)

Capture (optional)
------------------
To produce real screenshots automatically, install dev dependencies and run the capture script. This uses your system Chrome (macOS path shown) and `puppeteer`.

```bash
cd business-logic-flaw-node
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 npm install
# ensure Chrome exists at /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
npm start & echo $! > server.pid
node scripts/capture.js
kill $(cat server.pid) || true
```

Demo script
-----------
`demo.sh` performs curl steps to reproduce the normal purchase and exploit. It uses `jq` to pretty-print JSON — install `jq` if you need it.

Submission
----------


