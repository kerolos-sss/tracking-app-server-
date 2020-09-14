import mongoose, { Mongoose } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        unique: true,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    }

})

userSchema.pre("save", function (next) {
    const user = this as { password: string } & mongoose.Document;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash
            next()
        })
    })
})


userSchema.methods.comparePassword = function (candidatePassword: string) {
    const user = this as Document & { password: string };
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err)
            }
            if (!isMatch) {
                return reject(false)
            }

            resolve(true);
        })
    });
}


mongoose.model('User', userSchema)