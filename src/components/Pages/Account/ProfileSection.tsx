import {UserDto} from '../../../api/urbaninfusion/dto/user-dto';
import {Button, Stack, TextField} from '@mui/material';
import SectionCard, {SectionCardItem} from '../../SectionCard';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React, {useEffect, useState} from 'react';

interface Props {
    onUpdate: (data: UserDto) => void;
    user?: UserDto;
}

export default function ProfileSection(props: Props) {
    const [tempUser, setTempUser] = useState<UserDto>();

    useEffect(() => {
        if (props.user) {
            setTempUser({...props.user});
        }
    }, [props.user]);

    const updateTempData = (data: Partial<UserDto>) => {
        setTempUser({
            ...tempUser!,
            ...data
        });
    };

    return (
        <>
            <Stack spacing={4}>
                <SectionCard header={'Personal information'}>
                    <SectionCardItem>
                        <TextField
                            value={tempUser?.username || ''}
                            onChange={() => {
                            }}
                            label={'Username'}
                            disabled
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField label={'Password'}/>
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField
                            label={'Email'}
                            value={tempUser?.email || ''}
                            onChange={(event) => updateTempData({email: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem sx={{alignItems: 'start'}}>
                        <Button
                            startIcon={<SaveOutlinedIcon/>}
                            variant={'contained'}
                            onClick={() => props.onUpdate(tempUser!)}
                        >
                            Save changes
                        </Button>
                    </SectionCardItem>
                </SectionCard>
                <SectionCard header={'Contact information'}>
                    <SectionCardItem>
                        <TextField
                            label={'City'}
                            value={tempUser?.city || ''}
                            onChange={(event) => updateTempData({city: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField
                            label={'Zipcode'}
                            value={tempUser?.zipcode || ''}
                            onChange={(event) => updateTempData({zipcode: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField
                            label={'Address'}
                            value={tempUser?.address || ''}
                            onChange={(event) => updateTempData({address: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField
                            label={'Phone number'}
                            value={tempUser?.phone_number || ''}
                            onChange={(event) => updateTempData({phone_number: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem sx={{alignItems: 'start'}}>
                        <Button
                            startIcon={<SaveOutlinedIcon/>}
                            variant={'contained'}
                            onClick={() => props.onUpdate(tempUser!)}
                        >
                            Save changes
                        </Button>
                    </SectionCardItem>
                </SectionCard>
            </Stack>
        </>
    );
}
