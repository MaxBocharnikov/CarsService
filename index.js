const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const applicationsRoutes = require('./routes/applications');
const clientsRouter = require('./routes/clients');
const clientTypesRouter = require('./routes/clientTypes');
const trailersRouter = require('./routes/trailers');
const worksRouter = require('./routes/works');
const partsRouter = require('./routes/parts');
const postsRouter = require('./routes/posts');
const workingHoursRouter = require('./routes/workingHours');
const ordersRouter = require('./routes/order');
const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 80;

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}))

app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', 'https://young-garden-30400.herokuapp.com/');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'origin,X-Requested-With,accept,content-type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.options('*', function (req,res) { res.sendStatus(200); });

app.use('/applications', applicationsRoutes);
app.use('/orders', ordersRouter);
app.use('/clients', clientsRouter);
app.use('/clientTypes', clientTypesRouter);
app.use('/trailers', trailersRouter);
app.use('/works', worksRouter);
app.use('/parts', partsRouter);
app.use('/posts', postsRouter);
app.use('/workingHours', workingHoursRouter);
app.use('/users', userRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', () => (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        const url = process.env.MONGODB_URI || 'mongodb+srv://maxbocharnikov:qwerty1234@cluster0.d9dsi.mongodb.net/carsService?retryWrites=true&w=majority';
        await mongoose.connect(url);
        app.listen(PORT, () => {
            console.log('Server has been started on port ' + PORT);
    })
    } catch(e) {
        console.log(e);
    }
}


start();