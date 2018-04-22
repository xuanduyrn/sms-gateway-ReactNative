package com.smsgate;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import com.rhaker.reactnativesmsandroid.RNSmsAndroidPackage;
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }




  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new FIRMessagingPackage(),
      new RNSmsAndroidPackage(),
      new MainReactPackage(),
            new BackgroundTimerPackage());
  }
};
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
