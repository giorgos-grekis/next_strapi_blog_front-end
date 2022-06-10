const { events } = require("./data.json");

export default function handler(req, res) {
  // this will give an array with just a single event or blog with the slug (strapi).
  const evt = events.filter((ev) => ev.slug === req.query.slug);

  if (req.method === "GET") {
    res.status(200).json({ evt });
  } else {
    res.setHeader("Allow", ["GET"]);
    // 405 method not allow
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
}
