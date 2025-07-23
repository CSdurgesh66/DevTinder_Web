import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';

const Chat = () => {

    const { targetUserId } = useParams();
    const [message, setMessage] = useState([]);

    const [newMessage, setNewMessage] = useState("");

    const userData = useSelector((store) => store.user);
    const userId = userData?.data?._id;
    const firstName = userData?.data?.firstName;
    console.log("user ka data h chat", userData)

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocketConnection();
        socket.emit('joinChat', { firstName, userId, targetUserId });


        socket.on("messageRecieved", ({ firstName, text }) => {
            console.log("fronted" + firstName + " - " + text);

            setMessage(messages => [...messages, { firstName, text }]);

        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId]);

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit('sendMessage', {
            firstName,
            userId,
            targetUserId,
            text: newMessage
        });
        setNewMessage("");
    }


    return (

        // <div className='w-[50%] mx-auto my-10 border border-gray-600 py-3 h-[500px] relative'>
        //     <div className="chat chat-start ml-5" >
        //         <div className="chat-image avatar"></div>
        //         {message.map((msg,index) =>{
        //                 return (
        //                    <div key={index}>
        //                      <div  className="chat-header">
        //                            {msg.firstName}
        //                         <div className="chat-bubble">{msg.text}</div>
        //                         <time className="text-xs opacity-50">12:45</time>
        //                         </div>
        //                          <div className="chat-header">  
        //                          <time className="text-xs opacity-50">12:45</time>
        //                      </div>
        //                      <div className="chat-footer opacity-50">Delivered</div>
        //                     </div>
        //                 )
        //             })}



        //     </div>

        //     <div className='flex flex-row  absolute bottom-5'>
        //         <input type="text" placeholder="Type a message..." className=" p-2 ml-10 input input-bordered w-full mr-5"
        //         value={newMessage}
        //         onChange={(e) => setNewMessage(e.target.value)}
        //         />
        //         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-10 py-2 btn  "
        //         onClick={sendMessage}
        //         >
        //             Send
        //             </button>
        //     </div>
        // </div>

        <div className='w-[50%] border-2 mx-auto my-10 border border-gray-600 py-3 h-[500px] relative bg-black'>
            <div className="chat chat-start ml-5 flex flex-col">
                {/* <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div> */}
                {message.map((msg,index) => {
                    return (
                        <div key={index}>
                            <div className="chat-header">
                                {msg.firstName}
                                <time className="text-xs opacity-50">12:45</time>
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            <div className="chat-footer opacity-50">Delivered</div>
                        </div>
                    )
                })}


            </div>

            <div className='flex flex-row  absolute bottom-5'>
                <input type="text" placeholder="Type a message..." className=" p-2 ml-10 input input-bordered w-full mr-5"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-10 py-2 btn  "
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>




        </div>
    )
}

export default Chat