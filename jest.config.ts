import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
const config: Config = {
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'jsdom', 
  
}

setupfilesafterenv: ['<rootDir>/jest.setup.ts']
 
export default createJestConfig(config)
