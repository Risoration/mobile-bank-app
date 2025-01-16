import mongoose from 'mongoose';

const userschema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },

    {
        timestamps: true,
    }
);

const UserModel = mongoose.model('User', userschema);

export default UserModel;
