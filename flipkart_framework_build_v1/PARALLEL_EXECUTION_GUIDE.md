# Parallel Execution Guide

Commands: npm test (sequential), npm run test:parallel (3 workers), npm run test:parallel:5, and npm run test:parallel:10.

Cucumber parallelizes scenarios, not steps. Each scenario has its own World, BrowserContext and Page. Use unique TCIDs and read-only Excel access. Avoid concurrent changes to shared carts, accounts or orders.

Roll out gradually: sequential -> 3 -> 5 -> 10 workers. Reduce workers if the site throttles requests or tests become flaky. The parallel test scripts generate the HTML report automatically after Cucumber finishes.
