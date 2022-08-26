import { gql } from '@apollo/client';

const GET_EVENTS_QUERY = gql`
  query getEvents{
    getEvents {
        _id
        title
        date
        dateEnd
        description
        location
        region
        sportType
        highlight
        imgURL
    }
  }
`
const GET_EVENT_QUERY = gql`
  query ($eventId: String!) {
    getEvent(eventId: $eventId) {
        host_id
        title
        date
        dateEnd
        location
        description
        registrationInfo
        trafficInfo
        prize
        drawURL
        scheduleURL
        sportType
        imgURL
    }
  }
`

const GET_EVENTHOST_QUERY = gql`
  query ($event_id: String!) {
    getEventHost(event_id: $event_id) {
      bank_code
      bank_account
      account_name
    }
  }
`

const Host_Events_QUERY = gql`
  query (
    $host_id: String!
  ) {
    hostEvents(host_id: $host_id) {
        _id
        title
        date
        dateEnd
        location
        sportType
    }
  }
`

const Host_EventOverview_QUERY = gql`
  query (
    $eventId: String!
  ) {
    getEvent(eventId: $eventId) {
        title
        public
        release
    }
  }
`

const Host_EventBasicInfo_QUERY = gql`
  query (
    $eventId: String!
  ) {
    getEvent(eventId: $eventId) {
        title
        highlight
        date
        dateEnd
        location
        fee
        sportType
        imgURL
        region
        country
        city
    }
  }
`

const Host_RichEditor_QUERY = gql`
  query (
    $eventId: String!
  ) {
    getEvent(eventId: $eventId) {
        description
        registrationInfo
        trafficInfo
        prize
    }
  }
`

const Host_DrawSchedule_QUERY = gql`
  query (
    $eventId: String!
  ) {
    getEvent(eventId: $eventId) {
        drawURL
        scheduleURL
    }
  }
`

const Host_RegistrationStatus_QUERY = gql`
  query (
    $event_id: String!
  ) {
    getEvent(eventId: $event_id) {
      title
      form {
        blocks {
          blockType
          question
          _id
        }
      }
    }
    eventForms(event_id: $event_id) {
        _id
        blocks {
          answer
          blockId
          blockType
        }
        paid
    }
  }
`

const Host_QUERY = gql`
  query (
    $host_id: String!
  ) {
    host(host_id: $host_id) {
      _id
      name
      phone
      email
      page
      bank_code
      bank_account
      account_name
    }
  }
`
const GET_MATCHES_QUERY = gql`
  query (
    $event_id:String!
  ){
    getMatch(event_id:$event_id)
    {
    _id,
    event_id,
    match_name,
    player_p1,
    player_p2,
    serve_p1,
    serve_p2,
    point_p1,
    point_p2,
    set1_p1,
    set1_p2,
    set2_p1,
    set2_p2,
    set3_p1,
    set3_p2,
    live,
    }
  }
`
const GET_CHECK_IN = gql`
query(
  $event_id:String!
  ){
    getCheckIn(event_id:$event_id){
      _id
      name
      email
      checkInTime
    }
  }
`
const GET_EVENTS_BY_SPORT_QUERY = gql` 
  query ($sportType: String!) {
    getEventsBySport(sportType:$sportType){
      _id
      title
      date
      dateEnd
      description
      location
      imgURL
  }
}
`
export {
  GET_EVENTS_QUERY, GET_EVENT_QUERY, Host_Events_QUERY, Host_QUERY, Host_EventOverview_QUERY,
  Host_RegistrationStatus_QUERY, Host_EventBasicInfo_QUERY, Host_RichEditor_QUERY, GET_EVENTHOST_QUERY,
  Host_DrawSchedule_QUERY, GET_MATCHES_QUERY,
  GET_CHECK_IN, GET_EVENTS_BY_SPORT_QUERY
};
