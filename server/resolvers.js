const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { signToken } = require('./utils/auth')
const User = mongoose.model("User")


const resolvers = {
    Query: {
        // get user saved book by userid
        mybooks: async (_, args, { userId }) => {
            if (!userId) throw new Error("You must be logged in")
            return await User.findOne({ _id: userId })
        }
    },
    Mutation: {
        // create a user,
        signupUser: async (_, { userNew }) => {
            const user = await User.findOne({ email: userNew.email })
            if (user) {
                throw new Error("User already exists with that email")
            }
            const hashedPassword = await bcrypt.hash(userNew.password, 12)

            const newUser = new User({
                ...userNew,
                password: hashedPassword
            })
            const token = signToken(userNew);
            await newUser.save()
            return { token }
        },
        // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
        // {body} is destructured req.body
        signinUser: async (_, { userSignin }) => {
            const user = await User.findOne({ email: userSignin.email })
            if (!user) {
                throw new Error("User dosent exists with that email")
            }
            const doMatch = await bcrypt.compare(userSignin.password, user.password)
            if (!doMatch) {
                throw new Error("email or password in invalid")
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            return { token }
        },

        // save a book to a user's `savedBooks` field by adding it to the push (to prevent duplicates)
        // user comes from `userId` created in the auth middleware function
        saveBook: async (_, { bookNew }, { userId }) => {
            try {
                await User.findOneAndUpdate(
                    {
                        _id: userId,
                        'savedBooks.bookId': { '$ne': bookNew.bookId },
                    },
                    { $push: { savedBooks: bookNew } },
                    { new: true, runValidators: true }
                );
                return "Book saved successfully"
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
        },
        // remove a book from `savedBooks`
        deleteBook: async (_, { bookId }, { userId }) => {
            try {
                await User.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return "Book deleted successfully"
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
        }
    }
}
module.exports = resolvers;