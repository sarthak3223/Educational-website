const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
        lowercase: true, // Store emails in lowercase
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
    try {
        // Check if the password is modified or new
        if (!this.isModified('password')) {
            return next(); // Skip hashing if the password hasn't been modified
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the salt
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Use CommonJS export syntax
