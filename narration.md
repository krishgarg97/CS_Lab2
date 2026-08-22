Video narration outline (<=10 minutes)

1. Intro (30s): state group ID, vulnerability: Business Logic Flaw — negative quantity refund.
2. App run (1m): start server, open UI at /, show product and balance endpoints.
3. Code walkthrough (2m): open `index.js`, explain `POST /purchase` logic and where quantity is used.
4. Normal behavior demo (1m): buy quantity=1 and show balance decrease.
5. Attack demo (2m): set quantity=-5, submit, show balance increase and orders created.
6. Root cause explanation (1m): server trusts client input and lacks validation; show exact line in `index.js`.
7. Fix demonstration (1m): show `index.fixed.js` (server-side check) and explain mitigation.
8. Wrap-up (30s): summary and recommended secure coding practices.

Checklist before recording:
- Start server and ensure port 3000 free
- Have terminal open showing curl output
- Browser tab with UI ready
- Editor open to `index.js` and `index.fixed.js`
