const validations = require("../validation");

const validateInputs = (validationRules, requestBody) => {
  let isValid = true;
  let errors = {};
  Object.keys(validationRules).map((rule) => {
    errors[rule] = [];
    validationRules[rule].map((arg) => {
      const argsArray = arg.split(":");
      const functionName = argsArray[0];
      const [result, message] = validations[functionName](
        rule,
        requestBody[rule],
        argsArray
      );
      if (!result) {
        isValid = false;
        errors[rule].push(message);
      }
    });
  });
  return [isValid, errors];
};

const sendError = (req) => {
  const errors = {};
  Object.keys(req.errors)?.map((err) => {
    if (req.errors[err].length > 0) {
      errors[err] = req.errors[err];
    }
  });
  if (Object.keys(errors).length > 0) return [true, errors];
  return [false, null];
};

module.exports = { validateInputs, sendError };
