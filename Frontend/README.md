# Travel Beyond Boundaries — Front End

A React + Vite front end for a travel booking site: a marketing home page (with
international destination, reviews, and India-exploration carousels powered by
Redux Toolkit) plus sign in, sign up, forgot-password, and 404 pages.

## Tech stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) — dev server & build tool
- [React Router](https://reactrouter.com/) — client-side routing
- [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) — home page carousel state
- [Bootstrap](https://getbootstrap.com/) / [react-icons](https://react-icons.github.io/react-icons/) — available for use across the UI

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to http://localhost:5173).

## Scripts

| Command           | Description                              |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Start the Vite dev server with HMR        |
| `npm run build`    | Type-check-free production build to `dist/` |
| `npm run preview`  | Preview the production build locally      |

## Project structure

```
FrontEnd/
├─ index.html               # Vite entry HTML
├─ public/
│  └─ images/                # Static assets served as-is (logo, hero photo, etc.)
├─ src/
│  ├─ main.jsx               # App bootstrap: Redux Provider + BrowserRouter
│  ├─ App.jsx                 # Route table
│  ├─ store.js                 # Redux Toolkit store & slices
│  ├─ data/
│  │  └─ travelData.js          # Static destination/review data used by Home
│  └─ pages/
│     ├─ Home.jsx / Home.css              # Landing page
│     ├─ SignIn.jsx / SignIn.css          # Sign in
│     ├─ SignUp.jsx / SignUp.css          # Sign up
│     ├─ ForgotPassword.jsx / ...css      # Password reset flow
│     └─ NotFound.jsx / NotFound.css      # 404 page (catch-all route)
├─ package.json
├─ vite.config.js
└─ eslint.config.js
```

## Routes

| Path               | Page             |
| ------------------- | ---------------- |
| `/`                  | Home             |
| `/signin`            | Sign in          |
| `/signup`            | Sign up          |
| `/forgot-password`   | Forgot password  |
| any other path       | 404 Not Found    |
