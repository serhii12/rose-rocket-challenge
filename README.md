# Rose Rocket Assignment

- Primarily a client-side SPA (single-page app) built with ReactJS
- Contains a form for changing driver location
- The client-side app communicates with a server via WebSockets for multi-user - real-time updates

## Getting Started

Fork or clone the repo

```
git clone git@github.com:serhii12/rose-rocket-challenge.git
cd rose-rocket-challenge
```

1. CD into server folder run `npm i`.
2. Run: `npm run client-install`.
3. Run the server and client: `npm run dev`.
4. The browser window should open at `http://localhost:3000/`.
5. If not visit `http://localhost:3000/`.
6. Once in the app you will have a form input where you could specificity leg progress.
7. Open one more browser window at `http://localhost:3000/` to see real time communication.
8. Update leg progress. Changes will be reflected across all clients.
9. Enjoy 😉

## Screenshots

### Main APP

<img src="https://github.com/serhii12/rose-rocket-challenge/blob/master/docs/app.png"/>

#### GIF

!["Stop change"](https://github.com/serhii12/rose-rocket-challenge/blob/master/docs/demoGIF.gif?raw=true)

### Dependencies

* React
* React-DOM
* React-Scripts
* React-Konva
* konva
* node-sass-chokidar
* npm-run-all
* prop-types
* body-parser
* concurrently
* express
* morgan
* ws

### devDependencies

* nodemon
* prettier
* eslint