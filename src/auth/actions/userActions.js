import axios from "axios";
import { sessionService } from "redux-react-session";

export const loginUser = (
  credentials,
  history,
  setFieldError,
  setSubmitting
) => {
  // Make checks and get some data

  return () => {

  axios
    .post(
      "https://amalitech-tms.herokuapp.com/auth/login",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      const { data } = response;
      console.log(data)
      if (response.status === 200) {
        const userData = data.role_type;

        const token = data.token;

        sessionService
          .saveSession(token)
          .then(() => {
            sessionService
              .saveUser(userData)
              .then(() => {
                if (userData === "admin") {
                  history.push("/admin");
                } else if (userData === "user")
                history.push("/trainee");
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      }

      //complete submission
      setSubmitting(false);
    })
    .catch((err) => {
        
        // const { message } = err.message;
        const message = "wrong credentials"
      
        

        // check for specific error
        if (message.includes("credentials")) {
          setFieldError("email", message);
          setFieldError("password", message);
        } else if (message.includes("password")) {
          setFieldError("password", message);
        }
    });

}
};


export const logoutUser = (history) => {
    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        history.push('/');
    }
};
