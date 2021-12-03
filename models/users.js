const {model} = require('mongoose');
const bcrypt = require('bcrypt');
const BaseSchema = require('./baseSchema');

const userSchema = new BaseSchema({
    login: {type: String, required: true},
    password: {type: String, required: true}
});

userSchema.statics.findUser = async function(login, password) {
    const user = await User.findOne({login});
    if (!user) {
        return;
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return
    }

    return user;
};

userSchema.pre('save', async function(next){
   const user = this;
   if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
   }
   next();
});

const User = model('User', userSchema);

module.exports = User;

