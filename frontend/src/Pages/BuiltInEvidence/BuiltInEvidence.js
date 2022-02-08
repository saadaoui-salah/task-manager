import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SideNavigation from './SideNavigation/SideNavigation';
import BuiltInEvidenceDetails from './BuiltInEvidenceDetails/BuiltInEvidenceDetails';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { CreateSection, ListSection } from '../../api';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const drawerWidth = 240;

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



const SectionForm = ({ open, handleClose, setSection, section, contentID }) => {
    const { id } = useParams()
    const handleSubmit = async (e) => {
        const res = await CreateSection({ title: e.target.value }, id)
        handleClose()
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
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
                            label="Name"
                            onChange={(e) => setSection({ id: contentID, name: e.target.value, content: [] })}
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

const BuiltInEvidence = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [activeSection, setActiveSection] = useState(0)
    const [activeEvidence, setActiveEvidence] = useState(0)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const container = window !== undefined ? () => window().document.body : undefined;


    const [section, setSection] = useState(undefined)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const { id } = useParams()
    useEffect(async () => {
        const res = await ListSection(id)
        setSection(res.data)
        setActiveSection(res.data[0])
    }, [])

    return (
        <Box sx={{ display: 'flex', mx: 'auto' }} maxWidth="xl">
            <AppBar
                position="fixed"
                sx={{
                    top: 56,
                    display: { xs: 'block', sm: 'none' },
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }, backgroundColor: '#2e2e38'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Bult In Evidence
                    </Typography>
                </Toolbar>
            </AppBar>



            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth, lg: 330, xl: 360 }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* For Mobile Devices*/}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#2e2e38', color: 'white', top: 56, px: 1.3, pb: 15 },
                    }}
                >
                    <SideNavigation
                        active={activeEvidence}
                        next={setActiveEvidence}
                        section={section}
                        setActiveSection={setActiveSection}
                    />
                </Drawer>
                {/* Fot Large Devices */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', pl: { sm: 1.3, lg: 3, xl: 4 }, pr: { sm: 1, lg: 1.5, xl: 2 }, pb: 5,
                            width: { sm: drawerWidth, lg: 330, xl: 360 },
                            backgroundColor: '#2e2e38', color: 'white', pt: 10
                        },
                    }}
                    open
                >
                    <SideNavigation
                        section={section}
                        active={activeEvidence}
                        next={setActiveEvidence}
                        setActiveSection={setActiveSection} />
                </Drawer>
            </Box>
            <SectionForm open={open} handleClose={handleClose} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1, p: 3, width: {
                        sm: `calc(100% - ${drawerWidth}px)`,
                        lg: `calc(100% - 330px)`,
                        xl: `calc(100% - 360px)`
                    }
                }}
            >
                <Button variant="contained"
                    onClick={handleOpen}
                    style={{ color: 'white', backgroundColor: '#2e2e38', borderRadius: 0 }}
                    sx={{ textTransform: 'Capitalize', px: 2, py: 1.5, fontSize: 16, fontWeight: 700, width: { xs: '100%', md: 'auto' }, mb: { xs: 1, md: 0 }, mr: { md: 3 } }}>
                    Add Section
                </Button>
                <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} />
                <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} />

                <BuiltInEvidenceDetails
                    active={activeEvidence}
                    next={setActiveEvidence}
                    section={activeSection}
                />

            </Box>
        </Box>
    );
}

BuiltInEvidence.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default BuiltInEvidence;