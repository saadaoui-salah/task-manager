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
import { CreateEvidence, EvidenceBySection } from '../../../api';
import { Modal, Fade, Backdrop, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 250, sm: 500, md: 600, lg: 700 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0,
};



const stepperStyle = {
    '& .css-8t49rw-MuiStepConnector-line': { display: 'none' },
    '& .css-14yr603-MuiStepContent-root': { borderLeft: 0 },
    '& .css-vnkopk-MuiStepLabel-iconContainer': { display: 'none' },
}

const AddEvidenceForm = ({ open, setOpen }) => {
    const [data, setData] = useState()
    const { id } = useParams()
    const handleSubmit = async () => {
        const res = await CreateEvidence(id, data)
    }
    console.log(open)
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 300,
            }}
            sx={{ p: 0 }}
        >
            <Fade in={open}>
                <Box sx={style} >
                    <Typography id="transition-modal-title" variant="h5" component="h2"
                        sx={{ textAlign: 'left', backgroundColor: '#2e2e38', color: 'white', p: 2 }}>
                        Add Section
                    </Typography>
                    <Box sx={{ mt: { xs: 0.5, sm: 2 }, p: 2, }}>
                        <TextField
                            sx={{
                                '& .css-au3a9q-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': { color: '#2e2e38', },
                                '& .css-10i04qz-MuiInputBase-root-MuiFilledInput-root:after': { borderBottom: '2px solid #2e2e38' }, mb: { xs: 6, md: 10 }
                            }}
                            fullWidth
                            id="standard-helperText"
                            label="Title"
                            onChange={e => setData({ ...data, title: e.target.value })}
                            variant="filled"
                        />
                        <TextField
                            sx={{
                                '& .css-au3a9q-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': { color: '#2e2e38', },
                                '& .css-10i04qz-MuiInputBase-root-MuiFilledInput-root:after': { borderBottom: '2px solid #2e2e38' }, mb: { xs: 6, md: 10 }
                            }}
                            id="standard-helperText"
                            label="content"
                            multiline
                            fullWidth
                            rows="6"
                            id="standard-multiline-static"
                            multiline
                            onChange={e => setData({ ...data, content: e.target.value })}
                            variant="filled"
                        />

                        <Divider sx={{ borderColor: '#2e2e38', mb: 3 }} />


                        <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                            <Button variant="contained"
                                onClick={handleSubmit}
                                style={{ color: 'white', backgroundColor: '#2e2e38', borderRadius: 0 }}
                                sx={{ textTransform: 'Capitalize', px: 2, py: 1.5, fontSize: 16, fontWeight: 700, width: { xs: '100%', md: 'auto' }, mb: { xs: 1, md: 0 }, mr: { md: 3 } }}>
                                Add Section

                            </Button>

                            <Button
                                onClick={() => setOpen(false)}
                                variant="outlined"
                                style={{ color: '#2e2e38', borderColor: '#2e2e38', borderRadius: 0 }}
                                sx={{ textTransform: 'Capitalize', px: 3, py: 1.5, fontSize: 16, fontWeight: 700, width: { xs: '100%', md: 'auto' } }}>
                                Cancle
                            </Button>
                        </Box>

                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}


const BuiltInEvidenceDetails = (props) => {
    const { section, next, active } = props
    const [evidences, setEvidences] = React.useState()
    // For Delete Menu------
    const [open_, setOpen] = useState()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [loading, setLoading] = useState(false)
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(async () => {
        if (section.id != undefined) {
            setLoading(true)
            const res = await EvidenceBySection(section.id)
            setEvidences(res.data)
            setLoading(false)
        }
    }, [section.id])
    return (
        <Box sx={{ maxWidth: '100%' }}>
            <AddEvidenceForm setOpen={setOpen} open={open_} />
            <Stepper orientation="vertical" sx={stepperStyle}>
                {
                    <Step key={section.id}>
                        <StepLabel >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography sx={{ color: '#2e2e38', fontSize: 22, fontWeight: 550 }}>
                                    {section.title}
                                </Typography>
                                <Button onClick={() => setOpen(true)}>
                                    <IconButton aria-label="add an alarm">
                                        <AddCircleIcon sx={{ fontSize: 28, color: '#2e2e38' }} />
                                    </IconButton>
                                </Button>
                            </Box>
                        </StepLabel>
                        <StepContent>
                            {loading ?
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <CircularProgress />
                                </Box>
                                : evidences?.map(evidence =>
                                    <Accordion
                                        key={evidence.id}
                                        onClick={() => next(evidences.indexOf(evidence))}
                                        expanded={active === evidences.indexOf(evidence)}
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

                                                {active === evidences.indexOf(evidence)
                                                    ? < RemoveIcon
                                                        sx={{ fontSize: 25, mr: 1.5, fontWeight: 550 }} />
                                                    : < AddIcon
                                                        sx={{ fontSize: 25, mr: 1.5, fontWeight: 550 }} />
                                                }

                                                <Typography
                                                    sx={{ fontSize: 17, fontWeight: 550 }}>
                                                    {evidence.title}</Typography>

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
                                                    value={evidence.content}
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
                }
            </Stepper>
        </Box >
    );
};

export default BuiltInEvidenceDetails;