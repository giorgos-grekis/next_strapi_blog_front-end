// import Head from "next/head";
// import Image from "next/image";
import Layout from "@components/Layout";
import EventItem from "@components/EventItem";

import { API_URL, PER_PAGE } from "@config/index";
import Pagination from "@components/Pagination";
const qs = require("qs");



export default function EventPage({ events, pageCount }) {
  const totalPage = events?.meta?.pagination?.total;



  return (
    <Layout>
      <h1>Events</h1>
      {events?.data?.length === 0 && <h3>No events to Show</h3>}

      {events?.data?.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination pageCount={pageCount} totalPage={totalPage} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // convert page to naumber
  let pageCount = Number(page);

  // Calculate start page
  const start = pageCount === 1 ? 0 : (pageCount - 1) * PER_PAGE;

  const query = qs.stringify(
    {
      sort: ["date:asc"],

      pagination: {
        // pageSize: 5,
        // page: 1,
        start: start,
        limit: PER_PAGE,
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${API_URL}/api/eventsses?${query}`);

  const events = await res.json();

  return {
    props: { events, pageCount },
  };
}
