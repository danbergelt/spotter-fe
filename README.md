![Spotter Logo](spotter.png)

[![codecov](https://codecov.io/gh/danbergelt/spotter-fe/branch/master/graph/badge.svg)](https://codecov.io/gh/danbergelt/spotter-fe) [![Build Status](https://travis-ci.org/danbergelt/spotter-fe.svg?branch=master)](https://travis-ci.org/danbergelt/spotter-fe) [![Netlify Status](https://api.netlify.com/api/v1/badges/185ca328-a100-492f-9ded-ae95730184ff/deploy-status)](https://app.netlify.com/sites/practical-murdock-786867/deploys) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

a blazing fast, user obsessed, weightlifting focused fitness pal

🔗 https://getspotter.io

## 🤝 pull requests

pull requests welcome!

if you'd like to get in touch, please reach out to 📧 dan@danbergelt.com

## 👨‍💻 requirements

for development, you will need `node.js` and `yarn v1` installed in your environment

once pulled down, run `yarn` to install deps

## 🌍 env

this app relies on certain environment variables. after pulling down to your local environment, run `touch .env` in the root and add the below variables:

`REACT_APP_T_API=<local BE API url string>`

`REACT_APP_S_API=<staging BE API url string>`

`REACT_APP_API=<production BE API url>`

`REACT_APP_STAGING=<staging env condition, defaults to false>`

`CODECOV_TOKEN=<your repo's codecov token>`

## 📜 scripts

`yarn start` - run your app in dev mode

`yarn build` - build a bundled production app

`yarn test` - run tests

`yarn test:cov` - run test, collect coverage into `./coverage`

`yarn eject` - eject from create-react-app

`yarn lint` - lint app for syntax errors

`yarn fix` - lint and fix syntax errors

<<<<<<< HEAD
## ⚙️ tech

notable tech includes:

- `react` - views
- `redux` - global state management
- `typescript` - static type checking
- `jest` - test runner
- `react testing library` - integration & unit tests
- `travis ci` - ci
- `netlify` - deployment
=======
>>>>>>> 5e340638660f96cb55cadc74addeda0a5c6e07f9
