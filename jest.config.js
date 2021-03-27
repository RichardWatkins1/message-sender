module.exports = {
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/fixtures/'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/fixtures/'
  ]
}
