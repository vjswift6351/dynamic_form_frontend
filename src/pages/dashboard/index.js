import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FormsListing from '../forms';
import UserListing from '../user';
import { useEffect } from 'react';
import { Button, Chip, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');
  const [userData, setUserData] = React.useState(null);

  const router = useRouter()

  useEffect(()=>{
    let getUserDetails = JSON.parse(localStorage.getItem('userDetails'))
    if(getUserDetails){
      setUserData(getUserDetails)
    }
    else{
      router.push('/login')
    }
    
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  return (
    <>
      {userData ?
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Button sx={{float:'right', marginLeft:'10px'}} variant='outlined' onClick={handleLogout}>Logout</Button>
          {userData.isadmin == "true" ? 
            <Chip sx={{float:'right'}} label="Logged in as Admin" color="success" />
          :
            <Chip sx={{float:'right'}} label="Logged in as User" color="warning" />
          }
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Form" value="1" />
                {userData.isadmin == "true" &&
                  <Tab label="User" value="2" />
                }
              </TabList>
            </Box>
            <TabPanel value="1">
              <FormsListing isadmin = {userData.isadmin} />
            </TabPanel>
            {userData.isadmin == "true" &&
              <TabPanel value="2">
                <UserListing />
              </TabPanel>
            }
          </TabContext>
        </Box>
        :
        null
      }
    </>
  );
}