import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';

const stepperStyle = {
    '& .css-8t49rw-MuiStepConnector-line': { display: 'none' },
    '& .css-14yr603-MuiStepContent-root': { borderLeft: 0 },
    '& .css-vnkopk-MuiStepLabel-iconContainer': { display: 'none' },
}


const BuiltInEvidenceDetails = ({ mainStepValue, stepValue, getDetailsOnClickStepValue }) => {
    const [evidenceDetailsData, setEvidenceDetailsData] = useState(null)

    useEffect(() => {
        fetch('./builtInEvidenceDetailsData.json')
            .then(res => res.json())
            .then(data => setEvidenceDetailsData(data))
    }, [])

    // For Accordion expand------------
    const handleChange = (panel) => (event, newExpanded) => {
        getDetailsOnClickStepValue(panel)
    };

    // For Delete Menu------
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box sx={{ maxWidth: '100%' }}>
            <Stepper activeStep={mainStepValue} orientation="vertical" sx={stepperStyle}>

                {!evidenceDetailsData
                    ? <Box sx={{ display: 'flex', mx: 'auto', mt: 3 }}>
                        <CircularProgress />
                    </Box>
                    : evidenceDetailsData.map(detailsData =>
                        <Step key={detailsData.id}>
                            <StepLabel>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ color: '#2e2e38', fontSize: 22, fontWeight: 550 }}>
                                        {detailsData.title}
                                    </Typography>
                                    <IconButton aria-label="add an alarm">
                                        <AddCircleIcon sx={{ fontSize: 28, color: '#2e2e38' }} />
                                    </IconButton>
                                </Box>
                            </StepLabel>
                            <StepContent>




                                {detailsData.layers.map(layer =>
                                    <Accordion
                                        key={layer}
                                        expanded={stepValue === detailsData.layers.indexOf(layer)}
                                        onChange={handleChange(detailsData.layers.indexOf(layer))}
                                        sx={{
                                            backgroundColor: '#fafafc',
                                            '& .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root:hover:not(.Mui-disabled)': { cursor: 'text' },
                                        }}>
                                        <AccordionSummary
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Box sx={{
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'
                                            }}>

                                                {stepValue !== detailsData.layers.indexOf(layer)
                                                    ? < AddIcon
                                                        sx={{ fontSize: 25, mr: 1.5, fontWeight: 550 }} />
                                                    : < RemoveIcon
                                                        sx={{ fontSize: 25, mr: 1.5, fontWeight: 550 }} />
                                                }

                                                <Typography
                                                    sx={{ fontSize: 17, fontWeight: 550 }}>
                                                    {layer}</Typography>

                                                <Box
                                                    sx={{
                                                        p: 0, m: 0, textAlign: 'right',
                                                        flexGrow: 1,
                                                    }}>
                                                    <MoreHorizIcon
                                                        sx={{ cursor: 'pointer' }}
                                                        id="basic-button"
                                                        aria-controls={open ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClick} />

                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                        sx={{
                                                            '& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper': { boxShadow: '2px 3px 4px -1px #b4b4b4', }
                                                        }}
                                                    >
                                                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                                                    </Menu>
                                                </Box>
                                            </Box>
                                        </AccordionSummary>



                                        <AccordionDetails
                                            sx={{
                                                p: 1, pb: 4, pt: 15
                                            }}>
                                            <Box sx={{ position: 'relative' }}>

                                                <TextField
                                                    sx={{
                                                        border: '2px solid #c4c4cd', borderRadius: 1,
                                                        px: 1,
                                                        '& .css-68u1dt-MuiInputBase-root-MuiInput-root:after': { display: 'none' },
                                                        '& .css-68u1dt-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before': { display: 'none' },
                                                        '& .css-68u1dt-MuiInputBase-root-MuiInput-root:before': { display: 'none' },
                                                        backgroundColor: 'white'
                                                    }}
                                                    fullWidth
                                                    rows="13"
                                                    id="standard-multiline-static"
                                                    multiline
                                                    variant="standard"
                                                />

                                                <IconButton aria-label="add an alarm"
                                                    sx={{ fontWeight: 700, fontSize: 23, cursor: 'pointer', position: 'absolute', right: 0, top: 10 }}>
                                                    <EditIcon />
                                                </IconButton>


                                                <Box sx={{
                                                    backgroundColor: '#fafafc', position: 'absolute', bottom: 2, left: 2, p: 1, width: '100%', textAlign: 'left'
                                                }}>
                                                    <Typography sx={{
                                                        color: 'blue', cursor: 'pointer', display: 'inline-block'
                                                    }}>
                                                        Show more
                                                    </Typography>


                                                </Box>



                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                )}




                            </StepContent>
                        </Step>
                    )}
            </Stepper>
        </Box >
    );
};

export default BuiltInEvidenceDetails;