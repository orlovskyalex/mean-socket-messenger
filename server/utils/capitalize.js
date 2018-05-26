const capitalize = (string) => {
  if (!string) {
    return '';
  }

  return string.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase()));
};

module.exports = capitalize;
