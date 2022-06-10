import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { API_URL } from "@config/index";
import styles from "@styles/Form.module.css";
import Layout from "../../components/Layout";

const AddEventPage = () => {
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const router = useRouter();

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
      const res = await fetch(`${API_URL}/api/eventsses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: values }),
      });

      if (!res.ok) {
        toast.error("Something Went Worng");
      }

      else {
        const evt = await res.json();
        
        console.log('evnt: ', evt)
  
        router.push(`/events/${evt?.data?.attributes?.slug}`);
       
      
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">
        <a>Go Back</a>
      </Link>

      <h1>Add Event</h1>

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

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
};

export default AddEventPage;
