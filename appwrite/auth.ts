import { ID, OAuthProvider, Query } from "appwrite";
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

export const storeUserData = async (): Promise<any | null> => {
  try {
    // Get the currently logged-in user
    const user = await account.get();
    if (!user) return null;

    // Check if user already exists in the database
    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', user.$id)]
    );

    if (documents.length > 0) return documents[0];

    // Get profile picture from Google
    const imageUrl = await getGooglePic();

    // Create a new user document in Appwrite database
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        name: user.name,
        imageUrl: imageUrl || '',
        joinedAt: new Date().toISOString(),
      }
    );

    return newUser;

  } catch (error) {
    console.log('storeUserData error:', error);
    return null;
  }
};

export const getExistingUser = () => {
    try {
      const user = await account.get();
      if(!user) return null;

      //check if the user exists in DB
       const { documents } = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [ Query.equal('accountId', user.$id)]
       );

       if (documents.length === 0) return null;

       return documents[0];
    

        
    } catch (error) {
       console.log('getExistingUser error:',error);
       return null
    }
} 

export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};