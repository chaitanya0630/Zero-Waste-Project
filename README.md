# ZeroWaste - AI Powered Geo-Intelligent Food Donation & Rescue System

## Project Title
ZeroWaste - AI Powered Geo-Intelligent Food Donation & Rescue System

## Selected Domain
Social Impact & Sustainability, Food Donation, AI, Geospatial Technology

## Problem Statement / Use Case
The world faces a growing problem of food waste and hunger, with tons of food being wasted while millions of people go hungry. The **ZeroWaste** project addresses this issue by creating a platform that facilitates food donations from individuals and organizations to people in need. The platform leverages AI, geospatial technology, and real-time data to connect food donors with receivers, optimize food donation processes, and reduce food wastage, all while minimizing carbon footprints.

## Abstract / Problem Description
**ZeroWaste** is a web application designed to tackle the global issue of food waste and hunger. This platform allows individuals and organizations (such as restaurants, stores, and households) to donate surplus food to those in need, such as NGOs, shelters, or other recipients. Using real-time geospatial data, the platform enables efficient routing and tracking of food donations, ensuring that food reaches its destination in the shortest time possible.

The system also provides real-time updates on the food status (Fresh & Available, Near Expiry, Picked/Expired) and integrates live routing using the Google Directions API for donation pick-ups. The admin panel manages user moderation, fraud detection, food post status, and daily reports on food saved, CO₂ emissions prevented, and people served. This AI-powered food donation system helps reduce waste, feed the hungry, and promote a more sustainable future.

## Tech Stack Used
- **Frontend**:
  - **TypeScript**: For type safety and better development experience.
  - **React**: For building interactive user interfaces.
  - **Tailwind CSS**: For utility-first CSS framework to style the application.
  - **Shadcn-UI**: For reusable UI components.
  
- **Backend**:
  - **Supabase**: For the backend database, authentication, and real-time updates.

- **Geospatial & Routing**:
  - **Google Maps API**: For map integration, geolocation, and live routing.
  - **Google Directions API**: For real-time food donation pick-up routing.

- **Deployment & Hosting**:
  - **Vercel**: For easy deployment and serverless hosting of the frontend.
  - **Supabase**: For hosting the backend and database.

## Project Explanation
The **ZeroWaste** web application has been designed to help combat food wastage and hunger by creating a platform that enables food donations. The main features of the platform include:

- **Sign-Up and Authentication**: Users can sign up as donors, receivers, or admins. The authentication system is managed using **Supabase**.
  
- **Food Donation System**: Donors can post available food items, including information on the food’s expiry date, and receivers can browse available donations near them. Food items are categorized as Fresh & Available, Near Expiry, or Picked/Expired, and marked accordingly.

- **GeoMap Dashboard**: Displays a map with live food status markers and real-time routing for food donation pickups using **Google Maps** and **Google Directions API**.

- **Admin Panel**: Admins can moderate users, manage food posts, and access daily reports on food donations, people served, and CO₂ emissions prevented.

- **Fraud Detection and Reporting**: The system allows users to flag fraudulent posts or users, and the admin can review and take necessary actions.

## How to Run the Project Locally

Follow these steps to run the project locally:

1. **Clone the repository**:
   ```bash
   git clone <YOUR_GIT_URL>
