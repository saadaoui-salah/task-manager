import React from "react";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CreateTaskGroup } from "../../../api";
import { useParams } from "react-router-dom";

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


export default function CreateTaskForm(){
    const { id } = useParams()
    const [data, setData] = React.useState({
        name: '',
        engagment: id,
    })

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOnChange = (e) => {
        setData({...data, name: e.target.value})
    }

    const handleSubmit = async () => {
        if (data.name != ''){
            const response = await CreateTaskGroup(data)
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={true}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 300,
            }}
            sx={{ p: 0 }}
        >
            <Fade in={true}>
                <Box sx={style} >
                    <Typography id="transition-modal-title" variant="h5" component="h2"
                        sx={{ textAlign: 'left', backgroundColor: '#2e2e38', color: 'white', p: 2 }}>
                        Add Task Group
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 1, p: 2 }}>
                        Add a new Task Group here. Once added, you can select this task group when creating new tasks
                    </Typography>

                    <Box sx={{ mt: { xs: 0.5, sm: 2 }, p: 2, }}>
                        <TextField
                            sx={{
                                '& .css-au3a9q-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': { color: '#2e2e38', },
                                '& .css-10i04qz-MuiInputBase-root-MuiFilledInput-root:after': { borderBottom: '2px solid #2e2e38' }, mb: { xs: 6, md: 10 }
                            }}
                            fullWidth
                            value={data.name}
                            onChange={handleOnChange}
                            id="standard-helperText"
                            label="Name"
                            variant="filled"
                        />

                        <Divider sx={{ borderColor: '#2e2e38', mb: 3 }} />


                        <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                            <Button variant="contained"
                                onClick={(e) => handleSubmit()}
                                style={{ color: 'white', backgroundColor: '#2e2e38', borderRadius: 0 }}
                                sx={{ textTransform: 'Capitalize', px: 2, py: 1.5, fontSize: 16, fontWeight: 700, width: { xs: '100%', md: 'auto' }, mb: { xs: 1, md: 0 }, mr: { md: 3 } }}>
                                Add Task Group
                            </Button>

                            <Button variant="outlined"
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