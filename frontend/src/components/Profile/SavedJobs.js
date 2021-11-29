// import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
// import React, { useReducer, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';

// const useStyles = makeStyles((theme)=>({
//     applyButton:{
//         color:'white',
//         width:"200px",
//         height:'40px',
//         borderRadius:'50px',
//         backgroundColor:'#0145E3',
//         marginRight:'2%',
//         '&:hover':{
//             color:'white',
            
//             borderRadius:'50px',
//             backgroundColor:'#0145E3',
//             marginRight:'2%',
//         }
//     },
//     updateButton:{
//         color:'#0145E3',
//         width:"200px",
//         height:'40px',
//         border:'2px solid #909090',
//         borderRadius:'50px',
        
//     }
// }))

// function SavedJobs() {
//     const [check, setCheck] = useState("abc")

//     const handleClick = (item) => {
//         setCheck(item)
//     }

//     useEffect(() => {
//         console.log("here")
//     }, [check])

//     return (
//         <Container style={{padding:'100px 10vw',display:'flex'}}>
//             <Box>
//                 <Typography variant={'h5'} style={{fontSize:'40px',marginBottom:'20px'}}>
//                     My Jobs
//                 </Typography>
//                 <ul style={{display:'flex',marginBottom:'20px'}}>
//                     <NavLink to="/savedjobs" activeStyle={{
//                         color:"#0145E3",
//                         textDecoration:'underline'}} style={{fontSize:'25px',marginRight:"30px"}}>
//                         Saved {jobKeys.length}
//                     </NavLink>
//                     <NavLink to="/appliedjobs" style={{fontSize:'25px'}}>
//                             Applied {applied.length}
//                     </NavLink>
//                 </ul>
//                 <Box>
//                     {
//                     jobKeys.map((key)=>{
//                         return (
//                     <Box style={{display:'flex'}}   key={key} >
//                         <Box style={{width:'500px'}}>
//                             <Typography variant='h5' style={{fontSize:'18px',marginBottom:'15px'}}> 
//                                 {saved_jobs[key].jobTitle}
//                             </Typography>
//                             <Box style={{marginBottom:'15px',fontWeight:'600',color:'grey'}}>
//                                     {saved_jobs[key].companyName} | {saved_jobs[key].location}
//                             </Box>
//                                 <Box style={{marginBottom:'30px',fontSize:'14px',fontWeight:'400',color:'grey'}}>
//                                     Saved { timeDifference(saved_jobs[key].dateSaved)}
//                                 </Box>
//                         </Box>
//                         <Box style={{display:'flex'}}>
//                             <Button className={classes.applyButton} onClick={()=>handleOpen(key)} disabled={applied_job[key]?true:false}>
//                                 {applied_job[key]?"Already applied":"Apply"}
//                             </Button>
//                             <Button className={classes.updateButton}>
//                                 Update
//                             </Button>
//                         </Box>
//                             <Box onClick={()=>{removeFromSaved({jobkey:key})}} style={{cursor:"pointer",width:"40px",height:'40px',display:'flex',justifyContent:'center',alignItems:'center'}} >
//                                 <span>X</span>
//                             </Box>
//                     </Box>
//                         )
//                         })
//                         }
//                     </Box>
//                     <ApplyModal open={open} handleClose = {()=>handleClose()} jobId = {jobId}
//                         handleApply ={()=>handleApply()}/>
//                 </Box>
//         </Container>
//     );
// }

// export default SavedJobs;