import { useMutation, useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
const { UPLOAD_FILE, Host_DrawSchedule_QUERY } = require('../graphql');

const useStyles = makeStyles({
    container: {
        marginTop: "20px",
        paddingBottom: "20px",
    },
    inputfield: {
        marginBottom: "5px",
    },
    submitBut: {
        float: "right",

    },
    title: {
        marginTop: "20px",
    }
});

function EventSchedule(props) {
    const classes = useStyles();
    const [drawFile, setDrawFile] = useState(null);
    const [scheduleFile, setScheduleFile] = useState(null);
    const [drawFileURL, setDrawFileURL] = useState("");
    const [scheduleFileURL, setScheduleFileURL] = useState("");
    const [drawFileName, setDrawFileName] = useState("");
    const [scheduleFileName, setScheduleFileName] = useState("");
    const [disableBut, setDisableBut] = useState(false);

    const { loading, error, data, refetch } = useQuery(Host_DrawSchedule_QUERY, { variables: { eventId: props.eventID } });
    if (error) console.log(error);

    const [uploadFile] = useMutation(UPLOAD_FILE);

    useEffect(() => {
        if (!loading) {
            if (data.getEvent.drawURL !== null) {
                setDrawFileURL(data.getEvent.drawURL);
                const index = data.getEvent.drawURL.lastIndexOf("/") + 1;
                const originalFileName = data.getEvent.drawURL.substring(index);
                setDrawFileName(originalFileName);
            }

            if (data.getEvent.scheduleURL !== null) {
                setScheduleFileURL(data.getEvent.scheduleURL);
                const index = data.getEvent.scheduleURL.lastIndexOf("/") + 1;
                const originalFileName = data.getEvent.scheduleURL.substring(index);
                setScheduleFileName(originalFileName);
            }

        }
    },
        [data,loading],
    );

    const handleSelectDraw = e => {
        const file = e.target.files.item(0); // 取得選中檔案們的一個檔案
        setDrawFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisableBut(true);
        var isSuccess = true;

        var data = [];
        if (drawFile !== null) {
            data[0] = {
                file: drawFile,
                eventId: props.eventID,
                originalFile: drawFileURL
            }
        }
        if (scheduleFile !== null) {
            data[1] = {
                file: scheduleFile,
                eventId: props.eventID,
                originalFile: scheduleFileURL
            }
        }

        try {
            await uploadFile({
                variables: {
                    data: data
                }
            })
        } catch (e) {
            console.log(e); // here you can see your network
            isSuccess = false;
        }

        if (isSuccess) {
            alert("編輯成功！");
            refetch();
        } else {
            alert("編輯失敗！請再試一次");
        }
        setDisableBut(false);
    }

    const handleSelectSchedule = e => {
        const file = e.target.files.item(0); // 取得選中檔案們的一個檔案
        setScheduleFile(file);
    };

    return (
        <Container className={classes.container}>
            <form>
                <Typography><FormattedMessage id="eventBasicInfo.drawUpload" /></Typography>
                <input type="file" onChange={handleSelectDraw} className={classes.inputfield} />
                <br />
                <a href={drawFileURL} target="_blank" rel="noreferrer">{drawFileName}</a>
                <Typography className={classes.title}><FormattedMessage id="eventBasicInfo.scheduleUpload" /></Typography>
                <input type="file" onChange={handleSelectSchedule} className={classes.inputfield} />

                <a href={scheduleFileURL} target="_blank" rel="noreferrer">{scheduleFileName}</a>

                {!disableBut ?
                    <Button className={classes.submitBut} variant="contained" color="default"
                        type="submit"
                        onClick={handleSubmit}
                        style={{ minWidth: "80px" }}
                    >
                        <FormattedMessage id="eventBasicInfo.save" />
                    </Button> :
                    <Button className={classes.submitBut} variant="contained" color="default" disabled style={{ minWidth: "80px" }}>
                        <FormattedMessage id="eventBasicInfo.save" />
                    </Button>}
            </form>
        </Container>
    );
}

export default EventSchedule;