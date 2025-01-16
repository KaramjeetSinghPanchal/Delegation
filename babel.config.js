module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Reanimated plugin must be included at the end of the plugins list
  ],
};
