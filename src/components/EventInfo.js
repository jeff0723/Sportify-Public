import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import EventBasicInfo from './EventBasicInfo';
import EventSchedule from './EventSchedule';
import RichTextEditor from './RichTextEditor';

function EventInfo(props) {
    const [currentTab, setCurrentTab] = useState(1);
    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    }

    return (
        <>
            <Paper style={{paddingBottom:30}} square elevation={3}>
                <Tabs
                    value={currentTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    onChange={handleTabChange}
                >
                    <Tab label={<FormattedMessage id="eventInfo.basic" />} value={1} />
                    <Tab label={<FormattedMessage id="eventInfo.registraion" />} value={3} />
                    <Tab label={<FormattedMessage id="eventInfo.brief" />} value={2} />
                    <Tab label={<FormattedMessage id="eventInfo.traffic" />} value={4} />
                    <Tab label={<FormattedMessage id="eventInfo.prize" />} value={5} />
                    <Tab label={<FormattedMessage id="eventInfo.drawSchedule" />} value={6} />
                </Tabs>

                {currentTab === 1 ?
                    <EventBasicInfo eventID={props.eventID} /> :
                    (currentTab === 6 ?
                        <EventSchedule eventID={props.eventID} />
                        : <RichTextEditor tab={currentTab} eventID={props.eventID} />)
                }
            </Paper>
        </>
    );
}

export default EventInfo;