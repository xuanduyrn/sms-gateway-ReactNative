import React, { Component } from "react";

import { Platform} from 'react-native';

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";
import SmsAndroid  from "react-native-sms-android";

export default class PushController extends Component {
  //Send SMS
  MY_Sms( numberSMS , bodySMS ) {
    SmsAndroid.sms(
      numberSMS , // phone number to send sms to
      bodySMS, // sms body
      //Anh quan oi anh muon no gui tu dong thi thay sendDirect , bon em test bang cach no cho khoi ton tien sms :D
      'sendIndirect', // sendDirect or sendIndirect
      (err, message) => {
        if (err){
          console.log("error");
        } else {
          console.log(message); // callback message
        }
      }
    );
  }

  componentDidMount() {
    //Permisson
    FCM.requestPermissions();
    //Default  Android
    FCM.getFCMToken().then(token => {
      this.props.onChangeToken(token);
    });
    //IF IOS
    if(Platform.OS === 'ios'){
      FCM.getAPNSToken().then(token => {
      });
    }
    //Default Notification
    FCM.getInitialNotification().then(notif => {

    });

    this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
      setTimeout(function() {
      FCM.presentLocalNotification({

        vibrate: 500,
        title: notif.title,
        body: notif.fcm.body,
        priority: "high",
        show_in_foreground: true,
        picture: 'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png',
      });
      FCM.isDirectChannelEstablished().then(d => console.log(d));
    }, 1000);


      //When App Running
      if(notif.local_notification){
        return ;
      }

      //Click When Not Running
      if(notif.opened_from_tray){
        return ;
      }else {
        this.MY_Sms(notif.fcm.tag , notif.fcm.body);
      }

      if(Platform.OS ==='ios'){
      switch(notif._notificationType){
        case NotificationType.Remote:
          notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
          break;
        case NotificationType.NotificationResponse:
          notif.finish();
          break;
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
          break;
      }
    }

      this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
        console.log("TOKEN (refreshUnsubscribe)", token);
        this.props.onChangeToken(token);
      });

      // direct channel related methods are ios only
      // directly channel is truned off in iOS by default, this method enables it
      FCM.enableDirectChannel();
      this.channelConnectionListener = FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
        console.log('direct channel connected' + data);
      });
    })
  }

  //Component Will
  componentWillUnmount() {
    this.notificationListener.remove();
    this.refreshTokenListener.remove();
  }

  render() {
    return null;
  }
}
