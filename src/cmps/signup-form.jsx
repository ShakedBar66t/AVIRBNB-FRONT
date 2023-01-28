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
// import { TOGGLE_LOGIN_MODAL } from '../store/reducers/user.reducer'
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
//       fullname: data.get('fullname'),
      
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
//               id="fullname"
//             //   label="Email Address"
//             placeholder='Full Name'
//               name="fullname"
//               autoComplete="fullname"
//             //   autoFocus
//               color='secondary'
//             />
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
//             }













// // import * as React from 'react';
// // import Avatar from '@mui/material/Avatar';
// // import Button from '@mui/material/Button';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import TextField from '@mui/material/TextField';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import Checkbox from '@mui/material/Checkbox';
// // import Link from '@mui/material/Link';
// // import Grid from '@mui/material/Grid';
// // import Box from '@mui/material/Box';
// // import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// // import Typography from '@mui/material/Typography';
// // import Container from '@mui/material/Container';
// // import { createTheme, ThemeProvider } from '@mui/material/styles';

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

// // const theme = createTheme();

// // export  function SignUpForm() {
// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     const data = new FormData(event.currentTarget);
// //     console.log({
// //       email: data.get('email'),
// //       password: data.get('password'),
// //       fullname: data.get('firstName'),
// //     });
// //   };

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <Container component="main" >
// //       {/* <Container component="main" maxWidth="xs"> */}
// //         <CssBaseline />
// //         <Box
// //           sx={{
// //             marginTop: 1,
// //             display: 'flex',
// //             flexDirection: 'column',
// //             alignItems: 'center',
// //           }}
// //         >
// //           {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
// //             <LockOutlinedIcon />
// //           </Avatar> */}
// //           {/* <Typography component="h1" variant="h5">
// //             Sign up
// //           </Typography> */}

// //           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ m:1}}>
// //             <Grid container spacing={2}>
// //               <Grid item xs={12} sx={{ m:0,p:0}} >
// //                 <TextField
// //                   autoComplete="given-name"
// //                   name="firstName"
// //                   required
// //                   fullWidth
// //                   id="firstName"
                
// //                 //   label="First Name"
// //                 placeholder='Full Name'
// //                   autoFocus
// //                 />
// //               </Grid>
// //               {/* <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   required
// //                   fullWidth
// //                   id="lastName"
// //                   label="Last Name"
// //                   name="lastName"
// //                   autoComplete="family-name"
// //                 />
// //               </Grid> */}
// //               <Grid item xs={12}>
// //                 <TextField
// //                   required
// //                   fullWidth
// //                   id="email"
// //                   label="Email Address"
// //                   name="email"
// //                   autoComplete="email"
// //                 />
// //               </Grid>
// //               <Grid item xs={12}>
// //                 <TextField
// //                   required
// //                   fullWidth
// //                   name="password"
// //                   label="Password"
// //                   type="password"
// //                   id="password"
// //                   autoComplete="new-password"
// //                 />
// //               </Grid>
// //               <Grid item xs={12}>
// //                 {/* <FormControlLabel
// //                   control={<Checkbox value="allowExtraEmails" color="primary" />}
// //                   label="I want to receive inspiration, marketing promotions and updates via email."
// //                 /> */}
// //               </Grid>
// //             </Grid>
// //             {/* <Button
// //               type="submit"
// //               fullWidth
// //               variant="contained"
// //               sx={{ mt: 3, mb: 2 }}
// //             >
// //               Sign Up
// //             </Button> */}
// //             <button>sign up</button>
// //             <Grid container justifyContent="flex-end">
// //               <Grid item>
// //                 {/* <Link href="#" variant="body2">
// //                   Already have an account? Sign in
// //                 </Link> */}
// //               </Grid>
// //             </Grid>
// //           </Box>
// //         </Box>
// //         {/* <Copyright sx={{ mt: 5 }} /> */}
// //       </Container>
// //     </ThemeProvider>
// //   );
// // }