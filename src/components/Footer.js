import React from "react";
import { useSelector } from "react-redux";
// import SimpleReactFooter from "simple-react-footer";
import SimpleReactFooter from './SimpleReactFooter';

function Footer() {
    const locale = useSelector(state => state.locale.locale)
    const description = locale === "en" ? "Sportify is a website designed for sports event registration, aggregation, and supports online payment service as well as event progress tracking. Simply create an account here (or even use your Google account to sign up), you can then enjoy all the convenience Sportify has to offer you. If you’re someone who longs to organize meaningful sport events for others, you can create events and manage them with just a few clicks. As for those who wish to know information about more sport events and participate in them, we are sure you can also find the very ideal ones here with easy registration processes. The origin of Sportify is a simple idea to have more sport events to join. Now, we implement the idea through sportify and we kindly invite you to join us. With your participating, sport events will be more fun. Click an event card and start your journey here!" : "Sportify 是個為整合體育賽事且精簡報名流程而設計的網站，並支援線上支付報名費功能以及賽事即時進度追蹤功能。只要建立帳戶即可享受Sportify為您提供的多項服務。輕鬆按下幾次按鍵並簡要輸入相關資訊，您就可以舉行體育賽事來其他使用者前來參賽，並且有效追蹤報名與賽程進度；而至於想尋找更多喜歡的體育賽事的使用者，我們保證在Sportify絕對有機會找到您的命定之選。Sportify 的建立初衷十分簡單：希望使用者可以有個管道知道更多體育賽事並樂意參與！現在，Sportify 團隊已實踐這個想法，並誠摯地邀請您前來體驗。有您的參與，體育賽事才會更加精采有趣。快按一下喜歡的體育賽事，自此開始您的旅程吧！";
    const title = "Sportify";
    const columns = [
        {
            title: locale === "en" ? "Resources" : "資源",
            resources: [
                {
                    name: locale === "en" ? "About" : '關於我們',
                    link: "/about"
                },
                {
                    name: locale === "en" ? "Contact" : '聯絡我們',
                    link: "/contact"
                },
                {
                    name: locale === "en" ? "API Service" : 'API服務說明',
                    link: "/api-service"
                },
            ]
        },
        {
            title: locale === "en" ? "Legal" : "法律相關",
            resources: [
                {
                    name: locale === "en" ? "Privacy" : "隱私權政策",
                    link: "/privacy"
                },
                {
                    name: locale === "en" ? "Terms" : "網站使用條款",
                    link: "/terms"
                }
            ]
        },
    ];
    return (
        <SimpleReactFooter
            description={description}
            title={title}
            columns={columns}
            linkedin="company/sportify-live"
            facebook="Sportify-100868202225059"
            twitter="Sportif07101805"
            instagram="sportify_live"
            youtube="UCmmovYVOJqR3T0qLz-0HipA"
            pinterest="fluffy_cats_collections"
            copyright="Sportify"
            iconColor="black"
            backgroundColor="#fffff"
            fontColor="black"
            copyrightColor="darkgrey"
        />
    )
};
export default Footer;