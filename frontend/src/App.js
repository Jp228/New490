// import React, { useState, useEffect } from 'react';
// import * as Stomp from 'stompjs';
// import Login from './login';
// import Dashboard from './dashboard';
// import { useNavigate } from 'react-router-dom';


// const RabbitMQComponent = () => {
//     const [stompClient, setStompClient] = useState(null);
//     const [isConnected, setIsConnected] = useState(false);
//     const [message, setMessage] = useState('');
//     const [receivedMessages, setReceivedMessages] = useState([]); // Store received messages
//     //const [showDashboard, setShowDashboard] = useState(false);
//     const navigate = useNavigate();
//     const redirectToDashboard = () => navigate('/dashboard');


//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleLogin = (username, password) => {
//         console.log("Login Attempt:", username, password);
//         //sendMessage("/queue/frontendQueue", { ID: "Login", username: username, password: password });
//         sendMessage("/queue/backendQueue", { ID: "True"});
//         // Here you would typically check credentials, etc.
//         // This is just a placeholder for demonstration{validation: credentials are valid}
//         setIsLoggedIn(true);
//     };




//     useEffect(() => {
//         const connect = () => {
//             const socket = new WebSocket('ws://192.168.192.211:15674/ws');
//             const client = Stomp.over(socket);

//             const headers = {
//                 login: "admin",
//                 passcode: "admin",
//             };

//             client.connect(headers, frame => {
//                 console.log('Connected: ' + frame);
//                 setStompClient(client);
//                 setIsConnected(true);

//                 // Subscribe to the backend_queue
//                 client.subscribe('/queue/backendQueue', (receivedMessagemessage) => {
//                     // Assuming message body is a JSON string
//                     //const receivedMessage = JSON.parse(message.body);
//                     console.log("Received message: ", receivedMessagemessage.body);
//                     if (receivedMessagemessage.body='True') {
//                         // Handle successful authentication
//                         console.log('SUCCESS')
//                         //setShowDashboard(true);
//                         //window.location.href = '/dashboard';
//                         redirectToDashboard();
//                     } else {
//                         // Handle authentication failure
//                         console.log("SORRY")
//                     }
//                     // Update state with the new message
//                     setReceivedMessages(prevMessages => [...prevMessages, receivedMessagemessage.body]);
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


//     // Your sendMessage function remains unchanged
//     const sendMessage = (queue, messageContent) => {
//         if (stompClient && isConnected) {
//             // Use the `queue` parameter to dynamically set the destination
//             // Convert the `messageContent` parameter to a JSON string to send as the message body
//             stompClient.send(queue, {}, JSON.stringify(messageContent));
//             console.log("Message sent to", queue, ":", messageContent);
//         } else {
//             console.log("Not connected to RabbitMQ");
//         }
//     };

//     return (
//         <div>
//             {!isLoggedIn ? (
//                 <Login onLogin={handleLogin} />
//             ) : (
//                 <RabbitMQComponent />
//                 // <Dashboard/>    
//             )}
//             {/* {showDashboard ? <Dashboard /> : <div>Please Login...</div>} */}
//         </div>
//     );
// };

// export default RabbitMQComponent;





// import React, { useState, useEffect } from 'react';
// import * as Stomp from 'stompjs';
// import Login from './login';
// import Dashboard from './dashboard';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// const RabbitMQComponent = () => {
//     const [stompClient, setStompClient] = useState(null);
//     const [isConnected, setIsConnected] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const navigate = useNavigate(); // Hook for navigation

//     useEffect(() => {
//         const connect = () => {
//             const socket = new WebSocket('ws://192.168.192.211:15674/ws');
//             const client = Stomp.over(socket);
//             const headers = {
//                 login: "admin",
//                 passcode: "admin",
//             };

//             client.connect(headers, frame => {
//                 console.log('Connected: ' + frame);
//                 setStompClient(client);
//                 setIsConnected(true);

//                 client.subscribe('/queue/backendQueue', (message) => {
//                     console.log("Received message: ", message.body);
//                     if (message.body === 'True') { // Corrected to use comparison operator
//                         console.log('SUCCESS');
//                         navigate('/dashboard'); // Navigate to Dashboard
//                     } else {
//                         console.log("SORRY");
//                     }
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
//     }, [navigate]); // Added navigate as a dependency

//     return (
//         <div>
//             {!isLoggedIn ? (
//                 <Login />
//             ) : (
//                 <Dashboard />
//             )}
//         </div>
//     );
// };

// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<RabbitMQComponent />} />
//                 <Route path="/login" element={<Login/>}/>
//                 <Route path="/dashboard" element={<Dashboard />} />
//             </Routes>
//         </Router>
//     );
// };

// export {App, RabbitMQComponent};



// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import RabbitMQComponent from './RabbitMQComponent';

// const App = () => {
//     return (
//         <Router>
//             <RabbitMQComponent />
//         </Router>
//     );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RabbitMQComponent from './RabbitMQComponent';
import Dashboard from './dashboard';
import Login from './login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RabbitMQComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;