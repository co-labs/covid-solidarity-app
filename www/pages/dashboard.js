import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper';
import EditProfileForm from "../components/EditProfileForm";
import Header from "../components/Header";
import {WithAuthSync} from '../utils/auth';
import api from '../utils/api';
import HelperForm from "../components/HelperForm";
import HelpedForm from "../components/HelpedForm";

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

  const [user, setUser] = React.useState({
    first_name: null
  });

  const [getListings, setListings] = React.useState([]);

  useEffect(() => {
    api.get('me').then((res) => setUser(res.data));
  }, []);

  return <React.Fragment>
    <Header></Header>
    <Container component="main" maxWidth="md">
      <h2>Bonjour, {user.first_name}</h2>
      <EditProfileForm></EditProfileForm>
      <h2>Que souhaitez-vous faire ?</h2>
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
      <HelpedForm></HelpedForm>
      <HelperForm></HelperForm>
    </Container>
  </React.Fragment>;
};

export default WithAuthSync(Dashboard);