/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import App from './App';
import { name as appName } from './app.json';
import store from './src/Components/redux/store';

// Wrap your App component with Provider and pass the Redux store
AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>  {/* Redux Provider wraps your App */}
    <App />
  </Provider>
));
