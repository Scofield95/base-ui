module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/packages/$1"
  },
  testMatch: [
    // '<rootDir>/src/**/__tests__/**/*.[jt]s',
    '<rootDir>/packages/**/**/*.(spec|test).[jt]s'
  ]
}
