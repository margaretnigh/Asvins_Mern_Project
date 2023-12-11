import React, { useState, useEffect, useCallback } from 'react';
import { UserAuth } from '../context/AuthContext';
import InsuranceProviderSidebar from './InsuranceProviderSidebar';
import userIcon from '../images/userIcon.png';
import { WeavyClient, WeavyProvider, Chat, Conversation, ConversationList, MessengerProvider, Messenger } from '@weavy/uikit-react';
import "@weavy/uikit-react/dist/css/weavy.css";
import "../css/UserChat.css";
import Loading from "../images/loading.gif";

const UserChat = () => {
    const { userInfo } = UserAuth();
    const user = [
        {
            image: userInfo.photo === 'no-photo.jpg' ? userIcon : userInfo.photo,
            name: userInfo.fullname,
            title: 'Patient',
        },
    ];

    const [weavyClient, setWeavyClient] = useState(null);
    const [chatUser, setChatUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getToken = useCallback(async (refresh) => {
        // fetch access_token for the authenticated user with an api call to your application backend
        let _tokens = [];
        // let username = userInfo.slug;
        const username = userInfo.slug;

        let userExists = await fetch(`https://c1f194fa96a24f8da28e9c44d13e6258.weavy.io/api/users/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${"wys_I8vBiNC5FhT6Xg2Ho4OlFqRm7mD9eJ0IWZau"}`,
            },
        });

        if (userExists.ok) {
            let response = await fetch(`https://c1f194fa96a24f8da28e9c44d13e6258.weavy.io/api/users/${username}/tokens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${"wys_I8vBiNC5FhT6Xg2Ho4OlFqRm7mD9eJ0IWZau"}`,
                },
                body: JSON.stringify({
                    name: username,
                }),
            });
            if ((!refresh || refresh === "false") && _tokens.find((t) => t.username === username)) {
                response.json({ access_token: _tokens.find((t) => t.username === username).access_token });
            }
            if (response.ok) {
                let json = await response.json();
                console.log(json.access_token);
                _tokens = [..._tokens.filter((t) => t.username !== username), { username: username, access_token: json.access_token }];
                return json.access_token;
            }
        } else {
            let userResponse = await fetch(`https://c1f194fa96a24f8da28e9c44d13e6258.weavy.io/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${"wys_I8vBiNC5FhT6Xg2Ho4OlFqRm7mD9eJ0IWZau"}`,
                },
                body: JSON.stringify({
                    uid: `${username}`,
                    name: `${userInfo.fullname}`,
                    email: `${userInfo.emailid}`,
                    directory: 'asvins',
                }),
            });
        }

        return;

    }, [userInfo]);

    useEffect(() => {
        if (userInfo.slug) {
            let client = new WeavyClient({ url: 'https://c1f194fa96a24f8da28e9c44d13e6258.weavy.io', tokenFactory: getToken });
            setWeavyClient(client);
        }
    }, [getToken, chatUser, userInfo]);

    const handleLogin = (user) => {
        setChatUser(user)
    }

    const handleLogout = async () => {
        // call /logout on server to clear session cookie
        await fetch('/logout');

        // destroy the Weavy client instance
        weavyClient.destroy();

        // Reset state variables. When client property on WeavyProvider is set to null, the internal query cache is also reset. Make sure to do this when you sign out a user.
        setWeavyClient(null);
        setChatUser(null);
    }


    return (
        <div className="app">
            <div className="container">
                <InsuranceProviderSidebar user={user} />
                <div className="container">
                    <div className="content">
                        <div className="chat">
                            {userInfo ? (
                                <WeavyProvider client={weavyClient}>
                                    <MessengerProvider>
                                        <Messenger />
                                    </MessengerProvider>
                                </WeavyProvider>
                            ) : <img src={Loading} style={{ margin: "0 auto" }} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserChat;
