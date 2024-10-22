import * as React from 'react';
import {useState, useEffect} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GoogleIcon from './Images/google.png';
import FacebookIcon from './Images/facebook.png';
import {LinearProgress, Alert, Modal, AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button, TextField} from '@mui/material'
import {Link} from 'react-router-dom';
import axios from 'axios';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact', 'Login'];
const navItemsLinks = []
navItemsLinks['Home'] = '';
navItemsLinks['About'] = 'about';
navItemsLinks['Concat'] = 'contact';
navItemsLinks['Login'] = 'login';

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginState, setLoginState] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [alertDisplayState, setAlertDisplayState] = useState(false);
  const [alertText, setAlertText] = useState('Alert.');
  const [showLoading, setShowLoading] = useState(false);
  const [alertType, setAlertType] = useState('error');
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleOpen = () => setOpen(true);

  const handleClose = () => {setOpen(false); setLoginState(true)};

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  function isValidPassword(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return password.length >= minLength && hasUppercase && hasLowercase && hasSpecialChar;
  }

  const handleLogout = () => {
    console.log('logged out');
    setIsLoggedIn(false);
    localStorage.removeItem('jwtToken');
    document.body.reload
  }

  const handleSignup = () => {
    if (firstName.length <= 2) {
      setAlertType('error');
      setAlertText("First name must be at least 3 characters!");
      setAlertDisplayState(true);
      setTimeout(() => {setAlertDisplayState(false); setAlertText('')}, 2000);
      return false;
    };

    if (lastName.length <= 2) {
      setAlertType('error');
      setAlertText("Last name must be at least 3 characters!");
      setAlertDisplayState(true);
      setTimeout(() => {setAlertDisplayState(false); setAlertText('')}, 2000);
      return false;
    };
    
    if (email === '' || emailRegex.test(email) === false) {
      setAlertType('error');
      setAlertText("Email is invalid!");
      setAlertDisplayState(true);
      setTimeout(() => {setAlertDisplayState(false); setAlertText('')}, 2000);
      return false;
    }

    if (!isValidPassword(pass)) {
      setAlertType('error');
      setAlertText("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.");
      setAlertDisplayState(true);
      setTimeout(() => {setAlertDisplayState(false); setAlertText('')}, 3000);
      return false;
    };
    let data = {
      firstName : firstName,
      lastName : lastName,
      email : email,
      password : pass,
      phone : '50560072'
    };
    setShowLoading(true);
    axios.post('http://localhost:4000/register', data, {})
      .then(function(response) {
        console.log(response.data);
        if (response.data === 'user exists') {
          setTimeout(() => { 
            setAlertType('error');
            setAlertText("User with this email already exists!");
            setAlertDisplayState(true);
            setShowLoading(false);
          }, 2000);
          setTimeout(() => {setAlertDisplayState(false); setAlertText('')}, 4000);
          return false;
        }

        if (response.data === 'failed to add user') {
          setTimeout(() => { 
            setAlertType('error');
            setAlertText("Database problem with contact a developer!");
            setAlertDisplayState(true);
            setShowLoading(false);
          }, 2000);
          setTimeout(() => {setAlertDisplayState(false); setAlertText('')}, 4000);
          return false;
        }

        setTimeout(() => {
          setAlertType('success');
          setAlertText("Your account has been created successfully!");
          setAlertDisplayState(true);
          setShowLoading(false);
          setTimeout(() => {setAlertDisplayState(false); setAlertText('')}, 4000);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleLogin = () => {
    if (email === '' || emailRegex.test(email) === false) {
      setAlertType('error');
      setAlertText("Email is invalid!");
      setAlertDisplayState(true);
      setTimeout(() => {setAlertDisplayState(false); setAlertText('')}, 2000);
      return false;
    }
    if (pass === '' || pass.length < 8) {
      setAlertType('error');
      setAlertText("Password is invalid!");
      setAlertDisplayState(true);
      setTimeout(() => {setAlertDisplayState(false); setAlertText('')}, 2000);
      return false;
    }
    let data = {
      email: email,
      pass: pass
    }
    setShowLoading(true);
    axios.post('http://localhost:4000/login', data, {})
      .then(function (response) {
        console.log(response.data);
        if (response.data === 'Wrong email') {
          setTimeout(() => { 
            setAlertType('error');
            setAlertText("Email doesn't exist!");
            setAlertDisplayState(true);
            setShowLoading(false);
          }, 2000);
          setTimeout(() => {setAlertDisplayState(false); setAlertText(''); setShowLoading(false)}, 4000);
          return false;
        }

        if (response.data === 'wrong passwrd') {
          setTimeout(() => { 
            setAlertType('error');
            setAlertText("Password is incorrect!");
            setAlertDisplayState(true);
            setShowLoading(false);
          }, 2000);
          setTimeout(() => {setAlertDisplayState(false); setAlertText('')}, 4000);
          return false;
        }

        setTimeout(() => {
          localStorage.setItem('jwtToken', response.data);
          setIsLoggedIn(true);
          setOpen(false);
          setShowLoading(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    let jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken == null) {
      console.log(jwtToken);
      setIsLoggedIn(false);
    } else {
      console.log(jwtToken);
      axios.post('http://localhost:4000/verifyToken', {}, {headers: {'authorization':jwtToken}})
      .then(function (response) {
        if (response.data === 'Failed to authenticate token') {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color:'#EEE8AA' }}>
        UAE Real Estate
      </Typography>
      <Divider sx={{bgcolor:'#D2042D'}}/>
        <List>
          {navItems.map((item, index) => (
            item === 'Login' ? (
              !isLoggedIn ? (
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'center', color: '#606060' }} onClick={handleOpen}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'center', color: '#606060' }} onClick={handleLogout}>
                    <ListItemText primary='Logout' />
                  </ListItemButton>
                </ListItem>
              )
            ) : (
              <Link key={index} to={'/' + navItemsLinks[item]} style={{ textDecoration: 'none' }}>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'center', color: '#606060' }}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{bgcolor:'#000080'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color:'#EEE8AA' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign:'left' , color:'#EEE8AA', fontFamily:'serif' }}
          >
            UAE Real Estate
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              item === 'Login' ?  (
                !isLoggedIn ? (
                  <Button key={item} sx={{ color: '#EEE8AA' }} onClick={handleOpen}>
                    {item}
                  </Button>
                ) : (
                  <Button key={item} sx={{ color: '#EEE8AA' }} onClick={handleLogout}>
                    Logout
                  </Button>
                )
              ) : (
                <Link to={'/' + navItemsLinks[item]}>
                  <Button key={item} sx={{ color: '#EEE8AA' }}>
                    {item}
                  </Button>
                </Link>
              )
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          onClick: (event) => event.stopPropagation(),
        }}
      >
        {loginState === true ? (
          <Box sx={{width:400, height:'auto' , m:'auto', marginTop:11, justifySelf:'center', bgcolor:'white', paddingLeft:3, paddingRight:3, paddingTop:2, borderRadius:5}}>
            <Box sx={{display:'flex', gap:2, marginBottom:1}}>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontFamily:'Merriweather', fontWeight:'bold'}}>
                Sign in or create an account
              </Typography>
              <IconButton aria-label="close" onClick={handleClose} sx={{marginTop:-0.5, marginLeft:1}}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider></Divider>
            <Alert variant='filled' severity={alertType} sx={{marginTop:2, display: alertDisplayState ? 'flex' : 'none' }}>
              {alertText}
            </Alert>
            <TextField 
              id="email" 
              label="E-mail address" 
              variant='outlined' 
              placeholder='Enter your e-mail address' 
              sx={{
                marginTop:3,
                width:'100%',
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#000080', 
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#000080',
                },
              }}
              required
              onChange={(e) => {setEmail(e.target.value)}}
            >
            </TextField>
            <TextField 
              id="password" 
              label="Password" 
              variant='outlined' 
              placeholder='Enter your password'
              type='password' 
              sx={{
                marginTop:3,
                width:'100%',
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#000080', 
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#000080',
                },
              }}
              required
              onChange={(e) => {setPass(e.target.value)}}
            >
            </TextField>
            <Box sx={{marginTop:1, display:showLoading? 'block':'hidden', color:'#000080'}}>
              <LinearProgress color='inherit'/> 
            </Box>
            <Button sx={{
              bgcolor: '#000080',
              color: '#EEE8AA',
              width: '100%',
              height: 40,
              marginTop:2,
              '&:hover': {
                bgcolor: '#16348C',
                color: '#EEE8AA',
              },
            }}
              onClick={handleLogin}
            >
              Sign in
            </Button>
            <Divider sx={{marginTop:1}}>or</Divider>
            <Box sx={{width:'100%', display:'flex', flexDirection:'column', gap:2}}>
              <Button 
                variant='contained' 
                startIcon={<img src={GoogleIcon} alt='Google' style={{width:20, height:20, marginLeft:-80}}/>}
                sx={{
                  bgcolor: '#ffff',
                  color: '#444',
                  width: '100%',
                  fontFamily:'Ubuntu',
                  height: 40,
                  marginTop:2,
                  '&:hover': {
                    bgcolor: '#f6f6f6f6',
                    color: '#666',
                  },
                }}
              >
                Sign in with Google
              </Button>
              <Button 
                variant='contained' 
                startIcon={<img src={FacebookIcon} 
                  alt='Facebook' 
                  style={{width:20, height:20, marginLeft:-73}}
                />}
                sx={{
                  bgcolor: '#ffff',
                  color: '#444',
                  width: '100%',
                  fontFamily:'Ubuntu',
                  height: 40,
                  marginTop:0,
                  '&:hover': {
                    bgcolor: '#f6f6f6f6',
                    color: '#666',
                  },
                }}
              >
                Sign in with Facebook
              </Button>
            </Box>
            <Typography sx={{marginTop:3, width:'100%', textAlign:'center', fontFamily:'Ubuntu', paddingBottom:2}}>
              Don't have an account? 
              <Link href='' onClick={(e)=>{e.preventDefault(); setLoginState(false)}} style={{textDecoration:'none', color:'#000080', marginLeft:5}}>
                Sign up
              </Link>
            </Typography>
          </Box>
        ) : (
          <Box sx={{width:400, height:'auto' , m:'auto', marginTop:11, justifySelf:'center', bgcolor:'white', paddingLeft:3, paddingRight:3, paddingTop:2, borderRadius:5}}>
            <Box sx={{display:'flex', gap:2, marginBottom:1}}>
              <IconButton aria-label="close" onClick={() => {setLoginState(true)}} sx={{marginTop:-0.5, marginLeft:0}}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{width:300, fontFamily:'Merriweather', fontWeight:'bold', textAlign:'center'}}>
                Create an account
              </Typography>
              <IconButton aria-label="close" onClick={handleClose} sx={{marginTop:-0.5}}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider></Divider>
            <Alert variant='filled' severity={alertType} sx={{marginTop:2, display: alertDisplayState ? 'flex' : 'none' }}>
              {alertText}
            </Alert>
            <Box sx={{display:'flex', justifyContent:'space-around', gap:2}}>
              <TextField 
                id="firstName" 
                label="First Name" 
                variant='outlined' 
                placeholder='First Name' 
                sx={{
                  marginTop:3,
                  width:'100%',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#000080', 
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#000080',
                  },
                }}
                required
                onChange={(e) => {setFirstName(e.target.value)}}
              >
              </TextField>

              <TextField 
                id="lastName" 
                label="Last Name" 
                variant='outlined' 
                placeholder='Last Name' 
                sx={{
                  marginTop:3,
                  width:'100%',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#000080', 
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#000080',
                  },
                }}
                required
                onChange={(e) => {setLastName(e.target.value)}}
              >
              </TextField>
            </Box>
            <TextField 
              id="email" 
              label="E-mail address" 
              variant='outlined' 
              placeholder='Enter your e-mail address' 
              sx={{
                marginTop:3,
                width:'100%',
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#000080', 
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#000080',
                },
              }}
              required
              onChange={(e) => {setEmail(e.target.value)}}
            >
            </TextField>
            <TextField 
              id="password" 
              label="Password" 
              variant='outlined' 
              placeholder='Enter your password'
              type='password' 
              sx={{
                marginTop:3,
                width:'100%',
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#000080', 
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#000080',
                },
              }}
              required
              onChange={(e) => {setPass(e.target.value)}}
            >
            </TextField>
            <Box sx={{marginTop:1, display:showLoading? 'block':'hidden', color:'#000080'}}>
              <LinearProgress color='inherit'/> 
            </Box>
            <Button sx={{
              bgcolor: '#000080',
              color: '#EEE8AA',
              width: '100%',
              height: 40,
              marginTop:2,
              '&:hover': {
                bgcolor: '#16348C',
                color: '#EEE8AA',
              }
            }}
              onClick={handleSignup}
            >
              Sign up
            </Button>
            <Divider sx={{marginTop:1}}>or</Divider>
            <Box sx={{width:'100%', display:'flex', flexDirection:'column', gap:2, paddingBottom:2}}>
              <Button 
                variant='contained' 
                startIcon={<img src={GoogleIcon} alt='Google' style={{width:20, height:20, marginLeft:-80}}/>}
                sx={{
                  bgcolor: '#ffff',
                  color: '#444',
                  width: '100%',
                  fontFamily:'Ubuntu',
                  height: 40,
                  marginTop:2,
                  '&:hover': {
                    bgcolor: '#f6f6f6f6',
                    color: '#666',
                  },
                }}
              >
                Sign up with Google
              </Button>
              <Button 
                variant='contained' 
                startIcon={<img src={FacebookIcon} 
                  alt='Facebook' 
                  style={{width:20, height:20, marginLeft:-73}}
                />}
                sx={{
                  bgcolor: '#ffff',
                  color: '#444',
                  width: '100%',
                  fontFamily:'Ubuntu',
                  height: 40,
                  marginTop:0,
                  '&:hover': {
                    bgcolor: '#f6f6f6f6',
                    color: '#666',
                  },
                }}
              >
                Sign up with Facebook
              </Button>
            </Box>
          </Box>
        )
        }
      </Modal>
    </Box>
  );
}