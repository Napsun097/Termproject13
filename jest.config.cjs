module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'], // Add this line to include the setup file
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.png$': '<rootDir>/__mocks__/fileMock.js',
  },
};