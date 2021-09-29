//https://www.eclipse.org/paho/clients/js/
but1=" ";
but2=" ";

function LED1_On() {
	//alert("led on");
	console.log("led on");
	//document.getElementById("sensor").innerHTML="led on";
	message = new Paho.MQTT.Message("hist1");
    	message.destinationName = "kbtz14k@gmail.com/test1";
    	client.send(message);
	but1="h1";
  
}
function LED1_Off(){	
	//alert("led off");
	console.log("led off");
	message = new Paho.MQTT.Message("hist2");
    	message.destinationName = "kbtz14k@gmail.com/test1";
    	client.send(message);
	but2="h2";
	//document.getElementById("sensor").innerHTML="led off";
}






// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "kbtz14k@gmail.com",
    password: "playboy1995",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("kbtz14k@gmail.com/test");//topico al que estoy suscrito 
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "kbtz14k@gmail.com/test1";//topico del mensaje que recibo 
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
	 // document.getElementById("sensor").innerHTML=message.payloadString;
	  sms=message.payloadString;
	  s1=sms.split(";");
	  nv=s1.length;
	  document.getElementById("sensor").innerHTML=s1[0];
	  document.getElementById("sensor1").innerHTML=s1[1];
	  if(nv>=3 && but1=="h1"){
		  document.getElementById("Historial").innerHTML=s1[3];
	  }
	   if(nv>=3 but2=="h2"){
		  document.getElementById("Historial1").innerHTML=s1[3];
	  }
  }
  
