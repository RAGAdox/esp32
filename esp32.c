#include <WiFi.h>
#include <HTTPClient.h>
#include <string.h>
//DEFINING PIN NUMBERS SO THAT IT CAN BE USED LATER 
#define LED0 15         //PIN 15 USED FOR LED0 
#define LED1 22         //PIN 22 USED FOR LED0
//HARDCODED SSID AND PASSWORD . NEEDS TO BE CHANGED IS THE WIFI CONNECTION IS CHANGED
const char* ssid = "Arunima";           
const char* password =  "12345678";

void receiveStatus(){
    HTTPClient http;
    http.begin("http://13.233.59.118:6000/api/status");
    int httpResponseCode = http.GET();
    if(httpResponseCode>0){
        String payload = http.getString();
        Serial.println(httpResponseCode);
        Serial.println(payload);
        int index = payload.indexOf(',');
        if(index!=-1){
            String var_led0 = payload.substring(0,index);
            String var_led1 = payload.substring(index);
            if(var_led0=="true")
                digitalWrite(LED0, HIGH);
            else
                digitalWrite(LED0, LOW);
            if(var_led1=="true")
                digitalWrite(LED1, HIGH);
            else
                digitalWrite(LED1, LOW);
        }
        else{
            Serial.println("Error in fetching status");
        }
    }else{
        Serial.println("Error sending request");
    }
    http.end();
}


void setup() {
    Serial.begin(115200);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi..");
    }

    Serial.println("Connected to the WiFi network");
    if(WiFi.status() == WL_CONNECTED)
        receiveStatus();
}


void loop() {
    if ((WiFi.status() == WL_CONNECTED)) {
        receiveStatus();
        delay(100);
    }
}