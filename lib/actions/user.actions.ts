'use server'
import { ID } from "node-appwrite";
import { createSessionClient, createAdminClient } from '../appwrite'
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({email, password}: signInProps) => {
    try {
        // Mutation / Database / Make fetch
        // "Extract" the account and create an email and password session
        const { account } = await createSessionClient();

        const response = await account.createEmailPasswordSession(email, password)

        return parseStringify(response)

    } catch(error) {
        console.error('Error', error)
    }
}


export const signUp = async (userData: SignUpParams) => {
    const {email, password, firstName, lastName} = userData
    
    try {
        // Create user account (Appwrite)
        // "Extract" the account and creating a new user account
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );
        
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount)

    } catch(error) {
        console.error('Error', error)
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();

        return parseStringify(user);
    
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        cookies().delete('appwrite-session')

        await account.deleteSession('current')

    } catch(error) {
        console.log(error)
        return null;
    }
}