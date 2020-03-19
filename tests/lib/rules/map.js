"use strict";

const rule = require("../../../lib/rules/map"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6, parser: "babel-eslint" } });

ruleTester.run("lodash-to-native/map", rule, {
  valid: [
    // don't show error if collection - object
    {
      code: "_.map({1: 2, 2: 2}, (x) => x);"
    },
    {
      code: "const obj = {1: 2, 2: 2}; _.map({1: 2, 2: 2}, (x) => x);"
    },
    {
      code: "let obj = [1, 2]; obj = {1: 2, 2: 2}; _.map({1: 2, 2: 2}, (x) => x);"
    },
    // don't show error if collection argument of function
    {
      code: "function workCollection (arg) {_.map(arg, (x) => x);}"
    },
    {
      code: "const workCollection = (arg) => {_.map(arg, (x) => x);}"
    },
  ],
  invalid: [
    // show error and suggestion to fix
    {
      code: "const arr = [1, 2]; _.map(arr, (x) => x);",
      errors: [{ 
        message: "change _.map by native, if possible. Fix it auto with eslint."
      }]
    },
    {
      code: "_.map([1, 2], (x) => x);",
      errors: [{ 
        message: "change _.map by native, if possible. Fix it auto with eslint."
      }]
    },
    {
      code: `let arr = {1: 2, 2: 2}; 
                  arr = [1, 2]; 
                  _.map(arr, (x) => x);`,
      errors: [{ 
        message: "change _.map by native, if possible. Fix it auto with eslint."
      }]
    },
    {
      code: "_.map(new Array(), (x) => x);",
      errors: [{ 
        message: "change _.map by native, if possible. Fix it auto with eslint."
      }]
    },
  ]
});