import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    appBarSpacer: theme.mixins.toolbar,
    root: {
        marginTop: theme.spacing(4),
    }
}));

function APIPage() {
    const locale = useSelector(state => state.locale.locale)
    const classes = useStyles();
    // const APIService = locale === "en" ? `Sportify provides developer API(application programming interface )services. Just enter the URL  http://www.sportify.live/api/events  to access all event information published on Sportify, including title, date, location, region, sports, event information, and event images. Also, You can filter events by sport type, using http://www.sportify.live/api/events?sportType={sportType}. If you need to contact our team for more information, please click` : `Sportify提供開發者應用程式介面(Application Programming Interface)的服務。只要輸入網址 http://www.sportify.live/api/events 即可存取所有在Sportify上刊登的比賽資訊，包括標題、日期、地點、地區、運動項目、賽事資訊、以及賽事圖片，也可以用運動項目來過濾得到的資訊(http://www.sportify.live/api/events?sportType={sportType})。有需要聯繫我們的團隊以取得更多資訊請點擊`

    return (
        <>
            <Navbar />


            <Container maxWidth="md" className={classes.container}>
                <div className={classes.appBarSpacer} />
                <Typography gutterBottom variant="h5">
                    <FormattedMessage id="apiPage.title" />
                </Typography>
                {/* <Typography>
                    {APIService} {locale == "en" ? <a href='http://www.sportify.live/contact'> Contact Us.</a> : <a href='http://www.sportify.live/contact'>聯繫我們。</a>}
                </Typography> */}
                <Typography>
                    {locale === "en" ?
                        <>
                            Sportify provides developer API (application programming interface) services as following: http://www.sportify.live/api/events
                            <br />
                            The URL returns all events listed on the Sportify website. The data is returned as an array of event objects, each may include the following properties:
                        <ul>
                                <li>title: the name of the event</li>
                                <li>date: the start date of the event</li>
                                <li>dateEnd: the end date of the event</li>
                                <li>location: the exact address of where the event will be held</li>
                                <li>region: the general area where the event will be. There are currently three categories: 北部, 中部 and 南部</li>
                                <li>sportType: the sport type of this event. There are currently seven categories: tennis, basketball, baseball, table tennis, badminton, soccer, and handball.</li>
                                <li>description: the marketing content for the event</li>
                                <li>imgURL: the link to the cover image of the event</li>
                            </ul>
                You can also specify the sport type you want to filter by adding a sportType query. For example, if you want to filter out the ones with sportType set to be “tennis”, go to http://www.sportify.live/api/events?sportType=tennis. Sportify currently has seven sport types to choose from, including tennis, basketball, baseball, table tennis, badminton, soccer, and handball.
                <br />
                If you encounter any issues upon accessing the event data with our API, feel free to <a href='http://www.sportify.live/contact'> Contact Us.</a>
                        </> :
                        <>
                            Sportify 提供 API 服務給開發人員加以利用。您可造訪http://www.sportify.live/api/events以取得 Sportify 網站上所有體育賽事資訊。這些資料會以 JSON 格式呈現，回傳物件的陣列；每個物件都將包含以下屬性：
                        <ul>
                                <li>title: 體育賽事名稱</li>
                                <li>date: 賽事的開始日期</li>
                                <li>dateEnd: 賽事的結束日期</li>
                                <li>location: 舉行賽事的確切地址與位置場所</li>
                                <li>region: 賽事於台灣的大致舉行區域，目前區分為北部、中部與南部，共3個區域</li>
                                <li>sportType: 賽事的體育類型，目前一共有七種：網球、籃球、棒球、桌球、羽球、足球以及手球</li>
                                <li>description: 賽事描述，通常為賽事的行銷宣傳文字</li>
                                <li>imgURL: 賽事封面照片存放位置網址</li>
                            </ul>
                            開發人員也可以指定 API 回傳的體育類型。例如，想要取得「網球」分類的賽事，請至http://www.sportify.live/api/events?sportType=tennis。目前 Sportify 提供七種體育類型，也就是網球、籃球、棒球、桌球、羽球、足球以及手球。
                <br />
                若您在使用 API 存取資料的過程中遇到任何問題，歡迎隨時<a href='http://www.sportify.live/contact'>聯繫我們。</a>
                        </>}
                </Typography>
            </Container>
        </>
    )
}

export default APIPage;