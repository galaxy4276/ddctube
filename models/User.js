import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String, // URL
    facebookId: Number,
    githubId: Number,
    kakaoId: Number,
    kakao: {},
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const model = mongoose.model('User', UserSchema);

export default model;
