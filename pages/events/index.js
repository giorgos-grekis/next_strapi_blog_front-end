// import Head from "next/head";
// import Image from "next/image";
import Layout from "@components/Layout";
import EventItem from "@components/EventItem";
import { API_URL } from "@config/index";
const qs = require('qs');

export default function EventPage({ events }) {


  return (
    <Layout>
      <h1>Events</h1>
      {events?.data?.length === 0 && <h3>No events to Show</h3>}

      {events?.data?.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  // const res = await fetch(`${API_URL}/api/events`);
  // const events = await res.json();

  const query = qs.stringify({
    sort: ['date:asc'],

    pagination: {
      // pageSize: 5,
      // page: 1,
      // start: 0,
      // limit: 2,
    },
    populate: '*', 
  }, {
    encodeValuesOnly: true,
  });

  const res = await fetch(`${API_URL}/api/eventsses?${query}`);

  const events = await res.json();

  return {
    props: { events },
    revalidate: 30,
  };
}
