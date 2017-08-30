const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')

//Middleware
const checkForSession = require('./middlewares/checkForSession');

//Controllers
const swag_controller = require('./controllers/swag_controller');
const auth_conroller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: 'MischeifManaged'
}));
app.use( checkForSession );
app.use( express.static(`${__dirname}/../public/build`));




app.get('/api/swag', swag_controller.read);
app.post('/api/login', auth_conroller.login);
app.post('/api/register', auth_conroller.register);
app.post('/api/signout', auth_conroller.signout);
app.get('/api/user', auth_conroller.getUser);

app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

app.get('/api/search', search_controller.search);



const port = '3030'
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
