async function sendMessage() {
  const chatbox = document.getElementById('chatbox');
  const userInput = document.getElementById('user-input');
  const userMessage = userInput.value.trim();

  if (userMessage !== "") {
      // Add user message to chatbox
      const userMessageElement = document.createElement('div');
      userMessageElement.classList.add('message', 'user-message');
      userMessageElement.textContent = userMessage;
      chatbox.appendChild(userMessageElement);
      chatbox.scrollTop = chatbox.scrollHeight; 
      
      // Clear input field
      userInput.value = "";

      // API call setup
      const url = 'https://chatgpt-vision1.p.rapidapi.com/gpt4';
      const options = {
          method: 'POST',
          headers: {
              'x-rapidapi-key': 'a38a439451mshb66f632a04aaa95p137671jsn9f7929dd8de6',
              'x-rapidapi-host': 'chatgpt-vision1.p.rapidapi.com',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              messages: [
                  {
                      role: 'user',
                      content: userMessage
                  }
              ],
              web_access: false
          })
      };

      try {
          const response = await fetch(url, options);
          const result = await response.json(); // Parse the response as JSON
          const botMessage = result.result;

          // Add bot response to chatbox
          const botMessageElement = document.createElement('div');
          botMessageElement.classList.add('message', 'bot-message');
          botMessageElement.textContent = botMessage;
          chatbox.appendChild(botMessageElement);
          chatbox.scrollTop = chatbox.scrollHeight;

      } catch (error) {
          console.error("Error fetching the API response:", error);
          
          // Add error message to chatbox
          const errorMessageElement = document.createElement('div');
          errorMessageElement.classList.add('message', 'bot-message');
          errorMessageElement.textContent = "Sorry, something went wrong. Please try again.";
          chatbox.appendChild(errorMessageElement);
          chatbox.scrollTop = chatbox.scrollHeight;
      }
  }
}
