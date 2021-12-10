# Shine-Frontend
This README contains descriptions of both frontend and backend portions of this app.

# Scope
Shine is a messaging app that allows users to message friends and colleagues in one-to-one conversations or within group chats. In its current state, users can only create accounts, navigate to conversations they are a part of, send messages, and delete conversations. Conversations currently can only be created on the backend. This is the most immediate improvement needed to this project. After that I would like to allow users to edit and delete messages they send and incorporate socket.io into the application to create near instantaneous messaging.

# User Stories
As a user I want to create an account: A user begins at the home page of the website. In the navigation bar, the user will click "register" and be navigated to the registration page. The user will supply a name, username, email, and password, and click "Create Account" at the bottom of the form. Their account will be created and they will be re-directed back to the home page.

As a user I want to log in and see my account: For users with existing accounts, they are able to click "login" on the navigation bar which will re-direct them to the login page. On the login page, the user must supply their correct email and password and click "login" at the bottom of the form. They will be re-directed to the home page. On the home page, the user can click "profile" in the navigation bar and be re-directed to their profile page.

As a user I want to navigate to a conversation: To see an individual conversation, a user must first navigate to their profile page. On the profile page, a user will see listed all the conversations they are a part of. The user can click on a single conversation and be navigated to that conversation show page.

As a user I want to send a message: When on a conversation show page, the user will see all existing messages listed in the display area. At the bottom of the display area there will be an empty input box and a button that reads "Send Message". The user must type their desired message in the input box and click "Send Message". The user must then reload the page to see their new message.

As a user I want to delete a conversation: When on a conversation show page, a user can find the "Delete Conversation" button beneath the "Send Message" button. If the user clicks the "Delete Conversation" button, the conversation will be deleted without further action needed. Care must be taken when using this feature.

# Technologies
JavaScript, React, HTML, CSS, Node, Express, MongoDB, Mongoose, Postman, JSON Web Tokens, socket.io

# Approach
The first step to this project was establishing how the data would interact with itself. Originally three data models were created: User, Conversation, and Message. User and Conversation shared a many-to-many relationship and Conversation and User both had a one-to-many relationship with the Message model. The Message model was later removed, and messages were included within the Conversation model as an array of strings with a reference to which User created the Message. This seemed to be a simpler approach though it required re-working of the existing test data.

My initial focus was on the backend. I first established the necessary routes for the creation, viewing, editing, and deletion of the various instances of the data models. I verified that the routes worked as intended using Postman. With the majority of routes working as desired, I shifted my focus to user registration. This was accomplished using JSON Web Tokens and bcrypt. This presented more difficulties than expected which limited the amount of time I could work on the frontend appearance of the application.

With registration functional, I began working on the frontend. I created pages for Register, Login, Profile Show, Conversation Index, and Conversation Show. With these simpler routes completed, I began to add the message create functionality on the backend and frontend. Because an individual message is contained within one conversation in the database, I ultimately used a PUT route to edit the conversation and add the message text to the existing conversation. After succeeding with message send, I added a conversation delete button.

# Next Steps
I was unable to incorporate conversation create functionality on the frontend. All conversations are created on the backend and individual users are added to them. This is a major issue for the app's baseline functionality. I want users to be able to find other users, add them to a conversation, and start sending messages.

Next I want users to be able to delete and edit individual messages. Perhaps additionally, users can ONLY perform these functions if no other user has sent a message after them in the chat.

After this is accomplished, I would like to work on the visual appearance of the app. It is currently in a very raw state.

Finally, I would like to include socket.io which would allow users to have near instantaneous messaging capabilities.
