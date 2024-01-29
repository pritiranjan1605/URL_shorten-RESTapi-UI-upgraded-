# URL Shortener Web App

This is a simple URL shortener web application built with Node.js, Express, and MongoDB.

## Table of Contents
- [Introduction](#introduction)
- [Setup](#setup)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [User](#user)
  - [URLs](#urls)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [License](#license)

## Introduction

The URL shortener web app allows users to shorten long URLs and manage them through user authentication. Users can sign up, log in, and create short URLs for redirection.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3.The server will be running at http://localhost:8000.

## Authentication

The app uses session-based authentication. Users need to sign up or log in to create and manage shortened URLs.

## Endpoints

### User

- **GET /user/signup**
  - Render the signup page.

- **POST /user/signup**
  - Create a new user account.
  - Request body: { name, email, password }

- **GET /user/login**
  - Render the login page.

- **POST /user/login**
  - Log in an existing user.
  - Request body: { email, password }

### URLs

- **POST /urls**
  - Shorten a URL.
  - Requires authentication.
  - Request body: { directurl }
  - Returns a short URL.

- **GET /urls/:shortid**
  - Redirect to the original URL based on the short ID.

## Usage

1. Sign up or log in to your account.
2. Use the /urls endpoint to shorten a long URL.
3. View and manage your shortened URLs.

## Dependencies

- Express: Web application framework
- Mongoose: MongoDB object modeling
- EJS: Embedded JavaScript templating
- shortid: Short ID generation
- cookie-parser: Middleware for parsing cookies
- uuid: UUID generation

## License

This project is licensed under the MIT License.
