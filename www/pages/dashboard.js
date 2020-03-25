import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper';
import EditProfileForm from "../components/EditProfileForm";
import Header from "../components/Header";
import axios from 'axios';
import getApiUrl from "../utils/helpers/getApiUrl";
import {WithAuthSync} from '../utils/auth';
import Router from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Dashboard = props => {

  const classes = useStyles();

  console.log('Props', props);

  return <React.Fragment>
    <Header></Header>
    <Container component="main" maxWidth="md">
      <h2>Bonjour, {}</h2>
      <EditProfileForm></EditProfileForm>
      <h3>Que souhaitez-vous faire ?</h3>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Paper className={classes.paper}>
                <h4>J'ai besoin d'aide</h4>
                <button>C'est parti</button>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper}>
                <h4>Je veux fournir de l’aide</h4>
                <button>C'est parti</button>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper}>
                <h4>Je demande de l’aide pour quelqu’un d’autre</h4>
                <button>C'est parti</button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </React.Fragment>;
};

export default WithAuthSync(Dashboard);