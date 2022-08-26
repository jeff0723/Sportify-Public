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

function AboutPage() {
    const locale = useSelector(state => state.locale.locale)
    const classes = useStyles();
    const about = locale === "en" ? "Sportify is a website designed for sports event registration, aggregation, and supports online payment service as well as event progress tracking. The origin of Sportify is a simple idea to have more sport events to join. Now, we implement the idea through sportify and we kindly invite you to join us. With your participating, sport events will be more fun. Click a event card and start your journey here!" : "Sportify 是個為整合體育賽事且精簡報名流程而設計的網站，並支援線上支付報名費功能以及賽事即時進度追蹤功能。Sportify 的建立初衷十分簡單：希望使用者可以有個管道知道更多體育賽事並樂意參與！現在，Sportify 團隊已實踐這個想法，並誠摯地邀請您前來體驗。有您的參與，體育賽事才會更加精采有趣。快按一下喜歡的體育賽事，自此開始您的旅程吧！"
    const getStarted = locale === "en" ? "First, please create an account on Sportify. You can sign up by typing in the username, email, and password, or simply use Google account to sign up. Once logging in, Sportify will redirect you to your own MANAGE EVENTS page. You can create sport events by simply clicking the button right above. If you can not wait to join events crated by others, click SPORTIFY on top left to the Homepage. Browse through the event grids or use the filters to find the sport event(s) you wish to join, click on More Information, after entering the very event's page, click Register on the left and begin your registration process!" : "首先，請在 Sportify 上建立一個帳戶。 可以通過輸入使用者名稱、電子郵件和密碼進行註冊，也可以使用Google帳戶直接註冊。登入成功後，Sportify 會將您重新導至專屬的管理活動頁面，只須按一下右上方的「Create Events」按鈕即可輕鬆建立體育賽事。如果您已等不及想要參加其他人建立的體育賽事，請按一下左上角的 SPORTIFY 回到首頁。瀏覽賽事表格或使用篩選器找到您想參加的體育賽事，按一下「更多資訊」，進入賽事頁面後，按一下左側的「線上報名」並開始您的報名作業吧！"
    const bilingual = locale === "en" ? "Sportify has both en-us and zh-tw version of UI, making it easier for foreigners to visit the website and enjoy sport events. Simply click the language options top right in the Navigation Bar to switch between Traditional Chinese UI and English UI." : "Sportify 有英文（美國）和中文（繁體）兩種版本的使用者介面，讓外國人也能輕鬆讀取網站內容並參與體育賽事。只需按一下導覽列右上角的語言選項，即可在繁體中文和英文使用者介面之間進行切換。"
    const cashflow_p1 = locale === "en" ? "When registering on sport events, you may recognize that for the registration fee, we have a button for online payment via credit cards. This is a cash flow service for users to speed up their registration processes and to enjoy more convenience since they won't have to go out seeking for ATMs or banks. We implement Ecpay API to realize this service. For more information about this API service, please refer to their " : "在報名體育賽事時，您可能會注意到我們有一個「前往付款」的按鈕供您線上支付報名費。我們提供這項金流服務讓使用者可以加快報名過程並感受更多便利性，不必出門尋找 ATM 或銀行支付款項。 Sporitfy 是以綠界全方位金流介接來實現這項服務。有關此服務的更多資訊，請參閱其"

    return (
        <>
            <Navbar />
            <Container maxWidth="md" className={classes.container}>
                <div className={classes.appBarSpacer} />
                <Typography gutterBottom variant="h5">
                    <FormattedMessage id="aboutPage.title" />
                </Typography>
                <Typography>
                    {about}
                </Typography>
                <Typography className={classes.root} gutterBottom variant="h5">
                    <FormattedMessage id="aboutPage.start" />
                </Typography>
                <Typography>
                    {getStarted}
                </Typography>
                <Typography className={classes.root} gutterBottom variant="h5">
                    <FormattedMessage id="aboutPage.bilingual" />
                </Typography>
                <Typography>
                    {bilingual}
                </Typography>
                <Typography className={classes.root} gutterBottom variant="h5">
                    <FormattedMessage id="aboutPage.cashflow" />
                </Typography>
                <Typography>
                    {cashflow_p1}
                    {locale === "en" ? <><a href='https://www.ecpay.com.tw/Business/payment_standard'>official service help</a>. If you encounter any issues during paying the registration fee online, feel free to <a href="http://www.sportify.live/contact">Contact Us</a>.</> : <><a href='https://www.ecpay.com.tw/Business/payment_standard'>官方服務說明</a>。如果您在網上支付報名費過程中遇到任何問題，也歡迎隨時<a href="http://www.sportify.live/contact">聯絡我們</a>。</>
                    }
                </Typography>
                <Typography className={classes.root} gutterBottom variant="h5">
                    <FormattedMessage id="aboutPage.troubleshooting" />
                </Typography>
                <Typography>
                    {locale === "en" ? <>If there are any issues you encounter during visiting or using services provided by Sportify, always feel free to<a href='http://www.sportify.live/contact'> Contact Us </a>for helps or more information. We will get back to you via email as soon as possible. Thank you so much for your support. All your comments and suggestions are sure to help Sportify grow better and better.</> : <>如果您在造訪網站或使用 Sportify 提供服務的期間遇到任何問題，歡迎隨時<a href='http://www.sportify.live/contact'>聯絡我們</a>以獲取幫助或了解更多資訊。我們會盡快以電子郵件回覆您的意見與問題。非常感謝您的支持。您的所有評論與建議都將幫助 Sportify 漸臻完美。</>}
                </Typography>
            </Container>
        </>
    )
}

export default AboutPage;