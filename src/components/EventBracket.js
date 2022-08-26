import { FormattedMessage } from 'react-intl';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Bracket, Seed, SeedItem, SeedTeam, SeedTime } from 'react-brackets';

const useStyles_typo = makeStyles((theme) => ({
    root: {
        color: 'white',
        backgroundColor: "#212121",
        marginBottom: theme.spacing(2),
        borderRadius: 10
    },
    title: {
        marginTop: "30px",
        marginBottom: "30px",
    },
}));

const rounds = [
    {
    title: 'Round 1',
        seeds: [
            {
                id: 1,
                date: new Date(2021, 8, 20).toDateString(),
                teams: [
                    { id: 1, name: 'P1', score1: 6 , score2: 6 , score3: null },
                    { id: 2, name: 'P2', score1: 4 , score2: 7 , score3: 5 },
                ],
            },

            {
                id: 2,
                date: new Date(2021, 8, 20).toDateString(),
                teams: [
                    { id: 3, name: 'P3', score1: 2 , score2: 3 , score3: '-' },
                    { id: 4, name: 'P4', score1: 6 , score2: 6 , score3: '-' },
                ],
            },

            {
                id: 3,
                date: new Date(2021, 8, 21).toDateString(),
                teams: [
                    { id: 5, name: 'P5', score1: 6 , score2: 7 , score3: '-' },
                    { id: 6, name: 'P6', score1: 3 , score2: 6 , score3: '-' },
                ],
            },

            {
                id: 4,
                date: new Date(2021, 8, 21).toDateString(),
                teams: [
                    { id: 7, name: 'P7'},
                    {},
                ],
            },
        ],
    },
    {
    title: 'Round 2',
        seeds: [
            {
                id: 5,
                date: new Date(2021, 8, 23).toDateString(),
                teams: [
                { id: 1, name: 'P1', score1: 2 , score2: 3 , score3: '-' },
                { id: 4, name: 'P4', score1: 6 , score2: '✅' , score3: '-' },
                ],
            },
            {
                id: 6,
                date: new Date(2021, 8, 24).toDateString(),
                teams: [
                { id: 5, name: 'P5'},
                { id: 7, name: 'P7'},
                ],
            },
        ],
    },
    {
    title: 'Round 3',
        seeds: [
            {
                id: 1,
                date: new Date(2021, 8, 25).toDateString(),
                teams: [
                { id: 4, name: 'P4'},
                {},
                ],
            },
        ],
    },
];

const RenderSeed = ({ breakpoint, seed }) => {
    return (
    <Seed mobileBreakpoint={breakpoint}>
        <SeedItem style={{ width: '100%'}}>
        <div>
            <SeedTeam style={{ color: 'red' }}>{seed.teams?.[0].score1}{' '}{seed.teams?.[0].score2}{' '}{seed.teams?.[0].score3}{seed.teams?.[0].score1?' | ':' '}{seed.teams?.[0].name || '-----------'}</SeedTeam>        
            <div style={{ height: 1, backgroundColor: '#707070' }}></div>
            <SeedTeam>{seed.teams?.[1]?.score1}{' '}{seed.teams?.[1]?.score2}{' '}{seed.teams?.[1]?.score3}{seed.teams?.[1]?.score1?' | ':' '}{seed.teams?.[1]?.name || '-----------'}</SeedTeam>
        </div>
        </SeedItem>
        <SeedTime mobileBreakpoint={breakpoint} style={{ fontSize: 9 }}>
        {seed.date}
        </SeedTime>
    </Seed>
    );
};

const SingleElimination = () => {
    return (
    <Bracket
        mobileBreakpoint={767}
        rounds={rounds}
        renderSeedComponent={RenderSeed}
        swipeableProps={{ enableMouseEvents: true, animateHeight: true }}
    />
    );
};

const EventBracket = ({ score }) => {

    const classes_typo = useStyles_typo();

    return(
    <div>
    <Typography variant="h4" className={classes_typo.title}> <FormattedMessage id="eventPage.tournament" /> </Typography>
    <hr />
    <SingleElimination />
    </div>
    );

}

export default EventBracket;
