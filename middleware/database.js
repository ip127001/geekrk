import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(
  `mongodb+srv://${process.env.NEXT_PUBLIC_USER_NAME}:${process.env.NEXT_PUBLIC_PASSWORD}@${process.env.NEXT_PUBLIC_CLUSTER_NAME}/${process.env.NEXT_PUBLIC_DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export async function connnectToDatabase() {
  await client.connect();
  const dbClient = client;
  const db = client.db("Blog");
  return { dbClient, db };
}

async function database(req, res, next) {
  await client.connect();
  req.dbClient = client;
  req.db = client.db("Blog");
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
