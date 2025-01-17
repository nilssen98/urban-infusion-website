import {Chip, Fade, Stack, Typography, useTheme} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Section from '../../Wrappers/Section';
import {ReactElement, useState} from 'react';
import {useInView} from 'react-intersection-observer';
import BlackTea from '../../../assets/images/tea/black-tea.png';
import DarkTea from '../../../assets/images/tea/dark-tea.png';
import GreenTea from '../../../assets/images/tea/green-tea.png';
import WhiteTea from '../../../assets/images/tea/white-tea.png';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import UnstyledLink from '../../UnstyledLink';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function FeaturesSection() {
    const navigate = useNavigate();

    return (
        <>
            <Section label={'Products'}>
                <Stack alignItems={'center'} spacing={32}>
                    <Feature
                        navigation={'black tea'}
                        header={'Black tea'}
                        description={{
                            flavor: 'Comforting flavors of honey, stone fruits, or roasted almonds and much more',
                            benefits: 'The nutrients in black tea may reduce the risk of cancer, protect the heart against atherosclerosis, and help maintain a healthy blood pressure.',
                            fact: 'Black tea is the most consumed tea across the world; in the US, 86% of the tea enjoyed throughout 2017 was black tea.'
                        }}
                        image_url={BlackTea}
                    />
                    <Feature
                        navigation={'green tea'}
                        flipped
                        header={'Green tea'}
                        description={{
                            flavor: 'A verdant flavor alternative with often hints of vegetal, marine, and freshly cut grass.',
                            benefits: 'Studies suggest that green tea may have positive effects on weight loss, liver disorders, type 2 diabetes, Alzheimer’s disease, and more.',
                            fact: 'Ancient cultures used green tea as medicine to control bleeding, heal wounds, aid digestion, and to improve heart and mental health.'
                        }}
                        image_url={GreenTea}
                    />
                    <Feature
                        navigation={'white tea'}
                        header={'White tea'}
                        description={{
                            flavor: 'A mythical and elusive verity light and subtle in flavor with often floral sweet notes.',
                            benefits: 'White tea is proven to have many health benefits, such as: improving skin and hair health, reducing the risk of cancer, improving brain health, lowering the risk of heart disease, and improving oral health.',
                            fact: 'White tea is the least processed of all tea, most white tea are simply picked and withered. Therefore, white tea contains elevated levels of antioxidants that are present in fresh tea leaves.'
                        }}
                        image_url={WhiteTea}
                    />
                    <Feature
                        navigation={'dark tea'}
                        flipped
                        header={'Dark tea'}
                        description={{
                            flavor: 'This brew shows an amber color, with a little sticky feeling, mellow and smooth, and a unique sweetness. The marvelous taste will make you hooked and can’t stop drinking.',
                            benefits: 'Dark tea may have similar benefits to green tea. The nutrients in it may reduce the risk of several cancers, protect the heart, and help maintain healthy blood pressure.',
                            fact: 'Dark tea are closer to green tea in that they are processed like green tea initially. Then, they go through a bacterial fermentation process and are aged for many years to come.'
                        }}
                        image_url={DarkTea}
                    />
                </Stack>
            </Section>
        </>
    );
}

interface FeatureProps {
    flipped?: boolean;
    navigation?: string;
    header?: string;
    image_url?: string;
    onClick?: () => void;
    description: Record<string, string>;
}

function Feature(props: FeatureProps) {
    const [currentItem, setCurrentItem] = useState<string>(Object.keys(props.description)[0]);

    const [didAnimate, setDidAnimate] = useState<boolean>(false);

    const {ref, inView} = useInView();
    const theme = useTheme();

    const getIcon = (key: string): ReactElement => {
        switch (key) {
            case 'flavor':
                return <SpaOutlinedIcon/>;
            case 'benefits':
                return <SelfImprovementOutlinedIcon/>;
            case 'fact':
                return <FactCheckOutlinedIcon/>;
            default:
                return <></>;
        }
    };

    return (
        <>
            <Fade
                in={inView || didAnimate}
                addEndListener={() => setDidAnimate(true)}
                timeout={1500}
            >
                <Stack
                    direction={{md: props.flipped ? 'row-reverse' : 'row', xs: 'column'}}
                    alignItems={'center'}
                    width={'100%'}
                    ref={ref}
                    spacing={4}
                    minHeight={250}
                >
                    <Stack width={'100%'} height={'100%'}  flex={1} alignItems={'center'} justifyContent={'center'}>
                        <img src={props.image_url} alt={''} style={{width: 300, height: 'auto'}}/>
                    </Stack>
                    <Stack height={'100%'} width={'100%'} flex={1} spacing={6} alignItems={{md: 'flex-start', xs: 'center'}}>
                        <Typography
                            variant={'h4'}
                            sx={{textAlign: {xs: 'center', md: 'left'}}}
                        >
                            {props.header}
                        </Typography>
                        <Stack direction={'row'} spacing={2}>
                            {
                                Object.keys(props.description).map((key, i) => (
                                    <Chip
                                        color={'primary'}
                                        key={i}
                                        label={key}
                                        variant={currentItem === key ? 'filled' : 'outlined'}
                                        onClick={() => setCurrentItem(key)}
                                        sx={{
                                            alignSelf: {md: 'start', xs: 'center'},
                                            textTransform: 'capitalize',
                                        }}
                                        icon={getIcon(key)}
                                    />
                                ))
                            }
                        </Stack>
                        <Stack flex={1} justifyContent={'center'}>
                            {
                                Object.entries(props.description).map(([key, value]) => (
                                    <Fade key={key} in={key === currentItem} timeout={500}>
                                        <Typography
                                            sx={{
                                                display: key === currentItem ? 'block' : 'none',
                                                whiteSpace: 'pre-line',
                                                textAlign: {xs: 'center', md: 'left'}
                                            }}
                                        >
                                            {value}
                                        </Typography>
                                    </Fade>
                                ))
                            }
                        </Stack>
                        <UnstyledLink to={`/products/all`}>
                            <Stack
                                alignSelf={'flex-start'}
                                direction={'row'}
                                spacing={1}
                                color={theme.palette.primary.main}
                            >
                                <Typography>
                                    Get now
                                </Typography>
                                <ArrowRightAltIcon/>
                            </Stack>
                        </UnstyledLink>
                    </Stack>
                </Stack>
            </Fade>
        </>
    );
}
