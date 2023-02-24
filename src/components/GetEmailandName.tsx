import React, { useEffect, useState } from 'react';
import { Modal } from '@mantine/core';
import { Form, Formik } from 'formik';
import { usePaystackPayment } from 'react-paystack';

export default function GetEmailandName({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const [details, setDetails] = useState({ name: '', email: '' });
  const [touched, setTouched] = useState(false);

  const initializePayment = usePaystackPayment({
    amount: 10000,
    email: details?.email,
    firstname: details?.name,
    publicKey: process.env.GATSBY_PAYSTACK_PUBLIC_KEY!,
  });

  useEffect(() => {
    if (touched && details.name.length !== 0) {
      close();
      initializePayment();
      setTouched(false);
    }
  }, [touched, details]);

  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
      }}
      styles={{ modal: { width: '400px' } }}
      title="Proceed to payment"
    >
      <Formik
        initialValues={details}
        onSubmit={(val) => {
          localStorage.setItem('details', JSON.stringify(val));
          setTouched(true);
          setDetails(val);
        }}
      >
        {({ values, handleChange }) => {
          return (
            <Form>
              <div style={{ paddingBottom: '1rem' }}>
                <label
                  htmlFor="email"
                  style={{ display: 'block', paddingBottom: '.3rem' }}
                >
                  Email<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={handleChange}
                  className=" "
                  style={{
                    border: '1px solid grey',
                    padding: '.5rem .3rem',
                    width: '100%',
                    borderRadius: '2px',
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  style={{ display: 'block', paddingBottom: '.2rem' }}
                >
                  Name<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  required
                  onChange={handleChange}
                  style={{
                    border: '1px solid grey',
                    padding: '.5rem .3rem',
                    width: '100%',
                  }}
                />
              </div>
              <div className="btn-box">
                <button type="submit">Next</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}
