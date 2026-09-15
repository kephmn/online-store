# Online Store — Rails API + React SPA

A full-stack e-commerce application built with a **Rails 8 JSON API backend** and a **React single-page frontend**, featuring JWT authentication, role-based authorization, a shopping cart and checkout flow, and order management.

> Built as a hands-on project to demonstrate real-world Rails API design, secure authentication, and frontend/backend integration — not a tutorial clone.

---

## Why this project

Most beginner Rails portfolios stop at CRUD scaffolding. This one goes further: it's a decoupled API + SPA architecture with **stateless JWT auth with token revocation**, **role-based access control**, and **ownership-scoped data access** (users can only ever see and modify their own carts, addresses, and orders) — the kind of concerns that actually come up in production apps.

## Tech Stack

**Backend**
- Ruby on Rails 8.1 (API-only mode)
- PostgreSQL
- Devise + `devise-jwt` for stateless, token-based authentication with a JWT denylist for logout/revocation
- ActiveModel::Serializer for JSON response shaping
- Role-based authorization (`customer` / `admin`) enforced at the controller level

**Frontend**
- React 18 (function components + hooks)
- React Router for client-side routing
- Axios with request/response interceptors for auth token handling
- Bootstrap 5 for styling
- esbuild + Dart Sass, wired into the Rails asset pipeline via `jsbundling-rails` / `cssbundling-rails`

## Features

- **Authentication** — registration, login, logout, and session persistence via JWT, with automatic re-authentication check on page load/refresh
- **Product catalog** — browsable product list with category filtering, individual product detail pages
- **Shopping cart** — add/remove/update items, quantity management, live total calculation
- **Checkout** — address management (add/select shipping address) and order placement, converting a cart into an order in a single database transaction
- **Order history** — authenticated users can view their past orders and item-level detail
- **Admin controls** — product create/update/delete restricted to admin-role users, enforced server-side (not just hidden in the UI)

## Architecture Notes

This app is intentionally split into two independently-runnable halves that talk over a JSON API, rather than a traditional server-rendered Rails app:

- All business logic and data access lives behind `/api/v1/*` — the API has **zero knowledge of views or sessions**, making it straightforward to swap the frontend, add a mobile client, or scale the API separately.
- The React app is a fully static build, served by Rails via a single catch-all route, with React Router handling all client-side navigation. This means a browser refresh on any URL correctly rehydrates state instead of 404ing.
- **Security decisions made deliberately, not accidentally:**
  - Every cart/order/address lookup is scoped through `current_user.orders.find(...)` rather than a bare `Order.find(...)`, closing the door on IDOR (insecure direct object reference) vulnerabilities.
  - Mass-assignment is locked down via strong parameters — `role` is never permitted on registration, preventing self-promotion to admin.
  - JWTs are properly revoked on logout via a denylist table, not just discarded client-side.
  - Admin-only actions use a `before_action` guard that actually halts the request on failure, rather than rendering an error and continuing to execute anyway (a subtle bug that's easy to introduce and easy to miss in review).

## Getting Started

### Prerequisites
- Ruby 3.3+
- PostgreSQL
- Node.js + Yarn or npm

### Setup
```bash
# Install dependencies
bundle install
yarn install   # or npm install

# Set up the database
bin/rails db:create db:migrate db:seed

# Build frontend assets and start the dev servers (Rails + JS watcher + Sass watcher)
bin/dev
```
Visit `http://localhost:3000`.

### Environment Variables
```
DEVISE_JWT_SECRET_KEY=<generate with `bin/rails secret`>
DEVISE_SECRET_KEY=<generate with `bin/rails secret`>
```

## API Overview

| Method | Endpoint                       | Description                          | Auth required |
|--------|---------------------------------|---------------------------------------|----------------|
| POST   | `/api/v1/auth/register`         | Create a new account                  | No             |
| POST   | `/api/v1/auth/sign_in`          | Log in, returns JWT                   | No             |
| DELETE | `/api/v1/auth/sign_out`         | Log out, revokes JWT                  | Yes            |
| GET    | `/api/v1/auth/me`                | Get current authenticated user        | Yes            |
| GET    | `/api/v1/products`               | List products (filterable by category)| No             |
| GET    | `/api/v1/products/:id`           | Product detail                        | No             |
| POST/PUT/DELETE | `/api/v1/products/:id`  | Manage products                       | Yes (admin)    |
| GET    | `/api/v1/cart`                   | View current cart                     | Yes            |
| POST   | `/api/v1/cart/add_item`          | Add item to cart                      | Yes            |
| POST   | `/api/v1/cart/checkout`          | Convert cart to order                 | Yes            |
| GET    | `/api/v1/orders`                 | List current user's orders            | Yes            |

## What I'd Add Next

- Request specs / model specs (RSpec) for the core auth and checkout flows
- Rate limiting on authentication endpoints (`rack-attack`)
- Payment gateway integration (currently a simulated "pay" endpoint)
- Pagination on the products index
- CI pipeline (GitHub Actions) running the test suite and linter on every PR

## License

MIT
