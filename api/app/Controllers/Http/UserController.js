'use strict';

const User = use('App/Models/User');
const Mail = use('Mail');

class UserController {

    async index({auth, response}) {
        const user = await auth.authenticator('jwt').getUser();
        response.send(user);
    }

    /**
     * User registration process
     *
     * @param auth
     * @param response
     * @param request
     * @returns {Promise<void>}
     */
    async store({auth, response, request}) {
        
        let user = await new User;
        user.first_name = request.input('first_name');
        user.last_name = request.input('last_name');
        user.username = `${user.first_name}${user.last_name}`;
        user.email = request.input('email');
        user.password = request.input('password');
        await user.save();

        if (user) {
            /**
             * Send an email only when people is a new one
             */
            await Mail.send('emails.welcome', user.toJSON(), (message) => {

                console.log('Email', user.email);

                message
                    .to(user.email)
                    .from('info@allforclimate.earth')
                    .subject('Welcome to Covid Solidarity !')
            });
        }
        
        await auth.logout();

        await auth.attempt(user.email, request.input('password'));

        user.token = await auth
            .authenticator('jwt')
            .withRefreshToken()
            .generate(user);

        response.send(user);
    }

    async login({auth, response, request}) {

        await auth.logout();

        let user = await auth.attempt(request.input('email'), request.input('password'));

        if (user) {
            user.token = await auth
                .authenticator('jwt')
                .withRefreshToken()
                .generate(user);
        }

        response.send(user);
    }

    async logout({auth}) {
        await auth.logout();
    }

    async token({auth, response, request}) {

        let user = await auth.user;

        user.token  = await auth
            .authenticator('jwt')
            .withRefreshToken()
            .generate(user);

        response.send(user);
    }
}

module.exports = UserController;
