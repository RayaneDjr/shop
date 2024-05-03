import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { shades } from "../../theme";
import Shipping from "./Shipping";
import Payment from "./Payment";

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("champ requis"),
      lastName: yup.string().required("champ requis"),
      country: yup.string().required("champ requis"),
      street1: yup.string().required("champ requis"),
      street2: yup.string(),
      city: yup.string().required("champ requis"),
      zipCode: yup.string().required("champ requis"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: (value) => value === false,
        then: (schema) => schema.required("champ requis"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: (value) => value === false,
        then: (schema) => schema.required("champ requis"),
      }),
      country: yup.string().when("isSameAddress", {
        is: (value) => value === false,
        then: (schema) => schema.required("champ requis"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: (value) => value === false,
        then: (schema) => schema.required("champ requis"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: (value) => value === false,
        then: (schema) => schema.required("champ requis"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: (value) => value === false,
        then: (schema) => schema.required("champ requis"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("champ requis"),
    phoneNumber: yup.string().required("champ requis"),
  }),
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("ShippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {}

  return (
    <Box width='80%' m='100px auto'>
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Addresses</StepLabel>
        </Step>
        <Step>
          <StepLabel>Paiement</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display='flex' justifyContent='space-between' gap='30px'>
                {isSecondStep && (
                  <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}>
                    Retour
                  </Button>
                )}
                <Button
                  fullWidth
                  type='submit'
                  color='primary'
                  variant='contained'
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}>
                  {isFirstStep ? "Suivant" : "Commander"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
