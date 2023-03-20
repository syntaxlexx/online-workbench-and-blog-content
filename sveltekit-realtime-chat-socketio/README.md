# Realtime Chat ft. Sveltekit, MongoDB, Moongoose

![Video](sveltekit-realtime-chat.gif)

## Architecture
For now, the client handles all database concerns while the server handles websockets. 
Later on, the server can be tweaked to handle server requests should the need arise.

The client is an SSR after all.

## Todo
- [x] Send and receive messages via websockets
- [x] Emoji Picker
- [x] Scroll messages as they pour in
- [x] Show chat scroll paused alert on scroll
- [ ] Authentication
- [ ] Admin User Mgmt
