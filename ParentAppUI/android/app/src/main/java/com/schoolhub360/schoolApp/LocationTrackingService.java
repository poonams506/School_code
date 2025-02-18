package com.schoolhub360.schoolApp;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.location.Location;
import android.os.Build;
import android.os.IBinder;
import android.os.StrictMode;
import android.util.Log;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import com.getcapacitor.BridgeActivity;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class LocationTrackingService extends Service {

  private static final String TAG = "LocationTrackingService";
  private static final String CHANNEL_ID = "LocationTrackingChannel";
  private FusedLocationProviderClient fusedLocationClient;
  private LocationCallback locationCallback;

  private  SharedPreferences sharedPreferences;

  private static final String PREFS_NAME = "CapacitorStorage";

  @Nullable
  @Override
  public IBinder onBind(Intent intent) {
    return null; // Not bound
  }

  @Override
  public void onCreate() {
    super.onCreate();
    createNotificationChannel();
    startForeground(1, createNotification());

    fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

    sharedPreferences = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);

    // Create Location Request
    LocationRequest locationRequest = LocationRequest.create();
    locationRequest.setInterval(5000); // 5 seconds interval
    locationRequest.setFastestInterval(2000); // 2 seconds fastest interval
    locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);

    // Create Location Callback
    locationCallback = new LocationCallback() {
      @Override
      public void onLocationResult(@NonNull LocationResult locationResult) {
        if (locationResult == null) {
          return;
        }

        String ApiUrl = sharedPreferences.getString("APIUrl", "defaultValue");
        String Token = sharedPreferences.getString("TOKEN", "defaultValue");
        String ActiveTripId = sharedPreferences.getString("ActiveTripId", "defaultValue");

        Log.d(TAG, "APIUrl from Capacitor Storage: " + ApiUrl);
        Log.d(TAG, "Token from Capacitor Storage: " + Token);
        Log.d(TAG, "Active Trip Id from Capacitor Storage: " + ActiveTripId);

        for (Location location : locationResult.getLocations()) {
          Log.d(TAG, "Current location: " + location.getLatitude() + ", " + location.getLongitude());
          // You can broadcast this location or store it as per your requirement
         if(!ApiUrl.equals("defaultValue") && !Token.equals("defaultValue") && !ActiveTripId.equals("defaultValue"))
         {
           sendLocationToServer(ApiUrl,Token,ActiveTripId,location);
         }


        }
      }
    };

    // Request Location Updates
    try {
      fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, null);
    } catch (SecurityException e) {
      Log.e(TAG, "Location permission missing", e);
    }
  }

  private void sendLocationToServer(String ApiUrl,String token,String ActiveTripId, Location location) {
    StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
    StrictMode.setThreadPolicy(policy);

    try {
      // Set up the URL and connection
      URL url = new URL(ApiUrl+"/api/CabDriverApp/UpdateCabDriverLocationByTrip");
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
      conn.setRequestMethod("POST");
      conn.setRequestProperty("Authorization", "Bearer " + token);
      conn.setRequestProperty("Content-Type", "application/json; utf-8");
      conn.setRequestProperty("Accept", "application/json");
      conn.setDoOutput(true);

      // Create JSON body with location data
      String jsonInputString = "{"
        + "\"tripId\": " + ActiveTripId + ","
        + "\"lat\": " + location.getLatitude() + ","
        + "\"long\": " + location.getLongitude()
        + "}";

      // Send the request
      try (OutputStream os = conn.getOutputStream()) {
        byte[] input = jsonInputString.getBytes("utf-8");
        os.write(input, 0, input.length);
      }

      // Handle the response
      int code = conn.getResponseCode();
      if (code == 200) {
        try (BufferedReader br = new BufferedReader(
          new InputStreamReader(conn.getInputStream(), "utf-8"))) {
          StringBuilder response = new StringBuilder();
          String responseLine;
          while ((responseLine = br.readLine()) != null) {
            response.append(responseLine.trim());
          }
          Log.d(TAG, "Response from server: " + response.toString());
        }
      } else {
        Log.e(TAG, "Server returned error: " + code);
      }

      conn.disconnect();
    } catch (Exception e) {
      Log.e(TAG, "Failed to send location to server", e);
    }
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    // If the service gets killed, restart it
    return START_STICKY;
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    fusedLocationClient.removeLocationUpdates(locationCallback); // Stop location updates when service is destroyed
  }

  private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel serviceChannel = new NotificationChannel(
        CHANNEL_ID,
        "Location Tracking Service",
        NotificationManager.IMPORTANCE_DEFAULT
      );
      NotificationManager manager = getSystemService(NotificationManager.class);
      manager.createNotificationChannel(serviceChannel);
    }
  }

  private Notification createNotification() {
    Intent notificationIntent = new Intent(this, BridgeActivity.class);
    PendingIntent pendingIntent = PendingIntent.getActivity(
      this, 0, notificationIntent, PendingIntent.FLAG_IMMUTABLE
    );

    return new NotificationCompat.Builder(this, CHANNEL_ID)
      .setContentTitle("Location Tracking")
      .setContentText("Tracking your location...")
      .setSmallIcon(R.drawable.ic_launcher_foreground)
      .setContentIntent(pendingIntent)
      .build();
  }
}
