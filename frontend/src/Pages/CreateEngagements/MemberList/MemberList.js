import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';


const MemberList = ({members}) => {
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#eeeeee' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 550, fontSize: 16 }}>Member</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 550, fontSize: 16 }}>Alias</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 550, fontSize: 16 }}>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members?.map((member) => (
                        <TableRow
                            key={member.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box sx={{
                                    display: 'flex', justifyContent: 'start', alignItems: 'center'
                                }}>
                                    <Badge color="primary" sx={{
                                        '& .css-ejll1l-MuiBadge-badge': { backgroundColor: 'white', border: '2.5px solid #8a8886', height: 15, p: 0, minWidth: 15, top: 30, right: 4, }
                                    }} overlap="circular" badgeContent=" ">
                                        <Avatar sx={{ bgcolor: '#5c2e91' }} aria-label="recipe">
                                            {member.role === 'reviewer' ? 'R' : 'P'}
                                        </Avatar>
                                    </Badge>
                                    <Typography sx={{ fontSize: 16, fontWeight: 700, ml: 3 }}>
                                        {member.name}
                                        {console.log(member)}
                                    </Typography>
                                </Box>
                            </TableCell>

                            <TableCell align="center">{member.alias}</TableCell>
                            <TableCell align="center">{member.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MemberList;