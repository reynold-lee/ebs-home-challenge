# Simplified ERP-like Item Management System

## Objective

Build a simplified ERP-like system for managing items in a warehouse.

## Tech Stack

- Frontend: React, TypeScript, Redux, ReduxToolkit, Axios
- Backend: Django, DRF

## Prerequisites

- Node v16 or higher
- Docker & Docker Compose v2

## How to setup

1. Clone the repository
2. Set up frontend

- `cd web` to enter frontend directory
- `npm i` to install dependencies
- `npm start` to start web server

3. Set up backend

- `cd api` to enter backend repository
- `docker compose up` to start an API container which runs API server

## Run API tests

- `docker compose exec api sh -c "cd app && python manage.py test"` or `sh ./run-tests.sh` to run tests for APIs
