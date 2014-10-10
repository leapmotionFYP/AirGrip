#include <Servo.h> 

#define delay_set 100 //delay 

//IO ports 
#define thumb_pin 10
#define index_pin 12
#define middle_pin 11
#define ring_pin 13
#define pinky_pin 9

byte byteRead;

//Servo declaration
Servo thumb_servo;
Servo index_servo; 
Servo middle_servo;
Servo ring_servo;
Servo pinky_servo;

//finger angles
int thumb_angle=40;
int index_angle=40;
int middle_angle=40;
int ring_angle=40;
int pinky_angle=40;
                
int pos = 0;    // variable to store the servo position 
 
void setup() 
{ 
    Serial.begin(9600);
    
  //Attatching servos
  thumb_servo.attach(thumb_pin);  
  index_servo.attach(index_pin); 
  middle_servo.attach(middle_pin); 
  ring_servo.attach(ring_pin); 
  pinky_servo.attach(pinky_pin); 
} 
 
 
void loop() 
{ 
  
  
  
  if (Serial.available()) {
    /* read the most recent byte */
    byteRead = Serial.read();
    /*ECHO the value that was read, back to the serial port. */
    Serial.write(byteRead);

  switch (byteRead) {
    case '1':
      pinky_up();
      break;
    case 'q':
      pinky_dn();
      break;
    case '2':
      ring_up();
      break;
    case 'w':
      ring_dn();
      break;
    case '3':
      middle_up();
      break;
    case 'e':
      middle_dn();
      break;
    case '4':
      index_up();
      break;
    case 'r':
      index_dn();
      break;
    case '5':
      thumb_up();
      break;
    case 't':
      thumb_dn();
      break;     

    default: 
      break;
  }
delay(delay_set);

Serial.print("\n");
Serial.println(pinky_angle);
Serial.print("\t");  
Serial.println(ring_angle);
Serial.print("\t");  
Serial.println(middle_angle);
Serial.print("\t");  
Serial.println(index_angle);
Serial.print("\t");  
Serial.println(thumb_angle);
Serial.print("\t");  

}
}


void pinky_dn()
  {
    pinky_angle+=5;
   pinky_servo.write(pinky_angle);
  }  

void pinky_up()  {
    pinky_angle-=5;
   pinky_servo.write(pinky_angle);
  }   

void ring_dn() {
    ring_angle+=5;
   ring_servo.write(ring_angle);
  }   

void ring_up()  {
    ring_angle-=5;
   ring_servo.write(ring_angle);
  }   
  
  
void middle_dn()  {
    middle_angle+=5;
   middle_servo.write(middle_angle);
  }  

void middle_up()  {
    middle_angle-=5;
   middle_servo.write(middle_angle);
  }  
  
void index_dn()  {  
  index_angle+=5;
   index_servo.write(index_angle);
  }  

void index_up()  {
    index_angle-=5;
   index_servo.write(index_angle);
  }

void thumb_dn(){
    thumb_angle+=5;
   thumb_servo.write(thumb_angle);
  }  

void thumb_up()  {
   thumb_angle-=5;
   thumb_servo.write(thumb_angle);
  }   
