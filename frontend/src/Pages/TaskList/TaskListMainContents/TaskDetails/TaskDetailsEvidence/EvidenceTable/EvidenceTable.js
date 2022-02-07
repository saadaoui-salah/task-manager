import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import jpgIcon from '../../../../../../Images/icons/jpg.png';
import xlsIcon from '../../../../../../Images/icons/xls.png';
import pdfIcon from '../../../../../../Images/icons/pdf.png';
import docIcon from '../../../../../../Images/icons/doc.png';
import pngIcon from '../../../../../../Images/icons/png.png';
import { GetEvidenceByTask, ListContrebuters, UpdateContrebuter } from '../../../../../../api';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const signOffsSelectStyle = {
    '& .css-1aa5qj0-MuiInputBase-root-MuiInput-root': { fontSize: 13, width: 45, },
    '& .css-1g12qau-MuiSvgIcon-root-MuiNativeSelect-icon': {
        right: 0,
    },
    '& .MuiNativeSelect-select': { p: 0 },
    '& .css-19ygod6-MuiNativeSelect-select-MuiInputBase-input-MuiInput-input.css-19ygod6-MuiNativeSelect-select-MuiInputBase-input-MuiInput-input.css-19ygod6-MuiNativeSelect-select-MuiInputBase-input-MuiInput-input': { p: 0 }
}

const EvidenceTable = ({ id }) => {
    const [evidenceList, setEvidenceList] = React.useState([])
    useEffect(async () => {
        const response = await GetEvidenceByTask(id);
        console.log(response.data)
        setEvidenceList(response.data);
    }, [])
    const {id: evidenceID} = useParams()
    const [contrebuters, setContrebutersList] = useState()
    const [count, setCount] = useState()

    useEffect(async () => {
        try {
            const res = await ListContrebuters(evidenceID)
            setContrebutersList(res.data.contrebuters)
            setCount(res.data.count)
        } catch {
            setContrebutersList([])
        }
    }, [])
    return (
        <Box sx={{ width: { xs: 280, sm: 480, md: 'auto', xl: 'auto' }, overflow: 'auto', mx: 'auto', }}>
            <TableContainer component={Paper} sx={{ backgroundColor: '#f7f7f7' }}>
                <Table sx={{ minWidth: '100%' }} aria-label="simple table" >
                    <TableHead sx={{ backgroundColor: '#eeeeee' }}>
                        <TableRow>
                            <TableCell>
                                <Button variant="text" sx={{
                                    color: '#2e2e38', fontWeight: 550, fontSize: 16,
                                    textTransform: 'Capitalize',
                                }}>
                                    Name
                                    <ArrowUpwardIcon sx={{ ml: .6, fontSize: 19 }} />
                                </Button>
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 550, fontSize: 16 }}>Notes</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 550, fontSize: 16 }}>Sign-offs</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 550, fontSize: 16, }}>Attributes</TableCell>
                        </TableRow>
                    </TableHead>



                    <TableBody>
                        {evidenceList != [] ? evidenceList?.map((evidence) => {
                            return (
                                <TableRow
                                    key={evidence.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                                                <img src={
                                                    evidence.file.split(".")[1].toLowerCase() === "jpg"
                                                        ? jpgIcon
                                                        : evidence.file.split(".")[1].toLowerCase() === "xlsx"
                                                            ? xlsIcon
                                                            : evidence.file.split(".")[1].toLowerCase() === "pdf"
                                                                ? pdfIcon
                                                                : evidence.file.split(".")[1].toLowerCase() === "docx"
                                                                    ? docIcon
                                                                    : evidence.file.split(".")[1].toLowerCase() === "png"
                                                                    && pngIcon

                                                } alt="" style={{ width: '23px' }} />

                                                <Typography sx={{ ml: 1 }}>
                                                    {evidence.file.split('/')[1]}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <MoreHorizIcon sx={{ cursor: 'pointer', }} />
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <AddCircleOutlineIcon sx={{ fontSize: 30, cursor: 'pointer', }} />
                                    </TableCell>
                                    <TableCell align="center"
                                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                            <Box sx={{ backgroundColor: '#189d3e', p: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 25, height: 20, color: 'white', fontWeight: 600, mr: 0.5 }}>
                                                P
                                            </Box>
                                            <FormControl fullWidth
                                                sx={signOffsSelectStyle}>
                                                <NativeSelect
                                                    disableUnderline
                                                    defaultValue={evidence.preparer__username}
                                                    inputProps={{
                                                        name: 'sign-offs',
                                                        id: 'uncontrolled-native',
                                                    }}>
                                                        {contrebuters != [] ? contrebuters?.map((contrebuter) => (
                                                            <option  value={contrebuter.id}>{contrebuter?.preparer__username?.slice(0, 3)}</option>
                                                        )) 
                                                        : ''}
                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                            <Box sx={{ backgroundColor: '#eb4f00', p: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 25, height: 20, color: 'white', fontWeight: 600, mr: 0.5 }}>
                                                R
                                            </Box>
                                            <FormControl fullWidth
                                                sx={signOffsSelectStyle}>
                                                <NativeSelect
                                                    
                                                    disableUnderline
                                                    defaultValue={evidence.reviewer__username}
                                                    inputProps={{
                                                        name: 'sign-offs',
                                                        id: 'uncontrolled-native',
                                                    }}>
                                                    <option id={`r-${evidence.id}`} value={10}>{evidence?.reviewer__username?.slice(0, 3)}</option>
                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{
                                            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
                                        }}>
                                            <AssignmentTurnedInIcon />
                                            <div >
                                                {count}
                                            </div>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )
                        }) : ''}
                    </TableBody>

                </Table>
            </TableContainer>
        </Box >
    );
};

export default EvidenceTable;