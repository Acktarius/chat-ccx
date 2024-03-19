import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

function ChatMessage({ message , type }) {
  return (
  <div className={`flex w-full ${type === "send" ? "justify-start" : "justify-end"}`}>
    {type === "send" ? (
      <div className="bg-grey-700 p-2 rounded-b-lg rounded-tr-lg text-jaune-400">
      {message}
      </div>
    ) : (
        <div className="bg-white-100 p-2 rounded-b-lg rounded-tl-lg text-black-900">
        {message.split("###").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        </div>
    )}
  </div>
  );
}

function App() {

  const [input_message, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [newSocket, setNewSocket] = useState(null);

  
  useEffect(() => {
    //open connection to server
    const newSocket = io("http://localhost:8080");
    setNewSocket(newSocket);
    newSocket.on("response" , (message) => {
      setMessages((prev) => [... prev, { type: "receive", message }]);
    });
   }, []);

  const sendMessage = () => {
    setMessages((prev) => [... prev, { type: "send", message: input_message }]);    
    setInputMessage("");
    newSocket.emit("message", input_message);
  };

  return (
    <div className='p-1 h-screen bg-black-900'>
      <div className='container mx-auto bg-grey-900 h-full flex flex-col'>
        <div className='flex-grow p-3 flex flex-row items-end overflow-y-auto'>
          <div className='w-full space-y-3'>
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.message}
                type={message.type}
              />
            ))}
          </div>
         </div> 
        <div className='h-[80px] p-3 flex justify-center items-center bg-grey-700'>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="w-full p-2 bg-transparent text-jaune-400 border-2 border-jaune-400 rounded-md"
            placeholder="Ask your question ..." 
            type="text"
            value={input_message}
            onChange={(e) => setInputMessage(e.target.value)}
            />
          <button onClick={sendMessage} className='bg-black-900 text-white-100 px-4 py-2 border-2 border-jaune-400 rounded-md mx-5 cursor-pointer'>Send</button>  
        </div>
      </div>
    </div>
  );
}

export default App
