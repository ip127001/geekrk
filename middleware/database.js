import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(
  `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${CLUSTER_NAME}/${DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function database(req, res, next) {
  await client.connect();
  req.dbClient = client;
  req.db = client.db("Blog");
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
