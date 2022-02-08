import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { ListContrebuters, UpdateContrebuter } from '../../api';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

const signOffsSelectStyle = {
    '& .css-1aa5qj0-MuiInputBase-root-MuiInput-root': { fontSize: 13, width: 45, },
    '& .css-1g12qau-MuiSvgIcon-root-MuiNativeSelect-icon': {
        right: 0,
    },
    '& .MuiNativeSelect-select': { p: 0 },
    '& .css-19ygod6-MuiNativeSelect-select-MuiInputBase-input-MuiInput-input.css-19ygod6-MuiNativeSelect-select-MuiInputBase-input-MuiInput-input.css-19ygod6-MuiNativeSelect-select-MuiInputBase-input-MuiInput-input': { p: 0 }
}


export const Contrebuters = ({ evidence }) => {
    const { id: engagementID } = useParams()
    const [contrebuters, setContrebutersList] = useState()
    const [type, setType] = useState()

    useEffect(async () => {
        if (evidence.file.split('.')[1] === 'json') {
            setType('b')
        } else {
            setType('u')
        }
        try {
            const res = await ListContrebuters(engagementID)
            setContrebutersList(res.data.contrebuters)
        } catch {
            setContrebutersList([])
        }
    }, [])

    const handleOnChange = async (e) => {
        const res = await UpdateContrebuter({ username: e.target.value, type: type }, e.target.id)
    }
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <Box sx={{ backgroundColor: '#189d3e', p: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 25, height: 20, color: 'white', fontWeight: 600, mr: 0.5 }}>
                    P
                </Box>
                <FormControl fullWidth
                    sx={signOffsSelectStyle}>
                    <NativeSelect
                        disableUnderline
                        onChange={handleOnChange}
                        defaultValue={evidence.preparer__username}
                        inputProps={{
                            name: 'sign-offs',
                            id: evidence.id,
                        }}>
                        {contrebuters != [] ? contrebuters?.map((contrebuter) => {
                            if (contrebuter.invited_members__is_staff)
                                return (
                                    <option
                                        id={evidence.id}
                                        value={`${contrebuter?.invited_members__username}`}
                                    >
                                        {contrebuter?.invited_members__username?.slice(0, 3)}
                                    </option>
                                )
                        }
                        )
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
                        id={evidence.id}
                        onChange={handleOnChange}
                        disableUnderline
                        defaultValue={evidence.reviewer__username}
                        inputProps={{
                            id: evidence.id,
                        }}>
                        {evidence.reviewer__username === null ? 
                                <option
                                value={evidence.reviewer__username}
                                >
                                    {evidence?.invited_members__username?.slice(0, 3)}
                                </option>
                        
                        : ''}
                        {contrebuters != [] ? contrebuters?.map((contrebuter) => {
                            if (!contrebuter.invited_members__is_staff) return (
                                <option
                                    id={evidence.id}
                                    value={contrebuter?.invited_members__username}
                                >
                                    {contrebuter?.invited_members__username?.slice(0, 3)}
                                </option>
                            )
                        }
                        )
                            : ''}
                    </NativeSelect>
                </FormControl>
            </Box>
        </>

    )
}

export const ContrebutersCounter = () => {
    const [count, setCount] = useState()
    const { id: engagementID } = useParams()

    useEffect(async () => {
        try {
            const res = await ListContrebuters(engagementID)
            setCount(res.data.count)
        } catch {
            setCount(0)
        }
    }, [])
    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
        }}>
            <AssignmentTurnedInIcon />
            <div >
                {count}
            </div>
        </Box>
    )
}