# SHRI-2020: eslint-plugin-lodash-to-native

Плагин содержит правило, которое предлагает заменить функцию `_.map`, предоставленную библиотекой [`lodash`](https://lodash.com/docs/4.17.15#map), на нативный метод массива [`.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/map) в случае, если `_.map` вызван для массива, который **явно** задан в рамках проверяемого файла.  

Правило не сработает, если в `_.map` был передан не массив или массив предположительно возвращается из другой функции.

## Пример работы  

**До:**
```js
const array = [1, 2, 3];
const result = _.map(array, (x) => x * 2);

const result2 = _.map([1, 2, 3], (x) => x * 2);

const array2 = new Array([1, 2, 3]);
const result = _.map(array2, (x) => x * 2);

function argIsArrayDefault (arr = []) {
    return _.map(arr, (x) => x * 2);
}

function noHaveDefaultValue (arr) {
    return _.map(arr, (x) => x * 2);
}

const object = {1: 1, 2: 2, 3: 3};
const resultObj = _.map(object, (x) => x * 2);
```  

**После:**  

```js
// произошла замена
const array = [1, 2, 3];
const result = array.map((x) => x * 2);

const result2 = [1, 2, 3].map((x) => x * 2);

const array2 = new Array([1, 2, 3]);
const result = array2.map((x) => x * 2);

function argIsArrayDefault (arr = []) {
    return arr.map((x) => x * 2);
}

// осталось без изменений
function noHaveDefaultValue (arr) {
    return _.map(arr, (x) => x * 2);
}

const object = {1: 1, 2: 2, 3: 3};
const result2 = _.map(object, (x) => x * 2);
```  

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
{ 
  "plugins": ["lodash-to-native"],
  "parser": "babel-eslint",
  "rules": {
      "lodash-to-native/map": "error"
  }
}
```
