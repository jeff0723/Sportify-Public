import { useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const { Host_QUERY } = require('../graphql');
var HtmlToReactParser = require('html-to-react').Parser;
var htmlToReactParser = new HtmlToReactParser();
const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white',
        backgroundColor: "#212121",
        marginBottom: theme.spacing(2),
        borderRadius: 20
    },
    title: {
        marginBottom: "10px",
    },
    scheduleTitle: {
        marginBottom: "10px",
        marginTop: "30px",
    }
}));

function EventDescription({ info, tab, eventID }) {
    const locale = useSelector(state => state.locale.locale)
    const classes = useStyles();

    const { loading, error, data } = useQuery(Host_QUERY, { variables: { host_id: info.host_id } });
    if (error) console.log(error);

    return (
        <>
            {tab === 1 ?
                <>
                    <Typography variant="h4" className={classes.title}>{info.title}</Typography>
                    { htmlToReactParser.parse(info.description)}
                </>
                :
                (tab === 0 ?
                    <>
                        <Typography variant="h4" className={classes.title}>{info.title}</Typography>
                        <Button className={classes.root}
                            variant='outlined' component={Link} to={"/event/" + eventID + "/register/"}  ><FormattedMessage id='register' /></Button>
                        <Typography paragraph>
                            {info.date == null ? (locale === "en" ? "Not Set" : "未設定") : (info.dateEnd == null ? (locale === "en" ? "Date: " : "日期： ") + info.date.slice(0, 10) :
                                (locale === "en" ? "Date: " : "日期： ") + info.date.slice(0, 10) + "~" + info.dateEnd.slice(0, 10))}<br />
                            {(locale === "en" ? "Location: " : "地點： ") + info.location}<br />
                            <FormattedMessage id='description' />：<br />
                        </Typography>
                        { htmlToReactParser.parse(info.registrationInfo)}
                    </>
                    :
                    (tab === 2 ?
                        <>
                            <Typography variant="h4" className={classes.title}><FormattedMessage id='eventInfo.traffic' /></Typography>
                            { htmlToReactParser.parse(info.trafficInfo)}
                        </>
                        :
                        (tab === 3 ?
                            <>
                                <Typography variant="h4" className={classes.title}><FormattedMessage id='eventInfo.prize' /></Typography>
                                { htmlToReactParser.parse(info.prize)}
                            </>
                            :
                            (tab === 7 ?
                                <>
                                    <Typography variant="h4" className={classes.title}><FormattedMessage id='draw' /></Typography>
                                    {info.drawURL ? <a href={info.drawURL} target="_blank"
                                    rel="noreferrer"><FormattedMessage id='draw-file' /></a> : <Typography><FormattedMessage id='unpublished' /></Typography>}
                                    <Typography variant="h4" className={classes.scheduleTitle}><FormattedMessage id='schedule' /></Typography>
                                    {info.scheduleURL ? <a href={info.scheduleURL} target="_blank"
                                    rel="noreferrer"><FormattedMessage id='schedule-file' /></a> : <Typography><FormattedMessage id='unpublished' /></Typography>}
                                </>
                                :
                                <>
                                    <Typography variant="h4" className={classes.title}><FormattedMessage id='eventPage.contect' /></Typography>

                                    {loading ?
                                        <Typography><FormattedMessage id="loading" /></Typography> :
                                        <Typography paragraph>
                                            {(locale === "en" ? "Organizer： " : "主辦單位: ") + (data !== undefined ? data.host.name : (locale === "en" ? "Unprovided" : "未提供"))}<br />
                                            {(locale === "en" ? "Phone Number： " : "聯絡電話: ") + (data !== undefined ? data.host.phone : (locale === "en" ? "Unprovided" : "未提供"))}<br />
                                            {(locale === "en" ? "Email Address： " : "聯絡信箱: ") + (data !== undefined ? data.host.email : (locale === "en" ? "Unprovided" : "未提供"))}<br />
                                            <FormattedMessage id='website/fanpage' />：
                                        {data !== undefined ?
                                                <a href={data.host.page} target="_blank" rel="noreferrer">{data.host.page}</a> :
                                                <FormattedMessage id='unprovided' />}<br />
                                        </Typography >
                                    }
                                </>))))}
        </>
    )
}

export default EventDescription;