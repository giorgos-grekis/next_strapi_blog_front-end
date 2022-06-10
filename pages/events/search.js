import Layout from "@components/Layout";
import EventItem from "@components/EventItem";
import { API_URL } from "@config/index";
import qs from 'qs';
import {useRouter} from 'next/router';
import Link from 'next/link';

export default function SearchPage({ events }) {
  console.log("search Page: ", events);

  const router = useRouter();

  console.log('router: ', router)

  return (
    <Layout title="Search Results">

        <Link href='/events'>
            <a>
                Go Back
            </a>
        </Link>

      <h1>Search Results for {router?.query?.term}</h1>
      {events?.data?.length === 0 && <h3>No events to Show</h3>}

      {events?.data?.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

// we have a query string call term and with this we going to search
export async function getServerSideProps({ query: { term } }) {
  // const res = await fetch(`${API_URL}/api/events`);
  // const events = await res.json();


  const query = qs.stringify({
      filters: {
        $or: [
          {
            name: {
              $containsi: term,
            },
          },
          {
            performers: {
              $containsi: term,
            },
          },
          {
            description: {
              $containsi: term,
            },
          },
          {
            venue: {
              $containsi: term,
            },
          },
        ],
      },
      populate: "*",
    },

    {
      encodeValuesOnly: true,
    }
  );

    const res = await fetch(`${API_URL}/api/eventsses?${query}`);
//   const res = await fetch(
//     `${API_URL}/api/eventsses?filters[name][$containsi]=${term}&populate=%2A`
//   );

  const events = await res.json();

  return {
    props: { events },
  };
}
