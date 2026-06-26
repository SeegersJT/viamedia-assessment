# VIAMEDIA ASSESSMENT

## Product Hub

A product catalog built with Vite and the DummyJSON API. Built as part of a frontend developer assessment.

**Version:** `1.0.3`
**Live Demo:** [ViaMedia - Assessment](https://seegersjt.github.io/viamedia-assessment/)

---

## What it does

- Browse a paginated list of products with search and category filtering
- View full product detail pages with image, pricing, specs, and stock status
- Log in to get access to create, edit, or delete products
- Create, edit, and delete products when authenticated
- View your full profile after logging in
- Logged-in user info displays in the header
- Fully responsive on mobile and desktop

---

| Build tool       | Vite               |
| ---------------- | ------------------ |
| Framework        | React              |
| Language         | Typescript         |
| Styling          | Tailwind CSS       |
| State Management | Redux + Redux-Saga |
| Routing          | React Router       |
| API Client       | Axios              |
| API              | DummyJSON          |

---

## How to start locally

**Requirements:** Node v24.18.0 _(LTS at time of development)_

### Node Version Manager Setup (nvm-windows)

If you are using [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage your Node versions:

```bash
nvm install 24.18.0
nvm use 24.18.0
node -v # Should show the version: v24.18.0
```

### Install and Run

```bash
git clone https://github.com/SeegersJT/viamedia-assessment.git # (Something like that - I'll update this once I commit)
cd viamedia-assessment
npm install
cp .env.example .env
npm run dev  # Pray it starts
```

Then open `http://localhost:5173`

### Environment Variables

```env
VITE_API_BASE_URL=https://dummyjson.com
```

**_I'll add more as I go..._**

### Test Credentials

```
username: emilys
password: emilyspass
```

**_As per the DummyJSON Documentation_**

---

## Project Structure

```
src/
\ assets/
\ components/
\ containers/
\ hooks/
\ lib/
\ redux/
\ routes/
\ App.tsx
\ main.tsx
\ styles.css
```

**_I'm bad at creating those pipes to show folder depth..._**

---

## Technical Decisions

**Redux + Redux-Saga**
The spec asked for Auth, CRUD, pagination, search and category filtering.
All of which produce async side effects that rely on each other.
For that reason, I'm using Sagas to have a clean place to handle logic without having to cross over components and scatter all over the place.
Now I know for a smaller app I'd use something lighter, but this is a skills showcase, so I'm using what I'd use in a real production codebase.

**Global Notification System**
Built a notification system from the ground up with its own reducer, actions, and saga.
Any component or saga anywhere in the app can dispatch a notification without needing to know anything about the UI layer.
The `Notification` component sits at the root level and listens to the Redux store, so toast messages are available application-wide with a single dispatch call.

**Generic Axios Structure**
Rather than writing one-off API calls per feature, I built a generic Axios layer to handle all requests centrally.
This gives me a single place to attach headers, handle errors, and manage response shapes, keeping the saga and component code clean and free of repetitive boilerplate.

**ESLint + Prettier for code quality**
Added ESLint and Prettier to the project from the start. Beyond just keeping the code clean, the bigger reason is consistency.
By committing a `.vscode` folder with workspace settings and recommended extensions list, anyone who clones the repo gets the same formatting rules and linting behaviour automatically enforced in their editor.
In a team environment this pays for itself immediately since the style is forced at the project level, not left up to individual developer setups.
Also I'm lazy and don't want to manually lint, so I save and it lints for me.

**Shadcn/ui theme builder for styling**
Rather than writing CSS Variables from scratch, I used the [shadcn/ui themes builder](https://ui.shadcn.com/themes) to create the base design.
I based the color palette loosely off of the ViaMedia theme.
This significantly speeds up visual setup for me.

**Axios over fetch**
Interceptors make it easier to attach the Authorization header globally and handle 401 responses (auto-logout) in a central place instead of in every request.

**Routing**
Two main routes are set up: a `dashboard` route which serves as a basic landing page, and a `catalog` route where the core product browsing experience lives, paginated product grid, search, and filtering.
Protected routes guard the login screen and any authenticated actions. Unauthenticated users are redirected to login, authenticated users are redirected away from it.

_I'll add more decisions as I progress_

---

## Current Progress

- Product retrieval and display on the catalog page is the primary focus so far. Pagination and search are wired up and working.
- Category filtering is partially in place and being refined.
- Product detail page is complete. Selecting a product from the catalog navigates to a dedicated page showing the full product info including image, rating, pricing, discount, stock, and specifications, etc.
- Protected routes and login are complete. Authentication is handled via DummyJSON's auth endpoint with the token stored and attached to subsequent requests via Axios interceptors.
- Full CRUD is implemented and gated behind authentication. Create, edit, and delete operations are available to logged-in users, with mutations reflected locally as per DummyJSON behaviour.
- Profile page is complete. Authenticated users can view their full profile pulled from `/auth/me`, including personal details, contact info, address, company, and physical stats. Session is rehydrated on page refresh via the stored access token.

---

## What I'd improve on with more time

- Add unit tests for the sagas and maybe key components
- Persist the search / filter / page state in the URL so links are shareable
- Persist auth state across page refreshes via token storage

---

## Notes / Assumptions

- DummyJSON doesn't persist POST / PUT / DELETE changes, the UI reflects mutations locally as documented
- The "Add Product" button is hidden entirely when logged out, rather than showing it disabled
- Categories are fetched once on mount and cached in Redux
- `/auth/me` is called on app boot when an access token is present to rehydrate the user session

_I'll add more notes as I progress_

**_phew_**
