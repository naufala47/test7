/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import CheckIn from './Page/CheckIn/CheckIn';
import CheckOut from './Page/CheckOut/CheckOut';
import Dashboard from './Page/Dashboard/Dashboard';
import History from './Page/History/History';
import Ijin from './Page/Ijin/Ijin';

AppRegistry.registerComponent(appName, () => App);
