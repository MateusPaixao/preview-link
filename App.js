import React, { Component } from 'react';
import { AppState, View, Button, Text, StyleSheet } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushController from './controllers/PushController'; //The push controller created earlier

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
  };
  
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  };
  
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  };
  
  // This will notify the user in 3 seconds after sending the app to the 
  // background (like after pressing the home button or switching apps)
  handleAppStateChange(appState) {

    if (appState == 'background') {
      // Only work with modification on AndroidManifest.xmsl
      // See https://www.npmjs.com/package/react-native-push-notification
      // Schedule a notification
      PushNotification.localNotificationSchedule({
        message: 'Scheduled delay notification message', // (required)
        date: new Date(Date.now() + (4 * 1000)) // in 3 secs
      });
    }
  };

  sendNotification() {
    PushNotification.localNotification({
      message: 'You pushed the notification button!',

      title: "My Notification Title",
      color: "red",
      subText: "This is a subText",
      ticker: "My Notification Ticker",

      data: { user: 'Mateus' }
    });
    
  };

  render() {
    return (
      <View>
        <Button title='Press here for a notification'
          onPress={this.sendNotification} />
        <PushController />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});