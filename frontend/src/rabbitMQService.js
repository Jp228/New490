import React, { useState, useEffect } from 'react';
import * as Stomp from 'stompjs';


const RabbitMQComponent = () => {
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]); // Store received messages



    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (username, password) => {
        console.log("Login Attempt:", username, password);
        sendMessage("/queue/frontendQueue", { username: username, password: password });
        // Here you would typically check credentials, etc.
        // This is just a placeholder for demonstration
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
    const sendMessage = (queue, messageContent) => {
        if (stompClient && isConnected) {
            // Use the `queue` parameter to dynamically set the destination
            // Convert the `messageContent` parameter to a JSON string to send as the message body
            stompClient.send(queue, {}, JSON.stringify(messageContent));
            console.log("Message sent to", queue, ":", messageContent);
        } else {
            console.log("Not connected to RabbitMQ");
        }
    };

    
};

export default RabbitMQComponent;