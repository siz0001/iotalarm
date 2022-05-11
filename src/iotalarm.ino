
// library import
#include "FirebaseESP8266.h"
#include <WiFiManager.h>          // For WiFi config AP

// firebase setting
#define FIREBASE_HOST ""
#define FIREBASE_AUTH ""
FirebaseData firebaseData;

// wifi setting
char* ssid_ap = "IoTAlarm";
const char* password_ap = ""; 
WiFiManager wifiManager;

// pin setting
const int trigPin = D3;
const int echoPin = D2;

// sensor 
long duration;
int distance;

int getUltraSonicSensor() {

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;

  return distance;
}

void setup()
{
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input

// wifi connect
   wifiManager.autoConnect(ssid_ap, password_ap);

  // firebase begin after wifi connect
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  
}

void loop() {
  int val = getUltraSonicSensor();

  Serial.print(F("level: "));
  Serial.print(val);
  Serial.println(F("cm "));
  Firebase.setFloat(firebaseData, "/FirebaseIOT/level", val);
  delay(1000); // 1sec 
}
