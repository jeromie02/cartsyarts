import React from 'react'
import Conversation from './messenger/conversation'
import Message from './messenger/message'
import ChatOnline from './messenger/chatonline'
function chat() {
  return (
    <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for Friend" className="chatMenuInput"/> 
              <Conversation/>
            </div>
 # comment
          </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
            </div>
            <div className="chatBoxBottom">
              <textarea className="chatMessageInput" placeholder="write something...."></textarea>
              <button className="chatSubmitButton"> Send</button>
            </div>
          </div>
        </div>

        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>




    </div>
  )
}

export default chat
