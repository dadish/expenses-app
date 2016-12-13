module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "jest": true,
    "es6": true,
  },
  "plugins": [
    "import",
    "react",
    "jsx-a11y",
    "redux-saga",
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  "rules": {
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": 0,
    "react/jsx-filename-extension": [1, { "extensions": ["js", "jsx"] }],
    "react/forbid-prop-types": 0,
    "react/prop-types": [2, { "ignore": ["children"] }],
    "redux-saga/yield-effects": 2,
    "redux-saga/no-yield-in-race": 2,
    "redux-saga/no-unhandled-errors": 0,
    "comma-dangle": [2, {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore",
    }],
  },
};
