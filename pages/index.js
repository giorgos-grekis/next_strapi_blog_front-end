import Link from 'next/link';
import Layout from "@components/Layout";
import EventItem from "@components/EventItem";
import { API_URL } from "@config/index";

const qs = require('qs');

export default function Home({ events }) {


  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events?.data?.length === 0 && <h3>No events to Show</h3>}

      {events?.data?.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}


      {events?.data?.length > 0 && (<Link href='/events'>
        <a className='btn-secondary'>View All</a>
      </Link>)}
    </Layout>
  );
}

export async function getStaticProps() {
  // const res = await fetch(`${API_URL}/api/eventsses?populate=*&sort[0]=date%3Aasc`);

  // const events = await res.json();

  const query = qs.stringify({
    sort: ['date:asc'],

    pagination: {
      // pageSize: 5,
      // page: 1,
      start: 0,
      limit: 2,
    },
    populate: '*', 
  }, {
    encodeValuesOnly: true,
  });

  const res = await fetch(`${API_URL}/api/eventsses?${query}`);

  const events = await res.json();

  return {
    props: { events: events },
    revalidate: 30,
  };
}
