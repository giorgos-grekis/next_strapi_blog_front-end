import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import styles from "@styles/Modal.module.css";

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  console.log('show modal: ', show)

  useEffect(() => setIsBrowser(true), [isBrowser])

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  }

  const modalContent = show ? (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>

        {title && (<div>{title}</div>)}
       <div className={styles.body}>{children}</div>

      </div>
    </div>
  ) : null;


  if(isBrowser) {
    // first item is what we want to insert "modalContent"
    // secnod is where we want to put it "document.getElementById('modal-root')"
      return ReactDOM.createPortal(modalContent, 
        document.getElementById('modal-root')
        )
  }
  else{
      return null;
  }
};

export default Modal;
