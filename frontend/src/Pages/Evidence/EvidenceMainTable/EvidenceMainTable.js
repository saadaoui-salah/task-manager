import React from 'react';
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
import {Contrebuters, ContrebutersCounter} from "../../../Shared/Contrevuters/Contrebutres"
import jpgIcon from '../../../Images/icons/jpg.png';
import xlsIcon from '../../../Images/icons/xls.png';
import pdfIcon from '../../../Images/icons/pdf.png';
import docIcon from '../../../Images/icons/doc.png';
import pngIcon from '../../../Images/icons/png.png';




const EvidenceMainTable = ({ data }) => {


    return (
        <Box sx={{
            width: { xs: 280, sm: 'auto', },
            overflow: 'auto', mx: 'auto', px: { xs: 0, sm: 2 }
        }} maxWidth="xl">
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
                        {data != [] ? data?.map(evidence => {
                            const file = evidence.file
                            return (
                                <TableRow
                                    key={evidence.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                                                <img src={
                                                    file.split(".")[1].toLowerCase() === "jpg"
                                                        ? jpgIcon
                                                        : file.split(".")[1].toLowerCase() === "xlsx"
                                                            ? xlsIcon
                                                            : file.split(".")[1].toLowerCase() === "pdf"
                                                                ? pdfIcon
                                                                : file.split(".")[1].toLowerCase() === "docx"
                                                                    ? docIcon
                                                                    : file.split(".")[1].toLowerCase() === "png"
                                                                    && pngIcon

                                                } alt="" style={{ width: '23px' }} />

                                                <Typography sx={{ ml: 1 }}>
                                                    {file.split('/')[1]}
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
                                            <Contrebuters evidence={evidence} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <ContrebutersCounter />
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

export default EvidenceMainTable;