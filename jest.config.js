module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '^@/app/(.*)$': '<rootDir>/app/$1', // Adjust this line if the path is different
    },
    testMatch: ['<rootDir>/app/**/*.test.[jt]s?(x)', '<rootDir>/app/**/*.spec.[jt]s?(x)'],
  };
  