import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import Form from './Form/Form';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MemberList from './MemberList/MemberList';
import { CreateEngagment, UserSearch } from '../../api';
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const CreateEngagements = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate("/login")
        }
    }, [localStorage.getItem('token')])

    const [data, setData] = React.useState({
        name: '',
        report_date: '',
        invited_members: []
    });

    const [members, setMembers] = React.useState([])
    async function handleSubmit(e) {
        e.preventDefault();
        if (data.name != '' && data.report_date != '' && data.invited_members.length > 0){
            const response = await CreateEngagment(data);
            if (response.created) {
                navigate(`engagement/${response.id}/task-list`)
            }
        }
    }
    const addMember = () => {
        if (members.length > 0) {
            const exist = members.filter(member => member.id === user.id).length > 0
            if (exist) return;
            setMembers([...members, { id: user.id, name: user.username, alias: user.alias, role: user.role }])
        } else {
            setMembers([{ id: user.id, name: user.username, alias: user.alias, role: user.role }])
        }
        setData({ ...data, invited_members: [...data.invited_members, user.id] })
    }


    const [user, setUser] = React.useState({
        id: '',
        username: '',
        firstName: '',
        role: '',
        alias: ''
    })

    async function search(e) {
        const response = await UserSearch(e.target.value)
        const name = response.users[0][2]
        setUser({
            id: response.users[0][0],
            username: response.users[0][1],
            firstName: name,
            role: response.users[0][3] ? 'reviewer' : 'preparer',
            alias: name.toUpperCase().slice(0, 3)
        })
    }

    return (
        <Box sx={{ mx: 'auto', mt: { xs: 8, sm: 1 }, px: { xs: 1, sm: 2 }, pb: 5 }} maxWidth="xl">
            <Typography sx={{ fontWeight: 700, fontSize: 22, textAlign: { xs: 'center', sm: 'left' } }}>
                Create Engagement
            </Typography>

            <Box sx={{
                mt: { xs: 0.7, sm: 1.5 },
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
                width: { xs: '100%', sm: '90%', md: '70%' }, mx: 'auto',
            }}>
                <TextField
                    sx={{
                        '& .css-au3a9q-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': { color: '#2e2e38', },
                        '& .css-10i04qz-MuiInputBase-root-MuiFilledInput-root:after': { borderBottom: '2px solid #2e2e38' }, mr: { xs: 0, sm: 3, lg: 10 }
                    }} required={true}
                    fullWidth id="filled-basic" label="Engagement Name" variant="filled" />


                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Report Date"
                        value={data.report_date}
                        onChange={(newValue) => {
                            setData({ ...data, report_date: newValue });
                        }}
                        renderInput={(params) => <TextField
                            sx={{
                                width: { xs: '100%', sm: 400, lg: 600 }, mt: { xs: 1, sm: 0 },
                                '& .css-1kty9di-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': { color: '#2e2e38' },
                                '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2e2e38' }
                            }}
                            {...params} />}
                    />
                </LocalizationProvider>
            </Box>

            <Box sx={{ textAlign: 'left', my: { xs: 3, sm: 2 }, }}>
                <Button onClick={addMember} variant="contained" style={{ backgroundColor: '#2e2e38', display: 'inline-block' }}>
                    Add Internal Member
                </Button>
            </Box>




            <Grid container spacing={0} sx={{ mt: 2, px: { xs: 0, sm: 4, md: 8 }, }}>
                <Grid item xs={12} md={4} >
                    <Form
                        user={user}
                        search={search}
                        handleSubmit={handleSubmit}
                    />
                </Grid>

                <Grid item xs={12} md={8} sx={{ pl: { md: 5 }, mt: { xs: 4, md: 0 } }}>
                    <MemberList members={members} />
                </Grid>
            </Grid>









        </Box>
    );
};

export default CreateEngagements;