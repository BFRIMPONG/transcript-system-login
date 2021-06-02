

import React from 'react';
import {Button} from "@material-ui/core";

// auth & redux
import { connect } from "react-redux";
import { logoutUser } from "./../auth/actions/userActions";

// React router
import { useHistory } from "react-router-dom";

const Trainee = ({ logoutUser, user }) => {
  const history = useHistory();
  return (
    <div>

        Trainee Dashboard


          <Button to="#" onClick={() => logoutUser(history)}>
            Logout
          </Button>


    </div>
  );
};

const mapStateToProps = ({ session }) => ({
  user: session.user,
});

export default connect(mapStateToProps, { logoutUser })(Trainee);
