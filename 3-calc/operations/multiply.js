const { convert } = require("./utils/convert");

module.exports = {
  multiply: function (a, b) {
    return convert(a) * convert(b);
  },
};
