import { GoogleGenerativeAI } from "@google/generative-ai";
import { appwriteConfig, database } from "appwrite/client";
import { parseMarkdownToJson } from "lib/utils";
import { type ActionFunctionArgs } from "react-router";
import { ID } from "appwrite";

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    country,
    numberOfDays,
    travelStyle,
    interests,
    groupType,
    budget,
    userId,
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
      userId,
    });

    const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
Budget: '${budget}'
Interests: '${interests}'
TravelStyle: '${travelStyle}'
GroupType: '${groupType}'
Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
{
  "name": "A descriptive title for the trip",
  "description": "A brief description of the trip and its highlights not exceeding 100 words",
  "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
  "duration": ${numberOfDays},
  "budget": "${budget}",
  "travelStyle": "${travelStyle}",
  "country": "${country}",
  "interests": "${interests}",
  "groupType": "${groupType}",
  "bestTimeToVisit": [
    "🌸 Season (from month to month): reason to visit",
    "☀️ Season (from month to month): reason to visit",
    "🍁 Season (from month to month): reason to visit",
    "❄️ Season (from month to month): reason to visit"
  ],
  "weatherInfo": [
    "☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
    "🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
    "🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
    "❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)"
  ],
  "location": {
    "city": "name of the city or region",
    "coordinates": [latitude, longitude],
    "openStreetMap": "link to open street map"
  },
  "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
        {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
        {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
      ]
    },
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
        tripDetails: JSON.stringify(trip),
        imageUrls: imageUrls,
        createdAt: new Date().toISOString(),
      }
    );

    console.log("Document created with ID:", result.$id);

    return new Response(JSON.stringify({ id: result.$id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error Generating travel plan:", e);

    return new Response("Internal Server Error", { status: 500 });
  }
};
