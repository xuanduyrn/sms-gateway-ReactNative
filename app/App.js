
import React, { Component } from 'react';
import {
  Text,
  View,
  Clipboard
} from 'react-native';

import FCM from "react-native-fcm";

import PushController from "./PushController";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: "",
      tokenCopyFeedback: "",
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <PushController
          onChangeToken={ token => this.setState({token: token || ""})}
        />
        <Text selectable={true} onPress={() =>
          this.setClipboardContent(this.state.token)} style={styles.instructions}>
          Token: {this.state.token}
        </Text>

        <Text style={styles.feedback}>
          {this.state.tokenCopyFeedback}
        </Text>
      </View>
    );
  }

  setClipboardContent(text) {
    Clipboard.setString(text);
    this.setState({tokenCopyFeedback: "Token copied to clipboard."});
    setTimeout(() => {this.clearTokenCopyFeedback()}, 2000);
  }

  clearTokenCopyFeedback() {
    this.setState({tokenCopyFeedback: ""});
  }
}
