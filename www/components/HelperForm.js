import {Button, TextField} from "@material-ui/core";
import GeolocInput from "./GeolocInput";
import {Form} from "./index";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    width: '100%'
  },
  modal: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  }
}));

const HelperForm = (props) => (<Form action={"markers"}>
  <h2>I can help</h2>
  <TextField className={classes.formControl} variant="outlined"
             placeholder={"Describe how you can help, example :  \n- I can deliver foods \n- I make foods"}
             name="message" required={true} multiline={true}/><br/>
  <h3>Your contact infos (will not be shown publicly)</h3>
  <TextField className={classes.formControl} label="Name" name="name" required/><br/>
  <TextField className={classes.formControl} label="Email" name="email" required/><br/>
  <TextField className={classes.formControl} label="Phone" name="phone" required={true}/><br/>
  <br/>
  <GeolocInput />
  <br/>
  <input type="hidden" name={'type'} value={'helper'} />
  <Button type={"submit"} variant="contained" color={'default'} fullWidth={true}>Propose your help</Button>
</Form>);

export default HelperForm;