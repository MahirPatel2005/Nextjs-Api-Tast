import { MongoClient } from "mongodb";

const uri = "mongodb+srv://test:test123@classassignment.cw2waje.mongodb.net/";
const client = new MongoClient(uri);

export async function GET(req, { params }) {
  try {
    await client.connect();
    const db = client.db("test");
    const coll = db.collection("companies");

    const companyName = decodeURIComponent(params.name); // decode %20 back to space

const doc = await coll.findOne({
  name: { $regex: new RegExp(`^${companyName}$`, "i") } // case-insensitive match
});


    if (!doc) {
      return new Response(JSON.stringify({ message: `No data was found for company: ${companyName}` }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cleanDoc = { ...doc, _id: doc._id.toString() };

    return new Response(JSON.stringify(cleanDoc), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in GET /api/companies/[name]:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await client.close();
  }
}
