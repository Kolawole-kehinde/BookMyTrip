import { OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, database } from "./client";
import { redirect } from "react-router";



export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(OAuthProvider.Google) 
    } catch (error) {
       console.log(`Error logging in with Google: ${error}`);
    }
} 


export const logoutUser = async () => {
    try {
        
    } catch (error) {
       console.log(error);
    }
} 


export const storeUserData = async () => {
    try {
        
    } catch (error) {
       console.log(error);
    }
} 
export const getExistingUser = () => {
    try {
        
    } catch (error) {
       console.log(error);
    }
} 