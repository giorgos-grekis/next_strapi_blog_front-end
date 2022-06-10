import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "../../components/Layout";
import { API_URL } from "@config/index";
import { toast } from "react-toastify";
import styles from "@styles/Event.module.css";

// functions
import CorrectImageSrc from '../../functions/CorrectImageSrc';
import formatDate from '../../utils/formatDate';
const qs = require('qs');

const EventPage = ({ evt }) => {

  const router = useRouter()

  const event = evt.data[0]?.attributes

 

  const id = evt?.data?.[0]?.id
  // const date = event?.date
  // const time = event?.time
  // const name = event?.name

  const image_path = event?.image?.data?.attributes?.formats?.medium?.url




  const deleteEvent = async (e) => {
    if(confirm('Are you sure?')){
      console.log('yes i am');
      const res = await fetch(`${API_URL}/api/eventsses/${id}`,{
        method: 'DELETE',
      })

      console.log('res:', res)

      const data = await res.json()

      console.log('data:', data)


      if(!res.ok) {
        toast.error(data.message)
      }else{
        router.push('/events')
      }

    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          
          {/* edit */}
          <Link href={`/events/edit/${id}`}>
            <a className={styles.edit}>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          
          {/* delete */}
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>

        </div>

        <span>
          {formatDate(event?.date)} at {event?.time}
        </span>

        <h1>{event?.name}</h1>

        {image_path && (
          <div className={styles.img}>
            <Image src={CorrectImageSrc(image_path)} width={960} height={600} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event?.performers}</p>
        <h3>Description: </h3>
        <p>{event?.description}</p>
        <h3>Venue: {event?.venue}</h3>
        <address>{event?.address}</address>

      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  // const res = await fetch(`${API_URL}/api/events`);

  // const events = await res.json();

  // const paths = events.events.map((evt) => ({ params: { slug: evt.slug } }));


  const query = qs.stringify({
    // filters: {
    //   slug: {
    //     $eq: slug
    //   }
    // },
    populate: '*', 
  }, {
    encodeValuesOnly: true,
  });

  const res = await fetch(`${API_URL}/api/eventsses?${query}`);

  const events = await res.json();

  const paths = events?.data?.map((evt) => ({ params: { slug: evt?.attributes?.slug } }));


  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }) {
  // const res = await fetch(`${API_URL}/api/events/${slug}`);

  // const events = await res.json();


  console.log('slug: ', slug)

  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug
      }
    },
    populate: '*', 
  }, {
    encodeValuesOnly: true,
  });

  const res = await fetch(`${API_URL}/api/eventsses?${query}`);

  const events = await res.json();


  return {
    props: {
      evt: events
      //  evt: events.evt[0] 
      },
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);

//   const events = await res.json();

//   return {
//     props: { evt: events.evt[0] },
//   };
// }

export default EventPage;
