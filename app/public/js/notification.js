const notificationBell = document.querySelector('.notification-bell');
const notificationPopup = document.querySelector('.notification-popup');

notificationBell.addEventListener('click', function() {
    // Show notification popup
    notificationPopup.style.display = 'block';
});

// Close notification popup when clicking outside of it
document.addEventListener('click', function(event) {
    if (!notificationBell.contains(event.target) && !notificationPopup.contains(event.target)) {
        notificationPopup.style.display = 'none';
    }
});

function loadNotifications(){
    fetch("getNotifications")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response body as JSON
        })
        .then(messages => {
            document.getElementById("noti-count").innerHTML = messages.length;
            messages.forEach(msg => {
                document.getElementById("noti-popup").innerHTML += `
                    <ul class="notification-list">
                        <a href="javascript:;" onclick="this.children[0].submit()">
                            <form method="POST" action="messageRedirect">
                                <input type="hidden" name="sellerId" value="${msg.type}" />
                            </form>
                            ${msg.displayName}: ${msg.msgContent.substr(0,15)}...
                        </a>
                    </ul>
                `;
                console.log(msg);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

loadNotifications();

