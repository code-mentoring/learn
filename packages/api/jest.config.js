module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
      diagnostics: false
    }
  },

  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/Database/seeders/*'
  ]
};
