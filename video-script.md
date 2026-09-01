# Business Logic Flaw Demo Script

“Hi everyone. Today I’m showing a simple but important business-logic vulnerability in a small e-commerce application.

So, the app has a user balance, a product with a fixed price, and a purchase endpoint. The expected behavior is straightforward: when a user buys something, the total cost should be deducted from their balance.

Let me open the app in the browser first. Right now, the user balance is 1000, and the product costs 100. I’m going to make a normal purchase with quantity 1. As expected, the total cost is 100, and the balance goes down to 900. That is the normal, correct behavior.

Now, I’m going to show you the vulnerable code in index.js. This is the important part. The server takes the quantity from the request, multiplies it by the product price, and then subtracts it from the balance.

The problem is: there is no validation. There is no check to ensure that the quantity is positive, or even an integer. So if the client sends a negative value, the server accepts it and treats it like a refund.

This is the vulnerability. The logic is wrong because the app trusts user input without validating the business rule.

Let me demonstrate that live. I’m going to enter a negative quantity, say -5, and submit the purchase. The server calculates 100 × -5, which is -500. Then it subtracts that from the balance. Since the balance was 900, it becomes 1400.

So, the app is actually paying the user money instead of charging them. That is the core flaw: negative quantity becomes a refund, and the system gives money away.

This is exactly what we mean by a business-logic flaw. It’s not a crash, and it’s not a syntax bug. It’s a logic error in the pricing rule.

Now I’ll switch to the fixed version in index.fixed.js. Here, the server validates the input before processing the purchase. It checks that the quantity is a positive integer and rejects invalid values.

It also checks affordability, so if the user cannot pay for the purchase, it blocks the transaction.

Let me test the same exploit against the fixed server. I’m sending the same negative quantity again. This time, the server responds with an error: quantity must be a positive integer. The request is rejected immediately.

I’ll also test a decimal value, like 2.7. That is also rejected, because the system only accepts whole positive integers.

And if someone tries to buy an amount greater than their balance, the server rejects that too.

So the real fix is not just “avoid negative numbers.” The real fix is to enforce the business rules on the server, and ensure the request is valid before doing any math.

That is the key takeaway: if you do not validate user input and enforce the rules of the domain, your application can behave in ways that seem harmless but are actually harmful.

This tiny demo shows how a single missing check can turn a harmless purchase flow into a money-creating vulnerability.

Thank you.”
