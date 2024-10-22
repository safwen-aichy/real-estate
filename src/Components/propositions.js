import React from 'react'
import { Card, CardContent, CardMedia, Typography, CardActionArea, Box } from '@mui/material';
import exclusiveImage from './Images/exclusive.jpg';
import luxuryImage from './Images/luxury.jpg';
import newDevImage from './Images/newdev.png';

function Propositions() {
    return (
      <div className="Propositions">
        <Box sx={{width:100, height:4, marginLeft:13, marginTop:8, bgcolor:'#EEE8AA'}}></Box>
        <Typography variant='h4' color="#000080" sx={{textAlign:'start', marginTop: 3, marginLeft: 13}}>Discover Exciting Oppurtunities</Typography>

        <Box sx={{width:'100%', height: 500, padding: 2, display:'flex', gap:6, alignItems:'center', justifyContent:'center'}}>
            <Card sx={{
                maxWidth: 420,
                '&:hover': {
                    '& .MuiTypography-body2': {
                        color: '#EEE8AA',
                        transition: 'color 0.5 ease',
                    },
                },
            }} >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="270"
                        image={exclusiveImage}
                        alt="green iguana"
                    />
                    <CardContent sx={{textAlign:'start'}}>
                        <Typography gutterBottom variant="h5" component="div" sx={{color:'#000080'}}>
                            Exclusive Properties for Sale
                        </Typography>
                        <Typography variant="body2" color="#000080" sx={{transition: 'color 0.3s ease'}}>
                            <b>257</b> Properties
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{
                maxWidth: 420,
                '&:hover': {
                    '& .MuiTypography-body2': {
                        color: '#EEE8AA',
                        transition: 'color 0.5 ease',
                    },
                },
            }} >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="270"
                        image={luxuryImage}
                        alt="green iguana"
                    />
                    <CardContent sx={{textAlign:'start'}}>
                        <Typography gutterBottom variant="h5" component="div" sx={{color:'#000080'}}>
                            Luxury Properties
                        </Typography>
                        <Typography variant="body2" color="#000080" sx={{transition: 'color 0.3s ease'}}>
                            <b>89</b> Properties
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{
                maxWidth: 420,
                '&:hover': {
                    '& .MuiTypography-body2': {
                        color: '#EEE8AA',
                        transition: 'color 0.5 ease',
                    },
                },
            }} >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="270"
                        image={newDevImage}
                        alt="green iguana"
                    />
                    <CardContent sx={{textAlign:'start'}}>
                        <Typography gutterBottom variant="h5" component="div" sx={{color:'#000080'}}>
                            New Developments
                        </Typography>
                        <Typography variant="body2" color="#000080" sx={{transition: 'color 0.3s ease'}}>
                            <b>23</b> Properties
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
      </div>
    );
  }
  
  export default Propositions;