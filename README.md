# Northcoders News API

## Background

An API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

## Operations 

REST API for interacting with a database. Here's a brief explanation of what the code does:

It imports various controller functions from separate files using the require() function.
It imports the Express.js framework and sets up a new Express application instance using the app() function.
It sets up middleware using the app.use() function. The middleware includes json(), which parses incoming requests with JSON payloads, and cors(), which enables Cross-Origin Resource Sharing (CORS).
It defines various HTTP routes using the app.get(), app.patch(), app.post(), and app.delete() functions. These routes correspond to various endpoints in the API and are handled by specific controller functions.
It defines error-handling middleware using the app.use() function. The middleware handles errors that are thrown by the API endpoints or by the middleware itself.





