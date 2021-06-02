import React from 'react';
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField, 
  Typography,
  Link,
} from "@material-ui/core";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {loginUser} from "./../auth/actions/userActions"
import {useHistory} from "react-router-dom"
import background from "../assets/bg.jpg"



const Login = ({loginUser}) => {
  const history = useHistory();
  const paperStyle = { 
    padding: 20,
    width: 300,
    margin: "0px auto",
    marginTop:150
  };
  const avatarStyle = { backgroundColor: "tomato" };
  const textFieldStyle = {
    color: "tomato",
    fontColor: "tomato",
    borderColor: "tomato",
  };
  const checkboxStyle = { color: "tomato", borderColor: "white" };
  const buttonStyle = {
    color: "white",
    backgroundColor: "tomato",
    margin: "8px 0",
  };
  const linkStyle = { color: "tomato" };
  const initialValues = {
    email:'',
    password:'',
    remember: false,
  }

  const styledContainer = {margin: 0, display: "flex", justifyContent: "center", 
    backgroundImage:`url(${background})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100%", width:"100%"

  }
 

  const validationSchema = Yup.object().shape({
    email:Yup.string().email('please enter valid email').required('Required'),
    password:Yup.string().required('Required')
  }) 
  const onSubmit = (values, {setFieldError, setSubmitting}) =>{
    console.log(values);
    loginUser(values, history, setFieldError, setSubmitting)
    
    // setTimeout(()=>{
    //   props.resetForm()
    //   props.setSubmitting(false)
    // }, 1000)
    
  }
  

  return (
    <section style={styledContainer}>
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <HttpsOutlinedIcon />
          </Avatar>
          <h1>Sign in</h1>
        </Grid>

        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {(props) => (
            <Form>
              
              <Field as = {TextField}
                style={textFieldStyle}
                label="Email"
                name = "email"
                placeholder="Enter email"
                fullWidth
                required
                helperText={<ErrorMessage name= "email" />}
              />
              <Field as = {TextField}
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                fullWidth
                required
                helperText={<ErrorMessage name= "password" />}
              />

              <Field as = {FormControlLabel}
              name="remember"
                control={
                  <Checkbox
                    style={checkboxStyle}
                    name="checkedB"
                    color="default"
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                variant="contained"
                style={buttonStyle}
                color="default"
                fullWidth>{props.isSubmitting
                
              ?
                "Loading":"Sign in"}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          <Link style={linkStyle} href="#">
            Forgot password?
          </Link>
        </Typography>

      </Paper>
    </Grid>
    </section>

  );
};

export default connect(null, {loginUser})(Login);
