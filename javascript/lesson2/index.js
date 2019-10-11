async function promiseReduce(promiseArr, reducer, initialValue) {
  return await promiseArr.reduce(async (acc, current) => {
    const total = await acc.then(v => v);
    const value = await current().then(v => v);
    return reducer(total, value);
  }, Promise.resolve(initialValue));
}
