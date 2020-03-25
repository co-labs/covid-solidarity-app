'use strict';

const User = use('App/Models/User');
const Mail = use('Mail');
const {validate} = use('Validator');

class UserController {
    /**
     * User registration process
     *
     * @param auth
     * @param response
     * @param request
     * @returns {Promise<void>}
     */
    async store({auth, response, request}) {

        const rules = {
            email: 'required|email|unique:users,email',
            password: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.send(validation.messages(), 402);
        }

        let user = await new User;
        user.first_name = request.input('firstName');
        user.last_name = request.input('lastName');
        user.username = user.first_name + user.last_name;
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

            await auth.remember(true).login(user.id);
        }

        response.send(user);
    }

    async login({auth, response, request}) {

        let user = await auth.attempt(request.input('email'), request.input('password'));

        response.send(user);
    }
}

module.exports = UserController;
