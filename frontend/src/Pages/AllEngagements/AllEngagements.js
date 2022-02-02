import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DnsIcon from '@mui/icons-material/Dns';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import TablePagination from '@mui/material/TablePagination';
import Engagements from './Engagements/Engagements';

const tabStyle = {
    default_tab: {
        color: '#2e2e38',
        fontWeight: '400'
    },
    active_tab: {
        color: '#2e2e38',
        fontWeight: '600'
    }
};

const engagementsData = [
    { id: 1, type: 'IMPORT COMMERCIAL', date: '31.12.2021', },
    { id: 2, type: 'IMPORT EXPORT COMMERCIAL', date: '12.10.2021', },
]





const AllEngagements = () => {
    const [value, setValue] = React.useState(0);
    const [alignment, setAlignment] = React.useState('list');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };


    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    /* 
        useEffect(() => {
            fetch('https://task-manager-api-f.herokuapp.com/api/engagment/egagment-listing/<int:2>')
                .then(res => res.json())
                .then(data => console.log(data))
    
        }, []) */


    return (
        <Box sx={{ flexGrow: 1, mt: { xs: 7, sm: 0 }, mx: 'auto' }} maxWidth="xl" >

            <AppBar position="static"
                sx={{ backgroundColor: '#eeeeee', boxShadow: 0, py: { xs: 0, sm: 2 }, px: { xs: 1, sm: 5 }, }}>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', }}>
                    <Tabs
                        TabIndicatorProps={{ style: { background: '#2e2e38', } }}
                        sx={{ mb: { xs: 3, sm: 0 } }}
                        value={value} onChange={handleChange}
                        aria-label="disabled tabs example">
                        <Tab label="All Engagements"
                            sx={{ textTransform: 'capitalize' }}
                            style={tabStyle.active_tab} />
                    </Tabs>

                    <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: { xs: '100%', sm: 'auto' } }}>
                        <Button variant="outlined" startIcon={<AddCircleSharpIcon />}
                            sx={{
                                px: { xs: 0, sm: 2 }, py: 1.2, mr: { xs: 1, sm: 3 },
                                borderColor: '#2e2e38', color: '#2e2e38',
                            }}>
                            <Typography sx={{
                                display: { xs: 'none', sm: 'block', },
                                color: '#2e2e38', fontWeight: 600,
                            }}>
                                Add Engagement
                            </Typography>
                        </Button>

                        <ToggleButtonGroup
                            value={alignment}
                            exclusive
                            onChange={handleAlignment}
                            aria-label="text alignment"
                        >
                            <ToggleButton value="list" aria-label="list"
                                sx={{
                                    "&.Mui-selected": { backgroundColor: '#2e2e38', color: 'white' }
                                }}
                            >
                                <FormatListBulletedIcon />
                            </ToggleButton>
                            <ToggleButton value="module" aria-label="module"
                                sx={{
                                    "&.Mui-selected": { backgroundColor: '#2e2e38', color: 'white' }
                                }}>
                                <DnsIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Box>
            </AppBar>





            <AppBar position="static"
                sx={{ backgroundColor: '#eeeeee', boxShadow: 0, py: 1, px: { xs: 1, md: 5 }, }}>
                <Box
                    sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: { xs: 2, sm: 0 } }}>
                        <SearchIcon sx={{ color: '#2e2e38', mr: 1, my: 0.5 }} />
                        <TextField id="input-with-serach" label="Search something" variant="standard"
                            sx={{
                                '& .Mui-focused': { color: '#2e2e38', }, width: { xs: 200, sm: 250, lg: 300 }
                            }} />
                    </Box>
                    <Box>
                        <TablePagination
                            component="div"
                            count={200}
                            size="text"
                            page={page}
                            onPageChange={handleChangePage}
                            labelRowsPerPage="Show"
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                </Box>
            </AppBar>



            <Box sx={{ py: 5, mx: { xs: 1, sm: 5 }, display: 'flex', flexDirection: 'column' }}>
                {engagementsData.map(engagement => <Engagements
                    key={engagement.id}
                    engagement={engagement}
                />)
                }
            </Box>
        </Box>
    );
};


export default AllEngagements;