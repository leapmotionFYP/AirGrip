// var webSocket = require('ws'),
//     ws = new webSocket('ws://127.0.0.1:6437');

// ws.on('message', function(data, flags) {
//     console.log(data + '\n'+ '\n');
// });



// var five = require('johnny-five'),
//     board = new five.Board(),
//     led;

// board.on('ready', function() {
//     led = new five.Led(8);
//     led.strobe();
// });


var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    five = require('johnny-five'),
    board = new five.Board({
        port: "/dev/tty.leap-DevB"
    }),
    // board = new five.Board(),
    motor1Pin1,motor1Pin2,motor2Pin1,motor2Pin2,frame, i=0;




    board.on('ready', function() {
    

    motor1Pin1 = new five.Led(9);    
    motor1Pin2 = new five.Led(8);   
    motor2Pin1 = new five.Led(11);    
    motor2Pin2 = new five.Led(10);   
    
        motor1Pin1.off();
        motor1Pin2.off();
        motor2Pin1.off();
        motor2Pin2.off();

    this.repl.inject({
    led: new five.Led(13)
    });

    ws.on('message', function(data, flags) {
    	i++;


    	if (i%40 == 0) {
        frame = JSON.parse(data); 
        


        // console.log('hands: ' + frame.hands.length);    

        // if (frame.hands && frame.hands.length==1) {
        //     console.log('hands: 1');
        //     led1.on();
        // }
        
        // if (frame.hands && frame.hands.length==2) {
        //     console.log('hands: 2');
        //     // led2.on();
        // }
        

        // var hand = frame.hands[0];
        // var pointables = hand.pointables;
        // var fingers = hand.fingers;
        // var tools = hand.tools;
        
		/*Palm Position — The center of the palm measured in millimeters 
		from the Leap Motion origin.*/
		/*Palm Velocity — The speed of the palm in millimeters per second.*/
		/*Palm Normal — A vector perpendicular to the plane formed by the palm of the hand.
		The vector points downward out of the palm.*/
		/*Direction — A vector pointing from the center of the palm toward the fingers.*/
    

        if (frame.hands && frame.hands.length>0) {

        var pointable = frame.pointables[1];
        var hand = frame.hands[0];
        var handposition = hand.palmPosition;

        if(frame.hands.length == 2){
            console.log('Break');
            motor1Pin1.off();
            motor1Pin2.off();
            motor2Pin1.off();
            motor2Pin2.off();
        }

        else{


        if(handposition[2]< (-40)) {
            console.log('move Forward');
            motor1Pin1.on();
            motor2Pin1.on();
            motor1Pin2.off();
            motor2Pin2.off();

        }

        
        else if(handposition[0]< (-40)) {
            console.log('move Left');
            motor1Pin2.off();
            motor2Pin1.on();
            motor1Pin1.off();
            motor2Pin2.off();
        }

        else if (handposition[0]>20) {
            console.log('move Right');
             motor1Pin1.on();
             motor2Pin2.off();
             motor1Pin2.off();
             motor2Pin1.off();
        }

        else if (handposition[2]> 20)  {
            console.log('move Backward');
            motor1Pin2.on();
            motor2Pin2.on();
            motor1Pin1.off();
            motor2Pin1.off();
        }
        else if (handposition[2]<40) {
            console.log('center Break');
            motor1Pin1.off();
            motor1Pin2.off();
            motor2Pin1.off();
            motor2Pin2.off();

        }

    }

        //console.log(hand.palmPosition);
    }

		i=0;
		};

    });
});