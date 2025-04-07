const { convert } = require("./utils/convert");

module.exports = {
  add: function (a, b) {
    return convert(a) + convert(b);
  },
};
