import { GoogleGenerativeAI } from "@google/generative-ai";
import { appwriteConfig, database } from "appwrite/client";
import { parseMarkdownToJson } from "lib/utils";
import { type ActionFunctionArgs } from "react-router";
import { ID } from "appwrite"; // make sure to import ID

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    country,
    numberOfDays,
    travelStyle,
    interests,
    groupType,
    budget,
    userId
  } = await request.json();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const unsplashApiKey = process.env.UNSPLASH_ACCESS!;

  try {
    console.log("Received form data:", {
      country,
      numberOfDays,
      travelStyle,
      interests,
      groupType,
      budget,
      userId
    });

    const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on:
Budget: '${budget}'
Interests: '${interests}'
TravelStyle: '${travelStyle}'
GroupType: '${groupType}'

Return JSON (not markdown) like:
{
  "name": "...",
  "description": "...",
  "estimatedPrice": "...",
  "duration": ...,
  "budget": "...",
  "travelStyle": "...",
  "country": "...",
  "interests": "...",
  "groupType": "...",
  "bestTimeToVisit": [...],
  "weatherInfo": [...],
  "location": { "latitude": ..., "longitude": ... },
  "itinerary": [
    { "day": 1, "title": "...", "description": "...", "activities": [...], "accommodation": "...", "meals": [...] },
    ...
  ]
}`;

    const textResult = await genAI
      .getGenerativeModel({ model: "gemini-2.0-flash" })
      .generateContent([prompt]);

    const rawText = textResult.response.text();
    console.log("Generated text:", rawText);

    const trip = parseMarkdownToJson(rawText);
    console.log("Parsed trip JSON:", trip);

    const imageResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${country} ${interests} ${travelStyle}&client_id=${unsplashApiKey}`
    );
    const imagesJson = await imageResponse.json();

    // fix: some APIs return 'results' instead of 'result'
    const imageUrls = (imagesJson.results || [])
      .slice(0, 3)
      .map((result: any) => result.urls?.regular || null);

    console.log("Fetched image URLs:", imageUrls);

    const result = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.tripCollectionId,
      ID.unique(),
      {
        tripDetail: JSON.stringify(trip),
        imageUrls: imageUrls, // ✅ pass array directly, not JSON.stringify
        createdAt: new Date().toISOString()
      }
    );

    console.log("Document created with ID:", result.$id);

    return new Response(JSON.stringify({ id: result.$id }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    console.error("Error Generating travel plan:", e);

    return new Response("Internal Server Error", { status: 500 });
  }
};
