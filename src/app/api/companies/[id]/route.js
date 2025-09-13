import clientPromise from "../../mongodb/mongoClient";
import { ObjectId } from "mongodb";

// --------------------- GET ---------------------
export async function GET(req, { params }) {
  try {
    const { id } = params;

    const client = await clientPromise;
    const db = client.db("test");
    const coll = db.collection("companies");

    const doc = await coll.findOne({ _id: new ObjectId(id) });

    if (!doc) {
      return new Response(JSON.stringify({ error: "Company not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ ...doc, _id: doc._id.toString() }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Error in GET /api/companies/[id]:", err);
    return new Response(JSON.stringify({ error: "Invalid ID or server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// --------------------- PUT ---------------------
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const updates = await req.json();

    const client = await clientPromise;
    const db = client.db("test");
    const coll = db.collection("companies");

    const result = await coll.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Company not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(
      JSON.stringify({ message: "Company updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    console.error("Error in PUT /api/companies/[id]:", err);
    return new Response(JSON.stringify({ error: "Invalid ID or server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// --------------------- DELETE ---------------------
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const client = await clientPromise;
    const db = client.db("test");
    const coll = db.collection("companies");

    const result = await coll.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Company not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(
      JSON.stringify({ message: "Company deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    console.error("Error in DELETE /api/companies/[id]:", err);
    return new Response(JSON.stringify({ error: "Invalid ID or server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
