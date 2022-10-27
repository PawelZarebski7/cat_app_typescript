import React, {useState, useEffect} from 'react';
import "./App.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField/TextField';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  margin: '0 40px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '500px'
}));

function App() {

  const [cat, setCat] = useState('');
  const [img, setImg] = useState('');
  const [radio, setRadio] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target.value) {
      setRadio(target.value);
    }
 };
  
  useEffect(() => { 

    const imageUrl: URL = new URL((process.env.REACT_APP_CAT_KEY + cat) || "");
    const waitTime = 1000;

    const fetchImage = async () => {
      const res = await fetch(imageUrl);
        if (res.status < 200 || res.status >= 300) {
            setErrorStatus(res.status)
            } 
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
        setLoading(false);
      }

    if(cat !== '') {
      setLoading(true);
      setImg("");
      setErrorStatus(0);
    }
   
    const catTimer = setTimeout(() => fetchImage(), waitTime);
    return () => { clearInterval(catTimer);      
    } 
  },[cat, radio])
  
  return (
    <Box className='child'>
       <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <FormControl className=''>
              <TextField 
                  placeholder='Add Cat Name'
                  type="text" 
                  id='cat' 
                  name='cat'
                  onChange={(e) => setCat(e.target.value)}
              />
              <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={handleChange}
                  >
                  <FormControlLabel 
                    value="red" 
                    control={<Radio />} 
                    checked={radio === "red"} 
                    label="Red"
                    />
                  <FormControlLabel
                    value="green" 
                    control={<Radio />} 
                    checked={radio === "green"} 
                    label="Green"
                  />
                  <FormControlLabel
                    value="blue" 
                    control={<Radio />} 
                    checked={radio === "blue"} 
                    label="Blue"
                  />
                </RadioGroup>
              </FormControl>
                {
                  !cat && <h1 style={{marginTop: '2em'}}>Use form to generate cat</h1>
                }
            </Item>
        </Grid>
                { cat && 
                  <Grid item xs={6}>
                    <Item>
                      {
                        loading && <h1>loading...</h1>
                      }
                      {
                        errorStatus && <h1>Cat could not be generated</h1>
                      }
                      <img src={img} alt="icons" className='margin: auto' />
                    </Item>
                  </Grid>
                }
          </Grid>
    </Box>
  );
}

export default App;
