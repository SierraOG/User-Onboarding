import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm({ values, errors, touched, isSubmitting }) {
  return (
    <div className='login'>
      <h1>Sign up</h1>
    <Form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '47%'}}>
          {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
          <Field name="firstName" placeholder="First Name" />
        </div>
        <div style={{width: '47%'}}>
          {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
          <Field name="lastName" placeholder="Last Name" />
        </div>
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <div style = {{display:'flex', justifyContent: 'space-between'}}>
        <h4>Select shirt size</h4>
        <Field style = {{height: '30px', alignSelf: 'center', width: '40%', padding: '0'}}component="select" name="shirt">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </Field>
      </div>
      <label style ={{color: 'white', display: 'flex'}}>
        <Field style={{width: '15px', boxShadow: 'none'}} type="checkbox" name="tos" checked={values.tos} />
        I accept the Terms of Service
      </label>
      <button className="btn btn-primary btn-block btn-large" disabled={isSubmitting}>Submit</button>
    </Form>
    </div>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ email, firstName, lastName, password, tos, shirt }) {
    return {
      email: email || "",
      firstName: firstName || "",
      lastName: lastName || "",
      password: password || "",
      tos: tos || false,
      shirt: shirt || "medium"
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    firstName: Yup.string()
      .max(50, 'Too long, 50 character maximum reached')
      .required("First name is required"),
    lastName: Yup.string()
      .max(50, 'Too long, 50 character maximum reached')
      .required("Last name is required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters or longer")
      .required("Password is required"),
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "waffle@syrup.com") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post(" https://reqres.in/api/users", values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          window.alert(`Successful submit: email: ${res.data.email}, name: ${res.data.name} `)
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  }
})(LoginForm);

export default FormikLoginForm;