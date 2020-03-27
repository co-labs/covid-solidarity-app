import {Button, TextField} from "@material-ui/core";
import GeolocInput from "./GeolocInput";
import {Form} from "./index";
import React from "react";

const HelperForm = (props) => (<Form action={"markers"}>
  <h2>I can help</h2>
  <TextField variant="outlined"
             placeholder={"Describe how you can help, example :  \n- I can deliver foods \n- I make foods"}
             name="message" required={true} multiline={true}/><br/>
  <h3>Your contact infos (will not be shown publicly)</h3>
  <TextField label="Name" name="name" required/><br/>
  <TextField label="Email" name="email" required/><br/>
  <TextField label="Phone" name="phone" required={true}/><br/>
  <br/>
  <GeolocInput />
  <br/>
  <input type="hidden" name={'type'} value={'helper'} />
  <Button type={"submit"} variant="contained" color={'default'} fullWidth={true}>Propose your help</Button>
</Form>);

export default HelperForm;