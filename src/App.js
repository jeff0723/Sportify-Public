import { React, Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';
import { useSelector } from "react-redux";
import { IntlProvider } from 'react-intl';

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import EventPage from "./pages/EventPage";
import APIPage from "./pages/APIPage";
import EventRegistration from "./pages/EventRegistration";
import EventManagement from "./pages/EventManagement";
import EventDashboard from "./pages/EventDashboard";
import OranizerInfo from "./pages/OrganizerInfo";
import ContactUs from './pages/ContactUs'
import LandingPage from './pages/LandingPage'
import { getLocaleMessages } from './i18n/locale-settings';
import FindEventPage from "./pages/FindEventPage";
import LoadingGif from './components/LoadingGif';

function App() {
  const locale = useSelector(state => state.locale.locale);
  const messages = getLocaleMessages(locale);

  return (
    <IntlProvider locale={locale} key={locale} messages={messages}>
      <Switch>
        <Suspense fallback={LoadingGif}>         
        <Route exact path="/"><LandingPage /></Route>
        <Route exact path="/find-event-page/:sportType" component={FindEventPage}></Route>
        <Route exact path="/home-page"><HomePage /></Route>
        <Route exact path="/about"><AboutPage /></Route>
        <Route exact path="/contact"><ContactUs /></Route>
        <Route exact path="/api-service"><APIPage /></Route>
        <Route exact path="/event/:eventID?" component={EventPage}></Route>
        <Route exact path="/event/:eventID?/register/" component={EventRegistration}></Route>
        <Route exact path="/auth"><AuthPage /></Route>
        <Route exact path="/manage/:hostID?/all" component={EventManagement}></Route>
        <Route exact path="/manage/:hostID?/organizerInfo" component={OranizerInfo}></Route>
        <Route exact path="/manage/:hostID?/:eventID?" component={EventDashboard}></Route>
        </Suspense>
      </Switch>
    </IntlProvider >
  );
}

export default App;