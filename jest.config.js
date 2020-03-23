// eslint-disable-next-line fp/no-mutation
module.exports = {
  projects: [
    { preset: 'jest-expo/ios', timers: 'fake' },
    { preset: 'jest-expo/android', timers: 'fake' }
  ],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: -25
    }
  },
  collectCoverageFrom: [
    './**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/theme/**',
    '!**/const/**',
    '!**/coverage/**',
    '!**.config**',
    '!**SystemJSConfig**',
    '!./screens/**',
    '!**/components/common/keyboardAvoidingView/**'
  ],
  transformIgnorePatterns: [
    // eslint-disable-next-line max-len
    'node_modules/(?!(jest-)?react-native|react-native-base64|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-utils|@react-utils/.*|@unimodules/.*|sentry-expo|native-base)'
  ],
  timers: 'fake'
};
