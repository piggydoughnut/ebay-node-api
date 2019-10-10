const setOptions = function (options, params) {
    if (!params) {
        params = '';
    }
    options.forEach((value, key) => {
        params += '&'.concat(key, '=', value);
    });
    return params;
};

module.exports = {
    setOptions
};
