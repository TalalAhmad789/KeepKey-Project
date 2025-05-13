import mongoose, { model, models, Schema } from "mongoose";

const PasswordSchema = new Schema({
    email: { type: String, required: true },
    webUrl: {type: String, required: true},
    userName: {type: String, required: true},
    passWord: {type: String, required: true},
    id: {type: String, required: true}
},
{
    timestamps: true
}
)

const PasswordModel = models.Password || model("Password", PasswordSchema);
export default PasswordModel;