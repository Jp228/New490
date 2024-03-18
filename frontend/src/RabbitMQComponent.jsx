import React, { useState, useEffect } from 'react';
import * as Stomp from 'stompjs';
import Login from './login';
import Dashboard from './dashboard';
import { useNavigate } from 'react-router-dom';


const RabbitMQComponent = () => {
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]); // Store received messages
    const navigate = useNavigate();
    const redirectToDashboard = () => navigate('/dashboard');


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Your sendMessage function remains unchanged
    const sendMessage = (queue, messageContent) => {
        if (stompClient && isConnected) {
            // Use the `queue` parameter to dynamically set the destination
            stompClient.send(queue, {}, JSON.stringify(messageContent));
            console.log("Message sent to", queue, ":", messageContent);
        } else {
            console.log("Not connected to RabbitMQ");
        }
    };

    const handleLogin = (username, password) => {
        console.log("Login Attempt:", username, password);
        sendMessage("/queue/frontendQueue", {username: username, password: password });
        //sendMessage("/queue/backendQueue", { ID: "True"});
        // This is just a placeholder for demonstration{validation: credentials are valid}
        setIsLoggedIn(true);
    };




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
                client.subscribe('/queue/backendQueue', (receivedMessagemessage) => {
                    const receivedMessage = JSON.parse(message.body);
                    console.log("Received message: ", receivedMessagemessage);
                    if (receivedMessagemessage='True') {//receivedMessagemessage.body='True'
                        // Handle successful authentication
                        console.log('SUCCESS')
                        redirectToDashboard();
                    } else {
                        // Handle authentication failure
                        console.log("SORRY")
                        return(<h2>Sorry Incorrect Login</h2>)
                    }
                    // Update state with the new message
                    setReceivedMessages(prevMessages => [...prevMessages, receivedMessagemessage.body]);
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


    return (
        <div>
            {!isLoggedIn ? (
                <Login onLogin={handleLogin}/>
            ) : (
                <RabbitMQComponent /> 
            )}
        </div>
    );
};

export default RabbitMQComponent;