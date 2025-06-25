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
export const getUser = async () => {
  try {
    const user = await account.get();
    if (!user) return redirect(url: '/sign-in' );

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal('accountId', user.$id),
        Query.select(['name', 'email', 'imageUrl', 'joinedAt', 'accountId']),
      ]
    );
    

  } catch (error) {
    console.log(error);
  }
};
export const getGooglePic = async (): Promise<string | null> => {
  try {
    // Get the current session (after OAuth login)
    const session = await account.getSession('current');

    // Extract the Google OAuth access token from the session
    const oAuthToken: string | undefined = session.providerAccessToken;

    if (!oAuthToken) {
      console.log('No OAuth token available');
      return null;
    }

    // Fetch the profile photo from Google People API
    const res = await fetch('https://people.googleapis.com/v1/people/me?personFields=photos', {
      headers: {
        Authorization: `Bearer ${oAuthToken}`,
      },
    });

    // Handle failed response
    if (!res.ok) {
      console.log('Failed to fetch profile photo from Google People API');
      return null;
    }

    // Parse the JSON response
    const data: any = await res.json();

    // Safely extract the photo URL
    const photoUrl: string | null = data?.photos?.[0]?.url || null;

    return photoUrl;

  } catch (error) {
    console.log('getGooglePic error:', error);
    return null;
  }
};



export const logoutUser = async () => {
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