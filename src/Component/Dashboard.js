import React,{useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Paper, Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard({id,setid}) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const[showpro,setshowpro]=React.useState(false)
  const [open, setOpen] = React.useState(false);
  const[student,setstudent]=React.useState({Address:'',Age:'',City:'',Class:'',Dob:'',Email:'',Firstname:'',
                                           gender:'',lastname:'',mobileno:'',registerdate:'',school:'',state:'',username:''})

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout=()=>{
    localStorage.clear();
    setid('')
  }

  const showprofile=()=>{
    setshowpro(true)
  }
  // This is for login function 
  const Getrecord=async()=>{
     let body={ 
                'api_key':'key_74bfs_id',
                'studentID':id,
    }

    var config = {
        method: 'post',
        url: 'https://services.fizrobotics.com/api/Olympiad/ViewProfile/',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : body
      };

    let result=await axios(config)
    if(result)
    {
      setstudent({
                  Address:result.data.profile.studentAddress,
                  Age:result.data.profile.studentAge,
                  City:result.data.profile.studentCity,
                  Class:result.data.profile.studentClass,
                  Dob:result.data.profile.studentDOB,
                  Email:result.data.profile.studentEmail,
                  Firstname:result.data.profile.studentFirstName,
                  gender:result.data.profile.studentGender,
                  lastname:result.data.profile.studentLastName,
                  mobileno:result.data.profile.studentMobileno,
                  registerdate:result.data.profile.studentRegisteredDate,
                  school:result.data.profile.studentSchool,
                  state:result.data.profile.studentState,
                  username:result.data.profile.studentUserName
                
                
                
                })
      // history.push('/Dashboard');

    }
    else{

    }
    
    }

    useEffect(() => {
       if(id==null)
       {
         alert("im inisde")
          history.push("/")
       }
        Getrecord(id)
    }, [id])


  const StudentInfo=()=>{ 
    return(
    <div style={{marginTop:'30px'}}>
    <Paper elevation={10} style={{marginTop:'50px',padding:'10px',backgroundColor:'rgba(0,0,0,0.4)'}}>
  <Typography variant="h3" style={{color:'#ffffff'}}>Student Infomation</Typography>
  </Paper>
  <div>
  <Container maxWidth="sm">
  <Paper elevation={3} style={{backgroundColor:'rgba(0,0,0,0.4)'}}>
    <Grid container spacing={3} style={{marginTop:'30px',paddingTop:'20px'}}>
      
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >User Name :</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >{!student.username?(<CircularProgress />):(student.username)}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >First Name :</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}}>{!student.Firstname?(<CircularProgress />):(student.Firstname)}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}}>Last Name :</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}}>{!student.lastname?(<CircularProgress />):(student.lastname)}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >Email :</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >{!student.Email?(<CircularProgress />):(student.Email)}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >Date of Birth</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >{!student.Dob?(<CircularProgress />):(student.Dob)}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >Gender :</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >{!student.gender?(<CircularProgress />):(student.gender)}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >Age :</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >{!student.Age?(<CircularProgress />):(student.Age)}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >Mobile No :</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >{!student.mobileno?(<CircularProgress />):(student.mobileno)}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >Register date :</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >{!student.registerdate?(<CircularProgress />):(student.registerdate)}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >Class :</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >{!student.Class?(<CircularProgress />):(student.Class)}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >School :</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >{!student.school?(<CircularProgress />):(student.school)}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >Student Address</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >{!student.Address?(<CircularProgress />):(student.Address)}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >City :</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >{!student.City?(<CircularProgress />):(student.City)}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >State :</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" style={{color:'#ffffff'}} >{!student.state?(<CircularProgress />):(student.state)}</Typography>
      </Grid>

     
     
  </Grid>
  </Paper>        
  </Container>
  </div>
  </div>
    )
}

  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{backgroundColor:'#1a001a'}}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {`${student.Firstname} ${student.lastname}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        // style={{backgroundColor:'#1a001a'}}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader} >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button onClick={logout}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
            <Divider />
            <ListItem button onClick={showprofile}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {!showpro?(
        <div style={{marginTop:'100px',color:'#ffffff'}}>
        <h1>Welcome {`${student.Firstname} ${student.lastname}`}</h1>
        </div>
        ):(StudentInfo())}
      </main>
    </div>
  );
}
