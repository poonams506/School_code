package com.schoolhub360.schoolApp;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.BridgeActivity;


public class MainActivity extends BridgeActivity {

  private static final int LOCATION_PERMISSION_REQUEST_CODE = 1;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    if (ContextCompat.checkSelfPermission(this,"android.permission.ACCESS_FINE_LOCATION")
      != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(this, new String[]{
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION"
      }, LOCATION_PERMISSION_REQUEST_CODE);
    } else {
      startLocationTrackingService();
    }

  }

  private void startLocationTrackingService() {
    Intent serviceIntent = new Intent(this, LocationTrackingService.class);
    startForegroundService(serviceIntent);
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
   super.onRequestPermissionsResult(requestCode,permissions,grantResults);
    if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
      if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
        startLocationTrackingService();
      } else {
        // Handle permission denial
      }
    }
  }
}
