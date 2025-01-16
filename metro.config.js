const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// Wrap the default Metro config with Reanimated config
const reanimatedConfig = wrapWithReanimatedMetroConfig(defaultConfig);

// Merge any additional custom config if needed (e.g., for custom assets or other modifications)
const customConfig = {
  // Any additional Metro config options can go here
};

// Merged config will include Reanimated and any custom modifications
const finalConfig = mergeConfig(reanimatedConfig, customConfig);

module.exports = finalConfig;
