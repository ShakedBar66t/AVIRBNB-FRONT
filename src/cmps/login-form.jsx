import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  grey, pink } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { TOGGLE_IS_SIGNUP_MODAL } from '../store/reducers/user.reducer';
import { useState } from 'react';
import { login,signup } from '../store/user.actions';
export  function SignInForm({onCloseLoginModal}) {

  const [isValid,setIsValid] = useState('')
  const dispatch = useDispatch()
  const isSignUpModal = useSelector(storeState => storeState.userModule.isSignUpModal)

const theme = createTheme({
  palette: {
    primary:{
      main: pink[500]
    },
    secondary:{
      main: grey[800]
    }
  }
})

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const currUser = {
      email: data.get('email'),
      password: data.get('password'),
      fullname: data.get('fullname'),
    }
    validate(currUser)
    if(isValid){
      return
    }
    if(isSignUpModal){
    console.log('this is curr user',currUser)
    signup(currUser)
    .then(onCloseLoginModal)
    .catch(err=>{
      console.log('damn',err)
    })
    return
  }

  login(currUser).then(onCloseLoginModal)
  .catch(setIsValid)
  
  };
  // const  handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const currUser = {
  //     email: data.get('email'),
  //     password: data.get('password'),
  //     fullname: data.get('fullname'),
  //   }
  //   validate(currUser)
  //   if(isValid){
  //     return
  //   }
  //   if(isSignUpModal){
  //   console.log('this is curr user',currUser)
  //   signup(currUser)
  //   .then(onCloseLoginModal)
  //   .catch(err=>{
  //     console.log('damn',err)
  //   })
  //   return
  // }

  // login(currUser).then(onCloseLoginModal)
  
  // };

  function validate(user){
    if (!user.email.includes('@') || !user.email.includes('.')){
      setIsValid('Invalid mail')
      return  }
    if(user.password.length<8 || user.password.length>16){
      setIsValid('Password should have 8 to 16 characters')
      return 
    }
    if(user?.fullname?.includes(' ') ===true){
      setIsValid('Invalid full name')
      return 
    }
    
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" >
      
        <CssBaseline />
        <Box
          sx={{
           
            display: 'flex',
            flexDirection: 'column',
            ml:0,
          
          }}
        >
  
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            {(isSignUpModal) && <TextField
              required
              fullWidth
              id="fullname"
            placeholder='Full Name'
              name="fullname"
              autoComplete="fullname"
              color='secondary'
            />}

            <TextField
              required
              fullWidth
              id="email"
            placeholder='Email Address'
              name="email"
              autoComplete="email"
              color='secondary'
            />
            <TextField
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              placeholder='Password'
              autoComplete="current-password"
              color='secondary'
            />
            <p className='signup-link'>{(isSignUpModal)? ' Already have an account? ':'Don\'t have an account? '} 
            <span onClick={()=>{
              setIsValid('')
              dispatch({type:TOGGLE_IS_SIGNUP_MODAL})}
              }>{(isSignUpModal)? 'Sign In':'Sign Up'} </span> </p>
            <button className='login-btn'>Continue</button>
            <p style={{padding:'10px 0' }}>{isValid}</p>
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
            }













// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const theme = createTheme();

// export  function SignUpForm() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//       fullname: data.get('firstName'),
//     });
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" >
//       {/* <Container component="main" maxWidth="xs"> */}
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar> */}
//           {/* <Typography component="h1" variant="h5">
//             Sign up
//           </Typography> */}

//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ m:1}}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sx={{ m:0,p:0}} >
//                 <TextField
//                   autoComplete="given-name"
//                   name="firstName"
//                   required
//                   fullWidth
//                   id="firstName"
                
