import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("kin");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
   emailAndPassword: { 
    enabled: true, 
  },

  socialProviders: {
        google: { // [!code highlight]
            clientId: process.env.GOOGLE_CLIENT_ID, // [!code highlight]
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // [!code highlight]
        }, // [!code highlight]
    },

});