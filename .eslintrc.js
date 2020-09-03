module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx'],
        map: [
          ['~', './'],
        ],
      },
    },
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
