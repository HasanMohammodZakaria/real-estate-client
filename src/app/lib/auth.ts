import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

if(!process.env.MONGO_DB_URI) {
    throw new Error("MONGO_DB_URI is not defined in environment variables");
}

declare global {
  var _mongoClient: MongoClient | undefined;
}
// const client = new MongoClient(process.env.MONGO_DB_URI);
const client = global._mongoClient ?? new MongoClient(process.env.MONGO_DB_URI);

if (process.env.NODE_ENV !== "production") {
  global._mongoClient = client;
}
const db = client.db(process.env.DATA_BASE_NAME);

client.connect().catch((err) => {
  console.error("MongoDB initial connection failed:", err);
});

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
   emailAndPassword: { 
    enabled: true,
    autoSignIn: false, 
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  user: {
    additionalFields: {
        role: {
            type: "string",
            defaultValue: "user",
            input: false,
        },
    },
  },
  session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 60 * 60 * 24 * 30,
        }
    },
    plugins: [
        jwt()
    ]
});