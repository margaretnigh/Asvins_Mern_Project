
import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';
import { UserAuth } from "../context/AuthContext";
import userIcon from "../images/userIcon.png";

const Chat = () => {
    const [sdk, setSDK] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                const sdk = new window.DSChatSDK("CGOC0byXC", "chat-frame", "pub_356b6970474964734f724d2d6779394a347648392d757a5552656f64565f33384c73684e7a66384a496e6e69674b517a");
                await sdk.connect();
                setSDK(sdk);
            } catch (error) {
                console.error('Error connecting to chat:', error);
                // Handle the error (e.g., show an error message to the user)
            }
        })();
    }, []);
    

    function logout() {
    if (sdk) {
        sdk.logout();
    }
}

    const { userInfo } = UserAuth();
    const user = [{
        image: userInfo.photo === 'no-photo.jpg' ? userIcon : userInfo.photo,
        name: userInfo.fullname,
        title: 'Patient',
    },];

    sdk.join({
        username: userInfo.fullname,
        uniqueUserIdentifier: userInfo._id,
    });

    //sdk.sendPrivateMessage(message, conversationId);
    //sdk.openConversation(conversationId);

    return (
        <div className="app">
            <div className="container">
                <Sidebar user={user} />
                <div className="container">
                    <div className="content">
                        <h3>Chat</h3>
                        <iframe id="chat-frame" src="https://deadsimplechat.com/6HIDIkC16" width="100%" height="600px"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Chat;
