module.exports = {
  required: (fieldName, value, args) => {
    if (value?.trim().length > 0) {
      return [true, null];
    }
    return [false, `${fieldName} is required`];
  },
  matchLength: (fieldName, value, args) => {
    const length = args[1];
    const unit = args[2];
    if (value?.trim().length == length) {
      return [true, null];
    }
    return [false, `${fieldName} should be exactly ${length} ${unit} long`];
  },
  minLength: (fieldName, value, args) => {
    const [_, length, unit] = args;

    if (value?.trim().length >= length) {
      return checkUnitValidation(fieldName, value, unit);
    }
    return [false, `${fieldName} should be at least ${length} ${unit} long`];
  },
  maxLength: (fieldName, value, args) => {
    const [_, length, unit] = args;
    if (value?.trim().length <= length) {
      return checkUnitValidation(fieldName, value, unit);
    }
    return [false, `${fieldName} should be less than ${length} ${unit}`];
  },
  exactLength: (fieldName, value, args) => {
    const [_, length, unit] = args;
    if (value?.trim().length == length) {
      return checkUnitValidation(fieldName, value, unit);
    }
    return [false, `${fieldName} should be exactly ${length} ${unit}`];
  },
  email: (fieldName, email, args) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return [true, null];
    }
    return [false, "Please enter a valid email"];
  },
};

function checkUnitValidation(fieldName, value, unit) {
  if (unit === "digits") {
    return checkDigitsValidation(fieldName, value, unit);
  }
  return [true, null];
}

function checkDigitsValidation(fieldName, value, unit) {
  if (/^[0-9]*$/.test(value)) {
    return [true, null];
  } else {
    return [false, `${fieldName} should consists of only ${unit}`];
  }
}
