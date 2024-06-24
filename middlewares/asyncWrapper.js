const asyncWrapper = (fn) => {
    return async(req, res, next) => {
        try {
          await fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper



// const asyncWrapper = (fn) => {
//     return async (req, res, next) => {
//         try {
//             await fn(req, res, next); // Add 'await' here
//         } catch (error) {
//             console.log(error);
//             next(error); // Call 'next' with the error
//         }
//     };
// };

// module.exports = asyncWrapper;
