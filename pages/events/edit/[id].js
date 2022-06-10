import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { API_URL } from "@config/index";
import Layout from "@components/Layout";
import Modal from "@components/Modal";
import { formatDateForState } from "@utils/formatDate";
import { FaImage } from "react-icons/fa";
import styles from "@styles/Form.module.css";
import ImageUpload from "@components/ImageUpload";

const EditEventPage = ({ evt }) => {
  const event = evt.data.attributes;

  const id = evt.data.id;

  const image =
    evt?.data?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url;

  const [values, setValues] = useState({
    name: event?.name,
    performers: event?.performers,
    venue: event?.venue,
    address: event?.address,
    date: formatDateForState(event?.date),
    time: event?.time,
    description: event?.description,
  });

  const [imagePreview, setImagePreview] = useState(image ? image : null);

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    // Validation
    // const hasEmotyFields = Object.values(values).some((el) => el === '')
    for (const [key, value] of Object.entries(values)) {
      if (value === "") {
        valid = false;
        toast.error(`${key.toUpperCase()}  can not be left empty`);
      }
    }

    // if(hasEmotyFields){
    //   toast.error(`please fill all field`);
    //   return;
    // }

    if (valid) {
      const res = await fetch(`${API_URL}/api/eventsses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: values }),
      });

      if (!res.ok) {
        toast.error("Something Went Worng");
      } else {
        const evt = await res.json();

        console.log("evnt: ", evt);

        router.push(`/events/${evt?.data?.attributes?.slug}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    console.log('uploaded')
    const res = await fetch(`${API_URL}/api/eventsses/${id}?populate=*`)
    const data = await  res.json();

    console.log('data from imageUploaded:', data?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url)

    // setImagePreview(image.thumbnail)

    setShowModal(false);

  }

  return (
    <Layout title="Add New Event">
      <Link href="/events">
        <a>Go Back</a>
      </Link>

      <h1>Edit Event</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          {/* name */}
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>

          {/* performers */}
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>

          {/* venue */}
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>

          {/* address */}
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>

          {/* date */}
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>

          {/* time */}
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* description */}
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image alt={event?.name} src={imagePreview} width={170} height={100} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button
          className="btn-secondary"
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => setShowModal(true)}
        >
          <FaImage />
          <span style={{ marginLeft: "0.3rem" }}>Set Image</span>
        </button>
      </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ImageUpload evtId={id} imageUploaded={imageUploaded}/>
        </Modal>

    </Layout>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/eventsses/${id}?populate=*`);

  const evt = await res.json();

  return {
    props: {
      evt,
    },
  };
}

export default EditEventPage;
