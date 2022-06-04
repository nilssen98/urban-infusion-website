import Page from '../../components/Wrappers/Page';
import Section from '../../components/Wrappers/Section';
import {connect} from 'react-redux';
import React, {ReactElement, useEffect} from 'react';
import {RootState} from '../../state/store';
import {useNavigate} from 'react-router-dom';
import SectionCard, {SectionCardItem} from '../../components/Cards/SectionCard';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import {FormControlLabel, Radio, RadioGroup, Stack, TextField} from '@mui/material';
import useMe from '../../hooks/users/useMe';
import PaymentIcon from '@mui/icons-material/Payment';
import VippsLogo from '../../assets/images/vipps-logo.svg';

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.user.jwt !== undefined,
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {
    children?: ReactElement;
};

function Checkout(props: Props) {
    const navigate = useNavigate();

    const {isLoading: isLoadingMe, data: me} = useMe();

    const isLoading = isLoadingMe;

    useEffect(() => {
        if (!props.isAuthenticated) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <Page isLoading={isLoading}>
                {
                    !isLoading && (
                        <Section>
                            <Stack
                                spacing={4}
                                width={'100%'}
                                direction={{md: 'row', xs: 'column'}}
                            >
                                <Stack flex={1} spacing={4}>
                                    <SectionCard header={'Shipping address'} icon={<LocalShippingOutlinedIcon/>}>
                                        <SectionCardItem>
                                            <TextField
                                                label={'Phone number'}
                                                defaultValue={me!.phone_number}
                                            />
                                        </SectionCardItem>
                                        <SectionCardItem>
                                            <TextField
                                                label={'City'}
                                                defaultValue={me!.city}
                                            />
                                        </SectionCardItem>
                                        <SectionCardItem>
                                            <TextField
                                                label={'Zipcode'}
                                                defaultValue={me!.zipcode}
                                            />
                                        </SectionCardItem>
                                        <SectionCardItem>
                                            <TextField
                                                label={'Address'}
                                                defaultValue={me!.address}
                                            />
                                        </SectionCardItem>
                                    </SectionCard>
                                    <SectionCard header={'Payment'} icon={<PaymentIcon/>}>
                                        <RadioGroup defaultValue={'card'}>
                                            <SectionCardItem>
                                                <FormControlLabel
                                                    value={'card'}
                                                    control={<Radio/>}
                                                    label={'Card'}
                                                />
                                            </SectionCardItem>
                                            <SectionCardItem>
                                                <FormControlLabel
                                                    value={'vipps'}
                                                    control={<Radio/>}
                                                    label={
                                                        <Stack>
                                                            <img style={{height: 32}} src={VippsLogo} alt={''}/>
                                                        </Stack>
                                                    }
                                                />
                                            </SectionCardItem>
                                            <SectionCardItem>
                                                <FormControlLabel
                                                    value={'invoice'}
                                                    control={<Radio/>}
                                                    label={'Invoice 14 days'}
                                                />
                                            </SectionCardItem>
                                        </RadioGroup>
                                    </SectionCard>
                                </Stack>
                                <Stack flex={1}>
                                </Stack>
                            </Stack>
                        </Section>
                    )
                }
            </Page>
        </>
    );
}
