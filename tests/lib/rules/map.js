const rule = require("../../../lib/rules/my-rule"),
    RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("my-rule", rule, {
  valid: [
      {
          code: "var foo = true",
          options: [{ allowFoo: true }]
      }
  ],

  invalid: [
      {
          code: "var invalidVariable = true",
          errors: [{ message: "Unexpected invalid variable." }]
      },
      {
          code: "var invalidVariable = true",
          errors: [{ message: /^Unexpected.+variable/ }]
      }
  ]
});
