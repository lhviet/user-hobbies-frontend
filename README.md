# User-Hobbies Frontend
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Introduction
- The project includes two parts: Frontend (React/Redux) and Backend (NodeJS/Hapi framework).
- The frontend part provides features including: List (user-hobbies), Create, Delete, and Update.

#### Demo
Live at (AWS S3 & Cloudfront)

http://d2rqmsx5kuii78.cloudfront.net

#### Features
**1. Backend communication**
- RESTful API, ajax

**2. Frontend**
- List of Users, Create, Update, Delete
- List of Hobbies of a selected User, Create, Delete
- Design: scrolling, navigation & sidebar layout, partial web-responsive support

#### Technology
- ARc - Atomic design
- Reset CSS for browser standards
- CSS-in-JS - styled-component, No CSS framework (bootstrap) or SASS
- ReactJS / Redux / Typescript
- Rxjs, ajax, redux-observable (epic)
- Unit Test: Jest, Enzyme
- UI Test: Storybook
- lodash
- tslint

#### How to start (available scripts)
- install packages `yarn`
- run in local `yarn start`, remember to modify `src/5_constants/api.ts` to connect to your backend
- test UI/UX `yarn storybook`
- jest test `yarn tests`
- build & deploy `yarn build`

## Philosophy
#### Structure
1. Components - [ARc](https://arc.js.org/) Atomic design
- `atoms` contains very basic (principle) components
- `molecules` contains components comprising from `atoms`
- `organisms` contains components comprising from `atoms`, `molecules`, and `organisms`  

**`Components` contains no-container-components only, there are no containers mapped to `components`.**
Any component which requires logic & data will be located in `containers`.

2. Containers
Holding the logic (data feeding, action dispatching) for the Components (UI)

#### Code Comment
Not many comments given in the source code, but only the part hard to understand or need more actions.
I believe that the code itself explaining what it does (meaningful function name, variables).

