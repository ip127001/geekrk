import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(
  "mongodb+srv://ip127001:eXTdWXh1O0kcU3jj@cluster0.jc3c00j.mongodb.net/Blog",
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
