const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookie = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

// Load models
const User = require('./models/User');

// Load routes
const users = require('./routes/api/users');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
dotenv.config();

// Server port
const PORT = process.env.PORT || 3000;

const dbUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ssc1v.mongodb.net/ChatApp?retryWrites=true&w=majority`;

const dbOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
};

// Connect to MongoDB
mongoose.connect(dbUri, dbOptions)
    .then(() => console.log('База данных подключена!'))
    .catch(err => console.log(err));

// Express middleware
app.use(cookie());
app.use(session({ 
    secret: "ChatApp",
    resave: false,
    saveUninitialized: false 
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send("Сервер запущен");
});


app.use('/api/users', users);

io.on('connection', (socket) => {

    const disconnect = () => {
        User.findOneAndUpdate({ username: socket.username }, { status: 'offline', chatId: '' }, (err, res) => {
            if(err) return res.json({ message: 'Не удалось установить статус офлайн' });
 
            socket.broadcast.emit('user left', {
                type: 'disconnect',
                username: socket.username
            });
        });
    }

    socket.on('message', (msg) => {
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}`;

        const { username, message } = msg;

        io.to(msg.id).emit('message', {
            time,
            username,
            message
        });
    });

    socket.on('new user', user => {
        socket.username = user;

        User.findOne({ username: socket.username }, (err, doc) => {
            if(err) return res.json({ message: 'Не удалось найти пользователя' });
            
            doc.status = 'online';
            doc.chatId = socket.id;

            doc.save((err, doc) => {
                if(err) return res.json({ message: 'Не удалось установить статус онлайн' })

                socket.broadcast.emit('user join', {
                    username: socket.username,
                    chatId: socket.id
                });
    
                User.find({ status: 'online' })
                    .select('username')
                    .select('chatId')
                    .select('-_id')
                    .exec((err, docs) => {
                        if(err) return res.json({ message: 'Не удалось получить список пользователей' });

                        socket.emit('get user list', docs); 
                    });


            });

        });
    });

    socket.on('start conversation', (data) => {
        socket.join(data.chatId);
        socket.broadcast.to(data.chatId).emit('start conversation', {
            type: 'start conversation',
            username: socket.username,
            id: socket.id
        });
    })
    
    socket.on('start conversation response', (data) => {
        if(data.success) {
            socket.join(data.id);
        }
    });

    socket.on('typing', (data) => {
        if(data === 'typing') {
            socket.broadcast.emit('typing', {
                type: 'typing',
                username: socket.username
            });
        } else {
            socket.broadcast.emit('stop typing');
        }

    });

    socket.on('disconnect', () => {
        disconnect();
    });

    socket.on('leave conversation', () => {
        disconnect();
    });
});


server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
