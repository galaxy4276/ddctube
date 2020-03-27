import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String, // URL
    facebookId: Number,
    githubId: Number,
    kakaoId: Number,
});

const model = mongoose.Model('User', UserSchema);

export default model;
