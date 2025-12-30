import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import * as dotenv from 'dotenv';
import '@cypress/instrument-cra';
import svgr from 'esbuild-plugin-svgr';
const codeCoverageTask = require('@bahmutov/cypress-code-coverage/plugin')

dotenv.config();

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  retries: 4,
  env: {
    MAILOSAUR_API_KEY: process.env.CYPRESS_MAILOSAUR_API_KEY,
    MAILSOAUR_SERVER_ID: process.env.CYPRESS_MAILSOAUR_SERVER_ID,
    GRAPHQL_BASE_URL: process.env.CYPRESS_GRAPHQL_BASE_URL,
    COGNITO_BASE_URL: process.env.CYPRESS_COGNITO_BASE_URL,
    COGNITO_IDENTITY_URL: process.env.CYPRESS_COGNITO_IDENTITY_URL
  },
  experimentalWebKitSupport: true,
  component: {
    setupNodeEvents (on, config) {
      return Object.assign({}, config, codeCoverageTask(on, config));
    },
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
      webpackConfig: {
        devServer: {
          port: 3001
        },
        mode: 'development',
        devtool: false,
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                    '@babel/preset-typescript'
                  ],
                  plugins: [
                    'istanbul',
                    ['@babel/plugin-transform-modules-commonjs', { loose: true }],
                    '@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-react-jsx'
                  ]
                }
              }
            }
          ]
        }
      }
    }
  },

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    specPattern: ['**/*.feature'],
    async setupNodeEvents (
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config), svgr()]
        })
      );

      // Make sure to return the config object as it might have been modified by the plugin.
      return Object.assign({}, config, codeCoverageTask(on, config));
    }
  }
});
