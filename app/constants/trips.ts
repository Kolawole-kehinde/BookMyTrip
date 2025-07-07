import { formatDate } from "lib/utils";

  export const allTrips = [{
      id: 1,
      name: "Thornridge Cir. Shiloh",
      imageUrls: ["/assets/images/sample1.jpg"],
      itinerary: [{ location: "St George’s Singapore" }],
      tags: ["Adventure", "Culture"],
      travelStyle: "Solo",
      estimatedPrice: "$1,000",
    },
    {
      id: 2,
      name: "Roraima Tepui",
      imageUrls: ["/assets/images/sample2.jpg"],
      itinerary: [{ location: "Canaima Park, Venezuela" }],
      tags: ["Relaxation", "Culinary"],
      travelStyle: "Family",
      estimatedPrice: "$2,000",
    },
    {
      id: 3,
      name: "Socotra Island",
      imageUrls: ["/assets/images/sample3.jpg"],
      itinerary: [{ location: "Yemen" }],
      tags: ["Shopping", "Luxury"],
      travelStyle: "Couple",
      estimatedPrice: "$3,000",
    },
    {
      id: 4,
      name: "San Lake Baikal",
      imageUrls: ["/assets/images/sample4.jpg"],
      itinerary: [{ location: "Siberia, Russia" }],
      tags: ["Historical", "Culture"],
      travelStyle: "Friends",
      estimatedPrice: "$4,000",
    },
    ];
    export const user = {name: "Khennycool"}
    // export const dashboardStats = {
    //   totalUsers: dashboardStatsFromAPI?.totalUsers ?? 0,
    //   totalTrips: dashboardStatsFromAPI?.totalTrips ?? 0,
    //   userJoined: dashboardStatsFromAPI?.userJoined ?? { currentMonth: 0, lastMonthCount: 0 },
    //   tripCreated: dashboardStatsFromAPI?.tripCreated ?? { currentMonth: 0, lastMonthCount: 0 },
    //   userRole: dashboardStatsFromAPI?.userRole ?? { total: 0, currentMonth: 0, lastMonthCount: 0 },
    // };
    export const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      imageUrl: "/assets/images/david.webp",
      dateJoined: formatDate("2025-06-29"),
      itineraryCreated: 4,
      status: "user",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      imageUrl: "/assets/images/david.webp",
      dateJoined: formatDate("2025-06-29"),
      itineraryCreated: 3,
      status: "user",
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.smith@example.com",
      imageUrl: "/assets/images/david.webp",
      dateJoined: formatDate("2025-6-28"),
      itineraryCreated: 5,
      status: "admin",
    },
  ];