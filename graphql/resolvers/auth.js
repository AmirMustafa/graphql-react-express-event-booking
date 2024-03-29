const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) {
                throw new Error(`User exists already!`);
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save();
            return { ...result._doc, id: result.id, password: null };
        } catch (err) {
            throw err;
        }
    },

    login: async ({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("User does not exists!");
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error("Password is invalid!");
        }

        // Generating jwt token
        const secretKey = "supersecretkey";
        const expireTime = 1;
        const tokenConfig = {
            expiresIn: `${expireTime}h`
        };
        const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, tokenConfig);

        return {
            userId: user.id,
            token: token,
            tokenExpiration: expireTime
        }
    }
};