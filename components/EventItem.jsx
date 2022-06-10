import Link from 'next/link';
import Image from 'next/image';
import styles from '@styles/EventItem.module.css'
import CorrectImageSrc from '../functions/CorrectImageSrc';
import formatDate from '../utils/formatDate';


const EventItem = ({evt}) => {

    const event = evt.attributes
    
    const image_path = event?.image?.data?.attributes?.formats?.thumbnail?.url 

    // const date = event?.date
    // const time = event?.time
    // const name = event?.name
    // const slug = event?.slug

  return (
    <div className={styles.event}>
        <div className={styles.img}>
            <Image 
                src={CorrectImageSrc(image_path)}
                width={170}
                height={100}
            />
        </div>

        <div className={styles.info}>
            <span>
                {formatDate(event?.date) } at {event?.time}
            </span>
            <h3>{event?.name}</h3>
        </div>

        <div className={styles.link}>
            <Link href={`/events/${event?.slug}`}>
                <a className="btn">Details</a>
            </Link>
        </div>

    </div>
  )
}

export default EventItem