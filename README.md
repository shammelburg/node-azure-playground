## Node MSSQL Playground

These are single file examples on how you would access MS SQL with Node alone or through an Express endpoint. 

In each of the examples it calls a hard-coded query and a stored procedure.

Below are some of the highlights in the documentation.

#### Single Connection Pool
Using a single connection pool for your application/service is recommended. Instantiating a pool with a callback, or immediately calling .connect, is asynchronous to ensure a connection can be established before returning. From that point, you're able to acquire connections as normal.
[Connection Pools](https://www.npmjs.com/package/mssql#connection-pools)

#### Using template literals
All values are automatically sanitized against sql injection. This is because it is rendered as prepared statement, and thus all limitations imposed in MS SQL on parameters apply. e.g. Column names cannot be passed/set in statements using variables.
[ES6 Tagged template literals](https://www.npmjs.com/package/mssql#es6-tagged-template-literals)

#### CLOSING Connection Pool
We should only ever close the pool when our application is finished. For example, if we are running some kind of CLI tool or a CRON job.
[The Global Connection (Pool)](https://www.npmjs.com/package/mssql#pool-management)