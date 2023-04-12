// Custom step methods can be appended to 'I' object in this file

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const customActions = function () {
  return actor({
    // Define custom steps here, use 'this' to access default methods of 'I'
    // It is recommended to place a general 'login' function here
  });
};

export = customActions;
