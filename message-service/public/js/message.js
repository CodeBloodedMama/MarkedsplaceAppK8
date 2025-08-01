console.log("test");

function sendMessage(){
    const timestamp = new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
    document.getElementById("chat-container").innerHTML += `
        <div class="message sent">
            <div class="message-info">
                <span class="message-name">You</span>
                <span class="message-timestamp">${timestamp}</span>
            </div>
            <div class="message-text">${document.getElementById("msg-in").value}</div>
        </div>
    `;

    const data = {
        msgContent: document.getElementById("msg-in").value
    };

    console.log(data);

    fetch("sendMessage", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    document.getElementById("msg-in").value = "";

    const chat = document.querySelector('.chat');
    chat.scrollTop = chat.scrollHeight;
}

function consumeMessages(){
    fetch("getMessage")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response body as JSON
        })
        .then(messages => {
            messages.forEach(msg => {
                document.getElementById("chat-container").innerHTML += `
                    <div class="message received">
                        <div class="message-info">
                            <span class="message-name">${msg.displayName}</span>
                            <span class="message-timestamp">${msg.timestamp}</span>
                        </div>
                        <div class="message-text">${msg.msgContent}</div>
                    </div>
                `;
            });
            const chat = document.querySelector('.chat');
            chat.scrollTop = chat.scrollHeight;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

document.getElementById("submit-btn").addEventListener("click", function(){
    sendMessage();
});

document.getElementById("msg-in").addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

consumeMessages();
setInterval(function(){
    console.log("interval");
    consumeMessages();
}, 2000);