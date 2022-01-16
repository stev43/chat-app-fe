const WS = new WebSocket('ws://' + process.env.VUE_APP_SOCKET_IP + ':8000/');
export default WS;
