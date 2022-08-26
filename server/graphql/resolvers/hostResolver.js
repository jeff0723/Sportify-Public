const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;
const Host = require('../../models/host.model');

module.exports = {
    Query: {
        async host(_, args) {
            return await Host.findOne({ _id: ObjectId(args.host_id) });
        },
    },
    Mutation: {
        async loginCheck(_, args) {
            let host = null;
            if (args.data.googleId) { // Google Login
                // Make sure the user exists
                host = await Host.findOne({ email: args.data.email, googleId: args.data.googleId });
                if (!host) {
                    // console.log("Login failed: User not found.");
                    return null;
                }
            } else { // Normal login
                // Make sure the user exists
                host = await Host.findOne({ email: args.data.email });
                if (!host) {
                    // console.log("Login failed: User not found.");
                    return null;
                }

                // Check if password is correct
                const isPasswordCorrect = await bcrypt.compare(args.data.password, host.password);
                if (!isPasswordCorrect) {
                    // console.log("Login failed: Password is incorrect.");
                    return null;
                }
                // Generate jwt token
                const token = jwt.sign({ email: host.email }, "SECRET_KEY", { expiresIn: "1h" });
            }
            return { _id: host._id, name: host.name, email: host.email };
        },
        async addHost(_, args) {
            // Make sure the email hasn't been used to sign up
            const existingHost = await Host.findOne({ email: args.data.email });
            if (existingHost) {
                // console.log("Sign up failed: email has been used.");
                return null;
            }

            let newHost = null;
            if (args.data.googleId) { // Google Login
                newHost = new Host({
                    name: args.data.name,
                    email: args.data.email,
                    googleId: args.data.googleId
                });
            } else { // Normal Sign Up
                // Make sure passwords match
                if (args.data.password !== args.data.confirmPassword) {
                    // console.log("Sign up failed: Passwords don't match.");
                    return null;
                }

                // Encrypt password
                const passwordHashed = await bcrypt.hash(args.data.password, 12);
                newHost = new Host({
                    name: args.data.name,
                    email: args.data.email,
                    password: passwordHashed
                });
            }

            // Save host
            const host = await newHost.save();
            return { _id: host._id, name: host.name, email: host.email };
        },
        async editHost(_, args) {
            await Host.findOne({ _id: ObjectId(args.data._id) }, function (err, host) {
                if (!err) {
                    if (host) {
                        host.name = args.data.name;
                        host.phone = args.data.phone;
                        host.email = args.data.email;
                        host.page = args.data.page;
                        host.bank_code = args.data.bank_code;
                        host.bank_account = args.data.bank_account;
                        host.account_name = args.data.account_name;
                        host.save()
                    }
                }
            });

            return true;
        }
    }
}