const { model, Schema, SchemaTypes } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    user_name: SchemaTypes.String,
    password: SchemaTypes.String,
    is_admin: {
        type: SchemaTypes.Boolean,
        default: false,
    },
    created_at: {
        type: SchemaTypes.Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function(next) {
    let user = this; // access to current user before storing

    // if it's a user password update then doesn't encrypt password
    if (!user.isModified('password')) return next(); 

    if (user.password) {
        try {
            // if password is defined then generate the Salt algorithm
            const salt = await bcrypt.genSalt(10);
        
            // get hash from the input password
            const hash = await bcrypt.hash(user.password, salt, null);
            user.password = hash; // store the has in password key object
            next();
        
        } catch (err) {
            if (err) return next(err);
        }
        
    }
});

exports.UserSchema = UserSchema;
exports.User = model('User', UserSchema);