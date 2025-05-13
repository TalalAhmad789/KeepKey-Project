import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    firName: {type: String},
    name: { type: String },
    lastName: { type: String },
    tagline: { type: String},
    city: { type: String},
    country: { type: String},
    about: { type: String},
}, {
    timestamps: true
}
)

const User = models.User || model("User", UserSchema);
export default User;