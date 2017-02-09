'use strict';

import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    PixelRatio,
    NavigatorIOS
} from 'react-native';
import App from './app/components/AccountHome';
// import App from './app/components/NavigatorIOSApp';

AppRegistry.registerComponent('MapApp', () => App);
