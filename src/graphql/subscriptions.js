import { gql } from '@apollo/client';

const UPDATE_MATCH_SUBSCRIPTION = gql`
subscription($event_id: String!){
    updateMatch(event_id: $event_id) {
        _id,
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
export { UPDATE_MATCH_SUBSCRIPTION }