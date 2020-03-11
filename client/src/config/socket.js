import io from 'socket.io-client';

const devUrl = 'http://localhost:3000/';
const prodUrl = 'https://reactchat2019.herokuapp.com/';

const socket = io.connect(devUrl, {
    autoConnect: false
});

export default socket;