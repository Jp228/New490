//import './App.css';
//import './publisher.js'


/*function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}*/

//export default App


// import React, { useState, useEffect } from 'react';
// import * as Stomp from 'stompjs';

// const RabbitMQComponent = () => {
//     const [stompClient, setStompClient] = useState(null);
//     const [isConnected, setIsConnected] = useState(false);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         // Function to connect to RabbitMQ
//         const connect = () => {
//             const socket = new WebSocket('ws://192.168.192.211:15674/ws'); // Use your RabbitMQ Web-STOMP endpoint
//             const client = Stomp.over(socket);

//             const headers = {
//                 login: "admin", // secure your credentials for production environments
//                 passcode: "admin",
//             };

//             client.connect(headers, frame => {
//                 console.log('Connected: ' + frame);
//                 setStompClient(client);
//                 setIsConnected(true);
//             }, error => {
//                 console.error('Error connecting to RabbitMQ:', error);
//             });
//         };

//         connect(); // Automatically connect on component mount

//         // Cleanup function to disconnect when the component unmounts
//         return () => {
//             if (stompClient && isConnected) {
//                 stompClient.disconnect(() => {
//                     console.log("Disconnected from RabbitMQ");
//                     setIsConnected(false);
//                 });
//             }
//         };
//     }, []); // Empty dependency array ensures this effect runs only once on mount

//     const sendMessage = () => {
//         if (stompClient && isConnected) {
//             stompClient.send("/queue/frontendQueue", {}, JSON.stringify({ message: message }));
//             console.log("Message sent: ", message);
//         } else {
//             console.log("Not connected to RabbitMQ");
//         }
//     };

//     return (
//         <div>
//             <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
//             <button onClick={sendMessage}>Send Message</button>
//         </div>
//     );
// };

//  export default RabbitMQComponent;






// import React, { useState, useEffect } from 'react';
// import * as Stomp from 'stompjs';

// const RabbitMQComponent = () => {
//     const [stompClient, setStompClient] = useState(null);
//     const [isConnected, setIsConnected] = useState(false);
//     const [message, setMessage] = useState('');
//     const [receivedMessages, setReceivedMessages] = useState([]); // New state to store received messages

//     useEffect(() => {
//         const connect = () => {
//             const socket = new WebSocket('ws://192.168.192.211:15674/ws'); // Use your RabbitMQ Web-STOMP endpoint
//             const client = Stomp.over(socket);

//             const headers = {
//                 login: "admin",
//                 passcode: "admin",
//             };

//             client.connect(headers, frame => {
//                 console.log('Connected: ' + frame);
//                 setStompClient(client);
//                 setIsConnected(true);

//                 // Subscribe to the backendQueue here
//                 console.log('commect')
//                 client.subscribe('/queue/backend_queue', (message) => {
//                     // Assuming the message body is plain text
//                     const newMessage = JSON.parse(message.body);
//                     setReceivedMessages(prevMessages => [...prevMessages, newMessage]);
//                     console.log("Received message: ", newMessage);
//                 });
//             }, error => {
//                 console.error('Error connecting to RabbitMQ:', error);
//             });
//         };

//         connect();

//         return () => {
//             if (stompClient && isConnected) {
//                 stompClient.disconnect(() => {
//                     console.log("Disconnected from RabbitMQ");
//                     setIsConnected(false);
//                 });
//             }
//         };
//     }, []);

//     const sendMessage = () => {
//         if (stompClient && isConnected) {
//             stompClient.send("/queue/frontendQueue", {}, JSON.stringify({ message: message }));
//             console.log("Message sent: ", message);
//         } else {
//             console.log("Not connected to RabbitMQ");
//         }
//     };

//     return (
//         <div>
//             <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
//             <button onClick={sendMessage}>Send Message</button>
//             <div>
//                 <h2>Received Messages</h2>
//                 <ul>
//                     {receivedMessages.map((msg, index) => (
//                         <li key={index}>{msg.message}</li> // Display each message
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default RabbitMQComponent;






import React, { useState, useEffect } from 'react';
import * as Stomp from 'stompjs';

const RabbitMQComponent = () => {
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]); // Store received messages

    useEffect(() => {
        const connect = () => {
            const socket = new WebSocket('ws://192.168.192.211:15674/ws');
            const client = Stomp.over(socket);

            const headers = {
                login: "admin",
                passcode: "admin",
            };

            client.connect(headers, frame => {
                console.log('Connected: ' + frame);
                setStompClient(client);
                setIsConnected(true);

                // Subscribe to the backend_queue
                client.subscribe('/exchange/custom_direct/backend_queue', (message) => {
                    // Assuming message body is a JSON string
                    const receivedMessage = JSON.parse(message.body);
                    console.log("Received message: ", receivedMessage);

                    // Update state with the new message
                    setReceivedMessages(prevMessages => [...prevMessages, receivedMessage]);
                });
            }, error => {
                console.error('Error connecting to RabbitMQ:', error);
            });
        };

        connect();

        return () => {
            if (stompClient && isConnected) {
                stompClient.disconnect(() => {
                    console.log("Disconnected from RabbitMQ");
                    setIsConnected(false);
                });
            }
        };
    }, []);

    // Your sendMessage function remains unchanged
    const sendMessage = () => {
        if (stompClient && isConnected) {
            stompClient.send("/queue/frontendQueue", {}, JSON.stringify({ message: message }));
            console.log("Message sent: ", message);
        } else {
            console.log("Not connected to RabbitMQ");
        }
    };

    return (
        <div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send Message</button>
            <div>
                <h2>Received Messages</h2>
                <ul>
                    {receivedMessages.map((msg, index) => (
                        <li key={index}>{msg.message}</li> // Adjust according to the structure of your messages
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RabbitMQComponent;









































































/*
import React, { useState, useEffect } from 'react';
import * as Stomp from 'stompjs';

const RabbitMQComponent = () => {
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        const connect = () => {
            const socket = new WebSocket('ws://192.168.192.1:15674/ws'); // Use your RabbitMQ Web-STOMP endpoint
            const client = Stomp.over(socket);
            client.debug = null; // Optionally disable console logging

            const headers = {
                login: "admin", // secure your credentials
                passcode: "admin",
            };

            client.connect(headers, frame => {
                console.log('Connected: ' + frame);
                setStompClient(client);
                setIsConnected(true);

                // Subscribe to a queue
                const subscription = client.subscribe('/queue/frontendQueue', (message) => {
                    // Assuming the message body is a text message
                    const body = JSON.parse(message.body);
                    console.log('Received message:', body);

                    // Update state to include the new message
                    setReceivedMessages(prevMessages => [...prevMessages, body]);
                });

            }, error => {
                console.error('Error connecting to RabbitMQ:', error);
            });
        };

        connect();

        return () => {
            if (stompClient && isConnected) {
                stompClient.disconnect(() => {
                    console.log("Disconnected from RabbitMQ");
                    setIsConnected(false);
                });
            }
        };
    }, []);

    const sendMessage = () => {
        if (stompClient && isConnected) {
            stompClient.send("/queue/frontendQueue", {}, JSON.stringify({ message: message }));
            console.log("Message sent: ", message);
        } else {
            console.log("Not connected to RabbitMQ");
        }
    };

    return (
        <div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send Message</button>
            <div>
                <h3>Received Messages</h3>
                <ul>
                    {receivedMessages.map((msg, index) => (
                        <li key={index}>{msg.message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
*/
//export default RabbitMQComponent;
