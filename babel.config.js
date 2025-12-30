// Babel.config.js is for babel compiler to support React(JSX) and typescript syntax,
// This file is also for plugging in already built preset, plugins that may be needed to compile the code to commonJS.
// Main purpose for this file is for Jest to function properly

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-react-jsx', '@babel/plugin-transform-modules-commonjs']
};
