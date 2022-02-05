import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect } from "react";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {CreateTask, ListTaskGroups} from '../../../api';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 260, sm: 500, md: 800, lg: 950 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24, pt: { xs: 40, sm: 0 }
};

const stepperStyle = {
    '& .css-8t49rw-MuiStepConnector-line': { display: 'none' },
    '& .css-14yr603-MuiStepContent-root': { borderLeft: 0 },
    '& .css-vnkopk-MuiStepLabel-iconContainer': { display: 'none' },
}

export default function CreateTaskForm() {
    const [groupList, setGroupList] = React.useState([])

    useEffect( async ()=>{
        const response = await ListTaskGroups(102)
        setGroupList(response.data)
    },[])
    

    const [data, setData] = React.useState({
        prefix: '',
        title: '',
        task_group: '',
        description: '',
    })

    // for Modal-------------
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const [progress, setProgress] = React.useState(0);

    const handlePrefixOnChange = (e) => {
        setData({...data, prefix: e.target.value})
    }
    const handleTitleOnChange = (e) => {
        setData({...data, title: e.target.value})
    }
    const handleTaskGroupOnChange = (e) => {
        setData({...data, task_group: e.target.value})
    }
    const handleDescriptionOnChange = (e) => {
        setData({...data, description: e.target.value})
    }
    const handleSubmit = async (e) => {
        if (data.prefix != '' && data.title != '' && data.task_group != '' && data.description != ''){
            const response = await CreateTask(data)
            if (response.created){
                setData({
                    prefix: '',
                    title: '',
                    task_group: '',
                    description: '',
                })
            }
        }
    }
    return (
        <Box sx={{ maxWidth: '100%' }}>
            <Box sx={style} sx={{ overflow: 'autou', }}>
                <Typography id="transition-modal-title" variant="h5" component="h2"
                    sx={{ textAlign: 'left', backgroundColor: '#2e2e38', color: 'white', px: 2, py: 1 }}>
                    Add New Task
                </Typography>

                <Box sx={{ p: 2 }}>
                    <Typography id="transition-modal-description" sx={{ textAlign: 'left', }}
                    >
                        Enter Task Details
                    </Typography>

                    <LinearProgress variant="determinate" value={progress} />

                    <Typography id="transition-modal-description"

                        sx={{ mt: { xs: 0.5, sm: 2 }, textAlign: 'left' }}>
                        Enter Task Details in order procced.
                    </Typography>
                </Box>


                <Box sx={{ p: 2 }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                sx={{
                                    '& .css-au3a9q-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': { color: '#2e2e38', },
                                    '& .css-10i04qz-MuiInputBase-root-MuiFilledInput-root:after': { borderBottom: '2px solid #2e2e38' }, mb: { xs: 0.5, sm: 2 }
                                }}
                                onChange={handlePrefixOnChange}
                                fullWidth
                                value={data.prefix}
                                id="standard-helperText"
                                label="Prefix (Optional)"
                                variant="filled"
                            />
                        </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} >
                            <TextField
                                sx={{
                                    '& .css-au3a9q-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': { color: '#2e2e38', },
                                    '& .css-10i04qz-MuiInputBase-root-MuiFilledInput-root:after': { borderBottom: '2px solid #2e2e38' }, mb: { xs: 0.5, sm: 2 }
                                }}
                                onChange={handleTitleOnChange}
                                fullWidth
                                value={data.title}
                                id="standard-helperText"
                                label="Title"
                                variant="filled"
                            />
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} md={6}>
                            <FormControl
                                fullWidth
                                formcontrol="true"
                                variant="filled"
                                sx={{
                                    '& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after': { borderBottom: '2px solid white' },
                                    '& .css-11j0ok3-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': { color: '#2e2e38' }
                                }}>

                                <InputLabel sx={{
                                    color: '#2e2e38',

                                }} id="demo-simple-select-filled-label">Task Group</InputLabel>
                                <Select
                                    style={{ color: '#2e2e38' }}
                                    MenuProps={{
                                        style: { zIndex: 999999 },
                                    }}
                                    value={data.taskGroup}
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    onChange={handleTaskGroupOnChange}
                                >
                                    {groupList?.map(group => {
                                        return (
                                        <MenuItem value={group.id}>{group.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl >
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ p: { xs: 0.5, sm: 2 }, mt: { xs: 0.5, sm: 3 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography sx={{ fontWeight: 700, }}>
                            Customize Description
                        </Typography>
                        <Typography sx={{}}>
                            0 of 4000 Characters
                        </Typography>
                    </Box>
                    <Box sx={{ border: '6px solid #f2f2f2', borderRadius: 1 }}
                    >
                        <Box sx={{ display: 'flex', backgroundColor: '#f2f2f2', p: 1 }}>
                            <FormatBoldIcon sx={{
                                mx: { xs: 0, sm: 0.8 },
                                cursor: 'pointer'
                            }} />
                            <FormatItalicIcon sx={{
                                mx: { xs: 0, sm: 0.8 },
                                cursor: 'pointer'
                            }} />
                            <FormatUnderlinedIcon sx={{
                                mx: { xs: 0, sm: 0.8 },
                                cursor: 'pointer'
                            }} />
                        </Box>
                        <TextField
                            className="descriptionTextAria"
                            sx={{
                                border: '2px solid #c4c4cd', borderRadius: 1,
                                px: 1,
                                '& .css-68u1dt-MuiInputBase-root-MuiInput-root:after': { display: 'none' },
                                '& .css-68u1dt-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before': { display: 'none' },
                                '& .css-68u1dt-MuiInputBase-root-MuiInput-root:before': { display: 'none' },
                                backgroundColor: 'white'
                            }}
                            fullWidth
                            value={data.description}
                            onChange={handleDescriptionOnChange}
                            rows="8"
                            id="standard-multiline-static"
                            multiline
                            variant="standard"
                        />
                    </Box>
                    <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mt: 4 }}>
                        <Button variant="outlined"
                            style={{ color: '#2e2e38', borderColor: '#2e2e38', borderRadius: 0 }}
                            sx={{ textTransform: 'Capitalize', px: 3, py: 1.5, fontSize: 16, fontWeight: 700, width: { xs: '100%', md: 'auto' }, mb: { xs: 1, md: 0 }, mr: { md: 3 } }}>
                            Back
                        </Button>

                        <Button variant="outlined"
                            onClick={handleSubmit}
                            style={{ color: '#2e2e38', borderColor: '#2e2e38', borderRadius: 0 }}
                            sx={{ textTransform: 'Capitalize', px: 3, py: 1.5, fontSize: 16, fontWeight: 700, width: { xs: '100%', md: 'auto' } }}>
                            Save and Close
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box >

    )
}