"use strict";

module.exports = {
  meta: {
    fixable: "code",
    environments: {
      parserOptions: {
        ecmaVersion: 6,
        parser: "babel-eslint"
      }
    }
  },
  create(context) {
    return {
      MemberExpression(node) {
        const sourceCode = context.getSourceCode();
        const scope = context.getScope();

        const getAncestor = (node) => {
          const ancestors = context.getAncestors(node);
          return ancestors[ancestors.length - 1];
        };

        const getCollection = (ancestor) => {
          return ancestor.arguments[0];
        };

        const getHandler = (ansestor) => {
          const length = ansestor.arguments.length;
          return ansestor.arguments[length - 1];
        };

        const isNodeLodash = (node) => {
          return node.object.name === "_";
        };

        const isPropertyNameMap = (node) => {
          return node.property.name === "map";
        };

        const findValue = (collection, scope) => {
          const name = collection.name;
          const loc = collection.start;
          const arr = [];

          if (scope === null) return undefined;

          for (const item of scope.variables) {
            for (const exp in item.references) {
              const equalNames = item.references[exp].identifier.name === name;
              const beforeLoc = item.references[exp].identifier.start < loc;
              if (equalNames && beforeLoc) {
                arr.push(item.references[exp].writeExpr);
              }
            }
          }
          const result = arr[arr.length - 1];
          
          return result || findValue(collection, scope.upper);
        };

        const isColletctionArray = (collection) => {
          if (!collection) return false;
          switch (collection.type) {
            case "NewExpression":
              if (collection.callee.name === "Array") return true;
            case "ArrayExpression":
              return true;
            case "ObjectExpression":
              return false;
            case "Identifier":
              const value = findValue(collection, scope);
              return isColletctionArray(value);
            default:
              return false;
          }
        };

        const ancestor = getAncestor(node);
        const collection = getCollection(ancestor);

        if (isNodeLodash(node) && isPropertyNameMap(node)) {
          if (isColletctionArray(collection)) {
            context.report({
              node,
              message: "change _.map by native, if possible. Fix it auto with eslint.",
              fix(fixer) {
                let handler = getHandler(getAncestor(node));
                handler = sourceCode.getText(handler);
                let currentCollection = getCollection(getAncestor(node));
                currentCollection = sourceCode.getText(collection);
                const newText = `${currentCollection}.map(${handler})`;
                return fixer.replaceText(getAncestor(node), newText);
              }
            });
          }
          return;
        }
      }
    };
  }
};
