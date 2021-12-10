import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import TvIcon from "@mui/icons-material/Tv";


export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    // fired every time the state chnges
    useEffect(() => {
        if(value===0){
            navigate('/');
        }
        else if (value === 1) {
            navigate('/movies');
        }
        else if (value === 2) {
            navigate('/series');
        }
        else if (value === 3) {
            navigate('/search');
        }
    }, [navigate, value]);

  return (
    <Box
      sx={{
        width: "100%",
        background: "#0013ce",
        color: "white",
        position: "fixed",
        bottom: 0,
        zIndex: "100",
        borderTop: "1px solid #0c8ec2",
      }}
    >
      <BottomNavigation
        style={{
          backgroundColor: "#000",
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={{
            color: "#fff",
          }}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={{
            color: "#fff",
          }}
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          style={{
            color: "#fff",
          }}
          label="TV-Series"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          style={{
            color: "#fff",
          }}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
