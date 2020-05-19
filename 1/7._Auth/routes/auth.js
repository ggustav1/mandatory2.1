const path = require("path");
const route = require('express').Router();
const User = require('../models/User.js');
const Role = require('../models/Role.js');

// Used for hashing the password
const bcrypt = require('bcrypt');


const saltRounds = 12;

route.post("/login", async (req, res) => {
    if (req.body.username === '' || req.body.password === '') {
        req.session.message = {
            type: 'danger',
            intro: 'empty fields',
            message: 'You forgot to enter username or password'
        };
        return res.redirect('/');
    } else {
        const {username, password} = req.body;

        const user = await User.query().select().where("username", username).limit(1);

        bcrypt.compare(password, user[0].password, (err, same) => {
            if (err) {
                console.log('we got an error', err);
                return res.send({error: err})
            } else if (same) {
                console.log('I am same', same);
            } else {
                req.session.user = {id: user[0].id, role: user[0].role_id};
                if (req.session.user.role === 1) {
                    return res.sendFile(path.resolve("public/admin.html"))
                } else {
                    return res.sendFile(path.resolve("public/profile.html"))
                }
            }
        })
    }
});

route.post("/signup", async (req, res) => {

    // what fields do we need to sign up?
    // username, password, repeat password
    const {signupUsername, signupPassword, passwordRepeat, age} = req.body;

    const isPasswordTheSame = signupPassword === passwordRepeat;

    console.log(req.body);


    if (signupUsername && signupPassword && isPasswordTheSame) {
        // password requirements
        if (signupPassword.length < 8) {
            return res.status(400).send({response: "Password does not fulfill the requirements"});
        } else {
            try {

                const userFound = await User.query().select().where("username", signupUsername).limit(1);

                if (userFound.length > 0) {
                    return res.status(400).send({response: "User already exists"});
                } else {

                    const defaultUserRoles = await Role.query().select().where({role: 'USER'});

                    const hashedPassword = await bcrypt.hash(signupPassword, saltRounds);

                    // const createdUser =
                    await User.query().insert({
                        username: signupUsername,
                        password: hashedPassword,
                        age: age,
                        role_id: defaultUserRoles[0].id
                    });

                    // return res.send({response: `User has been created with the username ${createdUser.signupUsername}`});
                   //  return res.send({ response: signupUsername });

                        return res.sendFile(path.resolve("public/profile.html"))


                }

            } catch (error) {
                console.log(error);
                return res.status(500).send({response: "Something went wrong with the database"});
            }
        }
    } else if (signupPassword && passwordRepeat && !isPasswordTheSame) {
        return res.status(400).send({response: "Passwords do not match. Fields: password and passwordRepeat"});
    } else {
        return res.status(404).send({response: "Missing fields: username, password, passwordRepeat"});
    }

});

route.get("/logout", (req, res) => {
    /* NOTE: Not sure if this is gonna work */

    /*await req.session.destroy().promise().then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    });*/

    /* NOTE: Tested - this is working */
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Session successfully destroyed');
        }
    });
    return res.send({response: "Logged out"});
});

module.exports = route;
