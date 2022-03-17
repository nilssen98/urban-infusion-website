import {Avatar, Box, Card, CardContent, Grid, Typography} from '@mui/material';
import Section from '../../../components/Wrappers/Section';


interface TestimonialProps {
    image_url: string;
    name: string;
    comment: string;
}

export default function TestimonialSection() {
    return (
        <>
            <Section>
                <Box
                sx={theme => ({
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    [theme.breakpoints.down('md')]: {
                        flexDirection: 'column',
                        alignItems: 'center'
                    }
                })}
                >

                    <Testimonial image_url={'https://i.imgur.com/uMzbKya.jpg'} name={'John Cliff'} comment={'Tea is the necessary component for my busy days at the office. It helps me focus. Urban' +
                        ' Infusion have the best Sencha tea – my favorite.'}/>
                    <Testimonial image_url={'https://i.imgur.com/Y4nQhCY.jpg'} name={'Purple Floyd'} comment={'I love the great selection Urban Infusion have! I try a new tea every day and I still have' +
                        'many teas to try out! Recommend!'}/>
                        <Testimonial image_url={'https://i.imgur.com/nHPps1g.jpg'} name={'James Jagger'} comment={'Man, their teas are dope! P.S. You can also smoke them, just don\'t tell anyone I told you' +
                        ' that '}/>

                </Box>
            </Section>
        </>
    );
}

//
function Testimonial(props: TestimonialProps) {
    return (
        <>

            <Card
                sx={theme => ({
                    width: '30%',
                    margin: 4,
                    [theme.breakpoints.down('md')]: {
                        width: '50%',
                        margin: 16
                    }
                })}
           >
                <CardContent
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',


                    }}>


                        <Avatar
                            src={props.image_url}
                            sx={{
                                width: 72,
                                height: 72
                            }}
                        />
                    <Typography
                        variant={'h5'}
                        component={'h5'}
                        textAlign={'center'}
                        py={2}
                    >
                        {props.name}
                    </Typography>
                    <Typography textAlign={'center'}
                    sx={{
                        fontStyle: 'italic',
                    }}>
                        <q>{props.comment}</q>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}
