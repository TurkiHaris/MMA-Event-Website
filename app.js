class Chatbox {
  constructor() {
      this.args = {
          openButton: document.querySelector('.chatbox__button'),
          chatBox: document.querySelector('.chatbox__support'),
          sendButton: document.querySelector('.send__button'),
          messagesChat : document.querySelector('.chatbox__messages'),
      }

      this.state = false;
      this.messages = [];
      this.html = '';
      this.html2 = '';
  }

  display() {
      const {openButton, chatBox, sendButton} = this.args;

      openButton.addEventListener('click', () => this.toggleState(chatBox))

      sendButton.addEventListener('click', () => this.onSendButton(chatBox))

      const node = chatBox.querySelector('input');
      node.addEventListener("keyup", ({key}) => {
          if (key === "Enter") {
              this.onSendButton(chatBox)
          }
      })
  }
  

  toggleState(chatbox) {
      this.state = !this.state;

      // show or hides the box
      if(this.state) {
          chatbox.classList.add('chatbox--active')
      } else {
          chatbox.classList.remove('chatbox--active')
      }
  }
  

  onSendButton(chatbox) {

      var textField = chatbox.querySelector('input');
      let text1 = textField.value
      if (text1 === "") {
          return;
      }

      let msg1 = { name: "User", message: text1 }
      this.messages.push(msg1);
      this.html += '<div class="messages__item messages__item--operator" >' + msg1.message  + '</div>';
      this.html2 += '<div class="messages__item messages__item--operator">' + msg1.message + '</div>';
      this.html += '<div class="messages__item messages__item--typing"><span class="messages__dot"></span><span class="messages__dot"></span><span class="messages__dot"></span></div>' 
      const chatmessage = chatbox.querySelector('.chatbox__messages');

      chatmessage.innerHTML = this.html;
      chatmessage.scrollTop = chatmessage.scrollHeight;


      fetch('http://127.0.0.1:5000/chat', {
          method: 'POST',
          body: JSON.stringify({ message: text1 }),
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
        })

        
        .then(r => r.json())
        
        .then(r => {
      
          let msg2 = { name: "Harris BOT", message: r.answer };
          this.messages.push(msg2);
          this.html2 += '<div class="messages__item messages__item--visitor new-message">' + msg2.message + '</div>';
          this.html = this.html2;
          chatmessage.innerHTML = this.html2;
          this.html = this.html2;
          chatmessage.scrollTop = chatmessage.scrollHeight;


      })
      .catch((error) => {
          console.error('Error:', error);
          chatbox.querySelector('input').content = '';

        });
        chatbox.querySelector('input').value = '';
  }  

  
}


const chatbox = new Chatbox();
chatbox.display();