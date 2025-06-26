import { ID, OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, database } from "./client";
import { redirect } from "react-router";

/**
 * Initiates login with Google using Appwrite OAuth2.
 */
export const loginWithGoogle = async (): Promise<void> => {
  try {
    await account.createOAuth2Session(OAuthProvider.Google);
  } catch (error) {
    console.error("Error logging in with Google:", error);
  }
};

/**
 * Fetches the logged-in Appwrite user and their data from the database.
 * Redirects to /sign-in if not authenticated.
 */
export const getUser = async (): Promise<any | null> => {
  try {
    const user = await account.get();
    if (!user) {
      redirect("/sign-in"); // corrected syntax
      return null;
    }

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal("accountId", user.$id),
        Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
      ]
    );

    return documents[0] || null;
  } catch (error) {
    console.error("getUser error:", error);
    return null;
  }
};

/**
 * Fetches the user's Google profile picture using the People API.
 */
export const getGooglePic = async (): Promise<string | null> => {
  try {
    const session = await account.getSession("current");
    const oAuthToken = session.providerAccessToken;

    if (!oAuthToken) {
      console.warn("No OAuth token available.");
      return null;
    }

    const response = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=photos",
      {
        headers: {
          Authorization: `Bearer ${oAuthToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch profile photo from Google People API.");
      return null;
    }

    const data = await response.json();
    return data?.photos?.[0]?.url || null;
  } catch (error) {
    console.error("getGooglePic error:", error);
    return null;
  }
};

/**
 * Creates a new user in the Appwrite DB if they don't exist already.
 */
export const storeUserData = async (): Promise<any | null> => {
  try {
    const user = await account.get();
    if (!user) return null;

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", user.$id)]
    );

    if (documents.length > 0) return documents[0];

    const imageUrl = await getGooglePic();

    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        name: user.name,
        imageUrl: imageUrl || "",
        joinedAt: new Date().toISOString(),
      }
    );

    return newUser;
  } catch (error) {
    console.error("storeUserData error:", error);
    return null;
  }
};

/**
 * Fetches existing user from Appwrite DB if present.
 */
export const getExistingUser = async (): Promise<any | null> => {
  try {
    const user = await account.get();
    if (!user) return null;

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", user.$id)]
    );

    return documents.length > 0 ? documents[0] : null;
  } catch (error) {
    console.error("getExistingUser error:", error);
    return null;
  }
};

/**
 * Logs out the currently logged-in user.
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
