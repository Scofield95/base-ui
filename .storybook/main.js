const path = require('path');
module.exports = {
  "stories": [
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, '../packages'),
      'src': path.resolve(__dirname, '../src'),
      'vue': 'vue/dist/vue.esm-bundler.js'
    }

    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      include: path.resolve(__dirname, '../'),
    });

    // config.module.rules.push({
    //   test: /\.vue$/,
    //   use: ['raw-loader'],
    //   include: path.resolve(__dirname, '../'),
    // });
    // Return the altered config
    return config;
  },
}