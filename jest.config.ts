// const path = require('path');

// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',

//   moduleNameMapper: {
//     '^@pages/(.*)$': '<rootDir>/src/pages/$1',
//     '^@components/(.*)$': '<rootDir>/src/components/$1',
//     '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
//     '^@ui-pages/(.*)$': '<rootDir>/src/components/ui/pages/$1',
//     '^@utils-types/(.*)$': '<rootDir>/src/utils/types/$1',
//     '^@utils-redux/(.*)$': '<rootDir>/src/utils/redux/$1',
//     '^@slices/(.*)$': '<rootDir>/src/storage/slices/$1',
//     '^@thunks/(.*)$': '<rootDir>/src/storage/thunks/$1',

//     '^@utils-types$': '<rootDir>/src/utils/types',
//     '^@utils-redux$': '<rootDir>/src/utils/redux',
//     '^@api$': '<rootDir>/src/utils/burger-api.ts',
//     '^@store$': '<rootDir>/src/storage/store.ts',
//     '^@hooks$': '<rootDir>/src/storage/hooks/hooks.ts',

//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
//       '<rootDir>/__mocks__/fileMock.js'
//   },

//   testMatch: [
//     '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
//     '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
//   ],

//   roots: ['<rootDir>/src']
// };

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^@ui-pages/(.*)$': '<rootDir>/src/components/ui/pages/$1',
    '^@utils-types/(.*)$': '<rootDir>/src/utils/types/$1',
    '^@utils-redux/(.*)$': '<rootDir>/src/utils/redux/$1',
    '^@slices/(.*)$': '<rootDir>/src/storage/slices/$1',
    '^@thunks/(.*)$': '<rootDir>/src/storage/thunks/$1',

    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@utils-redux$': '<rootDir>/src/utils/redux',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@store$': '<rootDir>/src/storage/store.ts',
    '^@hooks$': '<rootDir>/src/storage/hooks/hooks.ts',

    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js'
  },

  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],

  roots: ['<rootDir>/src']
};
export default config;
