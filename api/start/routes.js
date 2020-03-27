'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const Marker = use('App/Models/Marker');
const User = use('App/Models/User');
const Match = use('App/Models/Match');
const Mail = use('Mail');
const Database = use('Database');

Route.get('/fr', ({antl, view}) => {
    antl.switchLocale('fr');
    return view.render('welcome');
});

Route.get('/en', ({antl, view}) => {
    antl.switchLocale('en');
    return view.render('welcome');
});

Route.get('/nl', ({antl, view}) => {
    antl.switchLocale('nl');
    return view.render('welcome');
});

Route.get('/api/v1/markers', async ({response}) => {
    const items = await Marker.all();
    response.send(items.toJSON());
});

Route.get('/api/v1/match', async ({request, response}) => {

    const marker = await Marker.find(request.input('id'));

    if (marker.type === 'help') {

    } else {
        if (request.input('creator_id') !== marker.creator_id) {
            throw new Error('Id doesn\'t match');
        }
    }

    marker.status = 'accepted';
    await marker.save();

    response.send(marker);
});

Route.get('/api/v1/search', async ({request, response}) => {
    const items = await Database.raw('SELECT *, (acos(sin(?) * sin(lat) + cos(?) * cos(lat) * cos(lng - (?))) * 6371) as distance from markers WHERE lat IS NOT NULL ORDER BY distance ASC ', [request.input('lat'), request.input('lat'), request.input('lng')]);
    response.send(items[0]);
});

Route.post('/api/v1/markers', 'MarkerController.store');

Route.post('/api/v1/register', 'UserController.store');

Route.any('/api/v1/login', 'UserController.login');

Route.get('/api/v1/me', 'UserController.index');

Route.get('/api/v1/token', 'UserController.token');

Route.get('/api/v1/users', async ({response}) => {
    const items = await User.query().with('markers').with('requests').fetch();
    response.send(items.toJSON())
});

Route.get('/api/v1/proposals', async ({response}) => {
    const items = await Marker.query().where('type', 'helper').fetch();
    response.send(items.toJSON())
});

Route.get('/api/v1/requests', async ({response}) => {
    const items = await Marker.query().where('type', 'helped').fetch();
    response.send(items.toJSON())
});

Route.get('/api/v1/matchs', async ({response}) => {
    const items = await Match.query().fetch();
    response.send(items.toJSON())
});

Route.get('facebook', async ({ally}) => {
    await ally.driver('facebook').redirect();
});

Route.get('facebook/authenticated', async ({ally}) => {
    const user = await ally.driver('facebook').getUser()
    return user;
});
