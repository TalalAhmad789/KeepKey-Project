"use server"
import User from "../model/User"
import PasswordModel from "../model/PasswordModel";
import { handleDBConnection } from '@/app/Connection/ConnectionDB';

export const fetchUser = async (Email) => {
    await handleDBConnection();
    let u = await User.findOne({ email: Email });
    let user = u.toObject({ flattenObjectIds: true });
    return user;
}

export const submitForm = async (Email, passwordData) => {
    try {
        await handleDBConnection();
        if (passwordData.webUrl.includes("https://")) {
            let updatedURL = passwordData.webUrl.split("https://")[1];
            const newPassword = await PasswordModel.create({
                email: Email,
                webUrl: updatedURL,
                userName: passwordData.userName,
                passWord: passwordData.passWord,
                id: passwordData.id
            });
            await newPassword.save();
            console.log("User Password Saved Successfully!");
        }
        else {
            const newPassword = await PasswordModel.create({
                email: Email,
                webUrl: passwordData.webUrl,
                userName: passwordData.userName,
                passWord: passwordData.passWord,
                id: passwordData.id
            });
            await newPassword.save();
            console.log("User Password Saved Successfully!");
        }

    } catch (error) {
        console.log("User Password Faced Error:", error);
    }
}

export const getForm = async (Email) => {
    await handleDBConnection();
    const getPassword = await PasswordModel.find({ email: Email });
    const passWord = getPassword.map(password => password.toObject({ flattenObjectIds: true }));
    return passWord;
}

export const delForm = async (Id) => {
    await handleDBConnection();
    const delPassword = await PasswordModel.deleteOne({ id: Id });
    console.log("Password Delete Successfully:", delPassword);
}

export const updateProfile = async (data, Email) => {
    try {
        await handleDBConnection();

        const userExist = await User.findOne({ email: Email });
        const normalizedTagline = data.tagline.startsWith("@") ? data.tagline : "@" + data.tagline;

        // Check if user is changing the tagline
        if (userExist.tagline !== normalizedTagline) {
            // Check if someone else already has that tagline
            const taglineExist = await User.findOne({ tagline: normalizedTagline });

            if (taglineExist && taglineExist.email !== Email) {
                return { error: "Tagline Already Exist!" };
            }
            else {
                await User.updateOne(
                    { email: Email },
                    {
                        $set: {
                            firName: data.firName,
                            lastName: data.lastName,
                            name: `${data.firName} ${data.lastName}`,
                            city: data.city,
                            country: data.country,
                            about: data.about,
                            tagline: normalizedTagline
                        }
                    }
                );
            }
        }

        // Proceed with update
        await User.updateOne(
            { email: Email },
            {
                $set: {
                    firName: data.firName,
                    lastName: data.lastName,
                    name: `${data.firName} ${data.lastName}`,
                    city: data.city,
                    country: data.country,
                    about: data.about,
                    tagline: normalizedTagline,
                    profilePic: data.profilePic
                }
            }
        );

        return { success: true };

    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" };
    }
};



