import { useMutation, useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import CompareDate from './CompareDate';
// import { Host_EventBasicInfo_QUERY, Edit_Event_MUTATION } from '../graphql';
const { Host_EventBasicInfo_QUERY, Edit_Event_MUTATION, UPLOAD_IMG } = require('../graphql');
const country_city_data = require('../static/country_city.json');
const Compress = require('compress.js').default;

const useStyles = makeStyles({
    container: {
        marginTop: "20px",
        paddingBottom: "20px",
    },
    inputfield: {
        marginBottom: "20px",
    },
    autoComplete: {
        marginTop: "5px",
        marginBottom: "20px",
    },
    submitBut: {
        float: "right",
    },
    releaseBut: {
        float: "right",
        marginRight: "10px",
    },
    dateText: {
        display: "inline",
    }
});

function EventBasicInfo(props) {
    const classes = useStyles();
    const [img, setImg] = useState(null);
    const [imgURL, setImgURL] = useState("");
    const [originalImgURL, setOriginalImgURL] = useState("");
    const [title, setTitle] = useState("");
    const [highlight, setHighlight] = useState("");
    const [date, setDate] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [location, setLocation] = useState("");
    const [region, setRegion] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [fee, setFee] = useState("");
    const [sportType, setSportType] = useState("");
    const [disableBut, setDisableBut] = useState(false);

    const { loading, error, data, refetch } = useQuery(Host_EventBasicInfo_QUERY, { variables: { eventId: props.eventID } });
    if (error) console.log(error.networkError.result.errors);

    useEffect(() => {
        if (!loading) {
            setTitle(data.getEvent.title);
            if (data.getEvent.highlight !== null)
                setHighlight(data.getEvent.highlight);
            if (data.getEvent.date !== null)
                setDate(data.getEvent.date);
            if (data.getEvent.dateEnd !== null)
                setDateEnd(data.getEvent.dateEnd);
            if (data.getEvent.location !== null)
                setLocation(data.getEvent.location);
            if (data.getEvent.region !== null)
                setRegion(data.getEvent.region);
            if (data.getEvent.country !== null)
                setCountry(data.getEvent.country);
            if (data.getEvent.city !== null)
                setCity(data.getEvent.city);
            if (data.getEvent.fee !== null)
                setFee(data.getEvent.fee);
            if (data.getEvent.sportType !== null)
                setSportType(data.getEvent.sportType);
            if (data.getEvent.imgURL !== null)
                setOriginalImgURL(data.getEvent.imgURL);
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data],
    );

    const [editEvent] = useMutation(Edit_Event_MUTATION);
    const [uploadImg] = useMutation(UPLOAD_IMG);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisableBut(true);

        var isSuccess = true;
        if (date === "") {
            try {
                await editEvent({
                    variables: {
                        _id: props.eventID,
                        title: title,
                        highlight: highlight,
                        location: location,
                        fee: Number(fee),
                        sportType: sportType,
                        region: region,
                        country: country,
                        city: city
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }
        } else if (dateEnd === "") {
            try {
                await editEvent({
                    variables: {
                        _id: props.eventID,
                        title: title,
                        highlight: highlight,
                        date: date,
                        location: location,
                        fee: Number(fee),
                        sportType: sportType,
                        region: region,
                        country: country,
                        city: city
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }
        } else {
            if (!CompareDate(date, dateEnd)) {
                alert("結束日期不得早於開始日期！");
                setDisableBut(true);
                return;
            }
            try {
                await editEvent({
                    variables: {
                        _id: props.eventID,
                        title: title,
                        highlight: highlight,
                        date: date,
                        dateEnd: dateEnd,
                        location: location,
                        fee: Number(fee),
                        sportType: sportType,
                        region: region,
                        country: country,
                        city: city
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }
        }

        try {
            await uploadImg({
                variables: {
                    file: img,
                    eventId: props.eventID,
                    originalFile: originalImgURL
                }
            })
        } catch (e) {
            console.log(e); // here you can see your network
            isSuccess = false;
        }

        if (isSuccess) {
            alert("編輯成功！");
            refetch();
            setImgURL("");
        } else {
            alert("編輯失敗！請再試一次");
        }
        setDisableBut(false);
    }

    const fileLoad = e => {
        setImgURL(e.target.result) // 讀取到DataURL後，儲存在result裡面，指定為img
    };

    const compress = new Compress();

    const handleSelectImg = e => {
        const file = e.target.files.item(0); // 取得選中檔案們的一個檔案
        compress.compress([file], {
            size: 1,
            quality: .75, // the quality of the image, max is 1,
            maxWidth: 300, // the max width of the output image, defaults to 1920px
            maxHeight: 300, // the max height of the output image, defaults to 1920px
            resize: true, // defaults to true, set false if you do not want to resize the image width and height
            rotate: false, // See the rotation section below
        }).then((data) => {
            // returns an array of compressed images
            const img = data[0];
            const base64str = img.data
            const imgExt = img.ext
            const file = Compress.convertBase64ToFile(base64str, imgExt)
            const fileReader = new FileReader(); // FileReader為瀏覽器內建類別，用途為讀取瀏覽器選中的檔案
            fileReader.addEventListener("load", fileLoad);
            fileReader.readAsDataURL(file); // 讀取完檔案後，變成URL
            setImg(file);
        })
    };

    const handleCountry = (e, v, r) => {
        if (r !== 'clear')
            setCountry(v);
        else
            setCountry("");
        setCity("");
    }

    const countries = Object.keys(country_city_data);
    var cities = country === "" ? [] : country_city_data[country];

    return (
        <Container className={classes.container}>
            <form>
                <Typography><FormattedMessage id="eventBasicInfo.name" /></Typography>
                <TextField fullWidth className={classes.inputfield} label="Name"
                    value={title}
                    onInput={e => setTitle(e.target.value)} />
                <Typography><FormattedMessage id="eventBasicInfo.pic" /></Typography>
                <img width="360px" src={originalImgURL} alt="" />
                <Typography><FormattedMessage id="eventBasicInfo.uploadPic" /></Typography>
                <input type="file" onChange={handleSelectImg} className={classes.inputfield} />
                <img width="360px" src={imgURL} alt="" />
                <Typography><FormattedMessage id="eventBasicInfo.highlight" /></Typography>
                <TextField fullWidth className={classes.inputfield} label="Highlight"
                    value={highlight}
                    onInput={e => setHighlight(e.target.value)} />
                <Typography><FormattedMessage id="eventBasicInfo.date" /></Typography>
                <TextField
                    type="date"
                    className={classes.inputfield}
                    value={date.slice(0, 10)}
                    onInput={e => setDate(e.target.value)}
                />
                <Typography className={classes.dateText}> ~ </Typography>
                <TextField
                    type="date"
                    className={classes.inputfield}
                    value={dateEnd.slice(0, 10)}
                    onInput={e => setDateEnd(e.target.value)}
                />
                <Typography><FormattedMessage id="eventBasicInfo.location" /></Typography>
                <TextField fullWidth className={classes.inputfield} label="Place"
                    value={location}
                    onInput={e => setLocation(e.target.value)} />
                <Typography><FormattedMessage id="eventBasicInfo.region" /></Typography>
                {/* <Select
                    value={region}
                    className={classes.inputfield}
                    onChange={e => setRegion(e.target.value)}
                >
                    <MenuItem value="北部"><FormattedMessage id="eventBasicInfo.north" /></MenuItem>
                    <MenuItem value="中部"><FormattedMessage id="eventBasicInfo.middle" /></MenuItem>
                    <MenuItem value="南部"><FormattedMessage id="eventBasicInfo.south" /></MenuItem>
                </Select> */}
                <Autocomplete
                    id="counrty"
                    className={classes.autoComplete}
                    value={country}
                    onChange={handleCountry}
                    options={countries}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
                />
                <Autocomplete
                    id="city"
                    className={classes.autoComplete}
                    value={city}
                    onChange={(e, v) => setCity(v)}
                    options={cities}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                />
                <Typography ><FormattedMessage id="eventBasicInfo.sportType" /></Typography>
                <Select
                    value={sportType}
                    className={classes.inputfield}
                    onChange={e => setSportType(e.target.value)}
                    style={{ minWidth: '100px' }}
                >
                    <MenuItem value="tennis"><FormattedMessage id="tennis" /></MenuItem>
                    <MenuItem value="basketball"><FormattedMessage id="basketball" /></MenuItem>
                    <MenuItem value="baseball"><FormattedMessage id="baseball" /></MenuItem>
                    <MenuItem value="table-tennis"><FormattedMessage id="table-tennis" /></MenuItem>
                    <MenuItem value="badminton"><FormattedMessage id="badminton" /></MenuItem>
                    <MenuItem value="soccer"><FormattedMessage id="soccer" /></MenuItem>
                    <MenuItem value="handball"><FormattedMessage id="handball" /></MenuItem>
                </Select>
                <Typography ><FormattedMessage id="eventBasicInfo.fee" /></Typography>
                <TextField className={classes.inputfield} label="Registery Fee"
                    value={fee}
                    onInput={e => setFee(e.target.value)} />

                {!disableBut ?
                    <Button className={classes.submitBut} variant="contained" color="default"
                        type="submit"
                        onClick={handleSubmit}
                        style={{ minWidth: '80px' }}
                    >
                        <FormattedMessage id="eventBasicInfo.save" />
                    </Button> :
                    <Button className={classes.submitBut} variant="contained" color="default" disabled style={{ minWidth: '70px' }}>
                        <FormattedMessage id="eventBasicInfo.save" />
                    </Button>}
            </form>
        </Container>
    );
}

export default EventBasicInfo;