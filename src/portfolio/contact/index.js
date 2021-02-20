import emailjs from 'emailjs-com';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './Contact.scss';

const SERVICE_ID = 'service_0ox76q6';
const TEMPLATE_ID = 'template_j7cdatm';
const USER_ID = 'user_5Y6wdYpsMa6uQJwIO8yPs';

export default function Contact() {
  const { register, errors, handleSubmit, reset } = useForm();

  const toastifySuccess = () => {
    toast.success('⚽ From sent!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success',
      toastId: 'notifyToast',
    });
  };

  const onSubmit = async (data) => {
    // Send form email
    try {
      const templateParams = {
        name: data.name,
        subject: data.subject,
        email: data.email,
        message: data.message,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);

      reset();
      toastifySuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="contact" id="contact">
      <h2 className="section__title contact__title">Contact</h2>
      <form
        className="contact__form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          ref={register({
            required: { value: true, message: 'Please enter your name' },
            maxLength: {
              value: 30,
              message: 'Please use 30 characters or less',
            },
          })}
        />
        {errors.name && (
          <span className="contact__error">* {errors.name.message}</span>
        )}
        <br />
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          name="subject"
          ref={register({
            required: { value: true, message: 'Please enter a subject' },
            maxLength: {
              value: 75,
              message: 'Subject cannot exceed 75 characters',
            },
          })}
        />
        {errors.subject && (
          <span className="contact__error">* {errors.subject.message}</span>
        )}
        <br />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          ref={register({
            required: true,
            pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
        />
        {errors.email && (
          <span className="contact__error">
            * Please enter a valid email address
          </span>
        )}
        <br />
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          ref={register({
            required: true,
          })}
        ></textarea>
        {errors.message && (
          <span className="contact__error">* Please enter a message</span>
        )}
        <br />
        <div className="contact__block-btn">
          <input className="btn" type="submit" value="Send" />
        </div>
      </form>
      <ToastContainer />
    </section>
  );
}
