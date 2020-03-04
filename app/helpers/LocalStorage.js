// const LocalStorage = {
//     get(key) {
//         return AsyncStorage.getItem(key).then(value => JSON.parse(value));
//     },

//     save(key, value) {
//         return AsyncStorage.setItem(key, JSON.stringify(value));
//     },

//     update(key, value) {
//         return LocalStorage.get(key).then(item => {
//             // if current value is a string, then overwrite; else merge objects
//             const v = typeof value === 'string' ? value : Object.assign({}, item, value);
//             return AsyncStorage.setItem(key, JSON.stringify(v));
//         });
//     },

//     delete(key) {
//         return AsyncStorage.removeItem(key);
//     },
// };

// export default LocalStorage;
