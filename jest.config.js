/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.ts',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.ts',
    '^uuid$': require.resolve('uuid')
  },
  transformIgnorePatterns: ['/node_modules/(?!(uuid)/)'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/tests/setupTests.ts'
  ]
};
