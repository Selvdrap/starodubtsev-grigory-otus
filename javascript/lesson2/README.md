# JavaScript Block

## Lesson 2

### Task Description

#### Write a function which reduces an array of promises

Write the `promiseReduce` function which can be called with three arguments: 1) array of functions that return a promise 2) function which will be used in reduce method 3) initial value

```javascript
const fn1 = () => {
  console.log("fn1");
  return Promise.resolve(1);
};

const fn2 = () =>
  new Promise(resolve => {
    console.log("fn2");
    setTimeout(() => resolve(2), 1000);
  });

promiseReduce([fn1, fn2], (memo, value) => memo * value, 2)
  .then(console.log)
  .catch(console.error);
```
