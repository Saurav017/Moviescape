import React from 'react'
import Pagination from "@mui/material/Pagination";
import {createTheme} from '@material-ui/core';
import { ThemeProvider } from '@mui/material';
// creating a theme for the pagination
const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#ccc'
        }
    }
});


const CustomPagination = ({ setContentPage, numofPages = 10 }) => {

    const handlePageChange = (page) => {
        setContentPage(page);
        window.scrollTo(0, 0);
    } 

    return (
        <div style={{
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'center'      
        }}>
        <ThemeProvider theme={darkTheme}>
            <Pagination
                count={numofPages}
                variant="outlined"
                onChange={(e) => handlePageChange(e.target.textContent)}
                    hideNextButton
                    hidePrevButton
                 />
        </ThemeProvider>
      </div>
    );
}

export default CustomPagination
