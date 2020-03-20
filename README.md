# SHRI-2020: eslint-plugin-lodash-to-native

change _.map by native, if possible

## Установка
Для работы плагина предварительно нужно установить [`eslint`](https://www.npmjs.com/package/eslint) и [`babel-eslint`](https://www.npmjs.com/package/babel-eslint).

```bash
$ npm i eslint babel-eslint -D
```

Затем установить `eslint-plugin-lodash-to-native`:

```
$ npm i eslint-plugin-lodash-to-native -D
```

## Использование

Добавьте `lodash-to-native` в секцию с плагинами в `.eslintrc`, `babel-eslint` в секцию **`parser`** и правило `lodash-to-native/map` в секцию **`rules`**:

```json

```


Then configure the rules you want to use under the rules section.

```json
{ 
  "plugins": ["lodash-to-native"],
  "parser": "babel-eslint",
  "rules": {
      "lodash-to-native/map": "error"
  }
}
```

## Supported Rules

* Fill in provided rules here





