# WTWR (What to Wear?)

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)

# Back end process
## This project is to create a server for the WTWR application. The project include some basic function:
- Get images and users data.
- Return images base on unique user's ID.
- Look up unique image and user by their unique ID.
- Functional like and unlike data.
- Sign up and Sign in user.
- Edit profile and log out user.

## Technologies and Techniquies Used
### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB**: A NoSQL database program that uses JSON-like documents with optional schemas.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward, schema-based solution to model your application data.

### Error Handling
- Custom error classes.

### Middleware
- **Express Middleware**: Used for parsing JSON, handling errors, and managing routes.
- **Custom Middleware**: Middleware to simulate user authentication by adding a user object to the request.