//                 //   label="First Name"
//                 placeholder='Full Name'
//                   autoFocus
//                 />
//               </Grid>
//               {/* <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="lastName"
//                   label="Last Name"
//                   name="lastName"
//                   autoComplete="family-name"
//                 />
//               </Grid> */}
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 {/* <FormControlLabel
//                   control={<Checkbox value="allowExtraEmails" color="primary" />}
//                   label="I want to receive inspiration, marketing promotions and updates via email."
//                 /> */}
//               </Grid>
//             </Grid>
//             {/* <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign Up
//             </Button> */}
//             <button>sign up</button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 {/* <Link href="#" variant="body2">
//                   Already have an account? Sign in
//                 </Link> */}
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         {/* <Copyright sx={{ mt: 5 }} /> */}
//       </Container>
//     </ThemeProvider>
//   );
// }



// // import { userService } from "../../services/user.service.js"

// // const { useState } = React
// // console.log(userService);
// // export function LoginForm({ onLogin, isSignup }) {

// //     const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

// //     function handleChange({ target }) {
// //         const { name: field, value } = target
// //         setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
// //     }

// //     function handleSubmit(ev) {
// //         ev.preventDefault()
// //         onLogin(credentials)
// //     }

// //     return (
// //         <form className="login-form" onSubmit={handleSubmit}>
// //             <input
// //                 type="text"
// //                 name="username"
// //                 value={credentials.username}
// //                 placeholder="Username"
// //                 onChange={handleChange}
// //                 required
// //                 autoFocus
// //             />
// //             <input
// //                 type="password"
// //                 name="password"
// //                 value={credentials.password}
// //                 placeholder="Password"
// //                 onChange={handleChange}
// //                 required
// //             />
// //             {isSignup && <input
// //                 type="text"
// //                 name="fullname"
// //                 value={credentials.fullname}
// //                 placeholder="Full name"
// //                 onChange={handleChange}
// //                 required
// //             />}
// //             <button>{isSignup ? 'Signup' : 'Login'}</button>
// //         </form>
// //     )
// // }




// // import { useState } from "react"

// // export function SignInForm(){


// //   return <form action="">
// //     <input
// //      type="text"
// //      placeholder="Email Address"
// //      name="email"

// //      />

// //     <input type="password" />
// //   </form>
// // }











// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { deepOrange, green, grey, orange, pink } from '@mui/material/colors';
// import { useDispatch } from 'react-redux';
// import { TOGGLE_LOGIN_MODAL } from '../store/reducers/user.reducer'


// // function Copyright(props) {
// //   return (
// //     <Typography variant="body2" color="text.secondary" align="center" {...props}>
  
// //       {'Copyright © '}
// //       <Link color="inherit" href="https://mui.com/">
// //         Your Website
// //       </Link>{' '}
// //       {new Date().getFullYear()}
// //       {'.'}
// //     </Typography>
// //   );
// // }

// const theme = createTheme();

// export  function SignInForm() {
//   const dispatch = useDispatch()
// const theme = createTheme({
//   palette: {
//     primary:{
//       main: pink[500]
//     },
//     secondary:{
//       main: grey[800]
//     }
//   }
// })

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" >
//       {/* <Container component="main" maxWidth="xs"> */}
//         <CssBaseline />
//         <Box
//           sx={{
//             // marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             ml:0,
//             // alignItems: 'center',
//           }}
//         >
//           {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar> */}
//           {/* <Typography component="h1" variant="h5">
//             Sign in
//           </Typography> */}
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//             //   margin="normal"
//               required
//               fullWidth
//               id="email"
//             //   label="Email Address"
//             placeholder='Email Address'
//               name="email"
//               autoComplete="email"
//             //   autoFocus
//               color='secondary'
//             />
//             <TextField
//             //   margin="normal"
//               required
//               fullWidth
//               name="password"
//               // label="Password"
//               type="password"
//               id="password"
//               placeholder='Password'
//               autoComplete="current-password"
//               color='secondary'
//             />
//             {/* <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             /> */}
//             <p className='signup-link'>Don't have an account? <span>Sign Up</span> </p>
//             <button className='login-btn'>Continue</button>
//             {/* <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 1, mb: 1 }}
//             >
//               Sign In
//             </Button> */}


//             <Grid container>
//               <Grid item xs>
//                 {/* <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link> */}
//               </Grid>
//               <Grid item>
//                 {/* <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link> */}
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
//       </Container>
//     </ThemeProvider>
//   );
// }