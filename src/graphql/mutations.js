import { gql } from '@apollo/client';

const CREATE_FORM_MUTATION = gql`
  mutation addForm(
        $event_id: String!
        $blocks: [ApplicantFormBlockInput]
        $paid: Boolean
    ){
        addForm (
            data: {
                event_id: $event_id
                blocks: $blocks
                paid: $paid
            }
        )
    }
`

const New_Event_MUTATION = gql`
  mutation newEvent(
        $host_id: String!
        $title: String!
        $public: Boolean!
        $release: Boolean!
    ){
        newEvent(
            data: {
                host_id: $host_id
                title: $title
                public: $public
                release: $release
            }
        )
    }
`

const Edit_Event_MUTATION = gql`
    mutation editEvent(
        $_id: String!
        $title: String!
        $highlight: String
        $date: Date
        $dateEnd: Date
        $location: String
        $fee: Int
        $sportType: String
        $region: String
        $country: String
        $city: String
    ){
        editEvent(
            data: {
                _id: $_id
                title: $title
                highlight: $highlight
                date: $date
                dateEnd: $dateEnd
                location: $location
                fee: $fee
                sportType: $sportType
                region: $region
                country: $country
                city: $city
            }
        )
    }
`

const Event_RichEditor_MUTATION = gql`
    mutation saveRichEditor(
        $_id: String!
        $description: String
        $registrationInfo: String
        $trafficInfo: String
        $prize: String
    ){
        saveRichEditor(
            data: {
                _id: $_id
                description: $description
                registrationInfo: $registrationInfo
                trafficInfo: $trafficInfo
                prize: $prize
            }
        )
    }
`

const LOGIN_CHECK_MUTATION = gql`
  mutation loginCheck(
        $email: String!
        $password: String,
        $googleId: String
    ){
        loginCheck(
            data: {
                email: $email
                password: $password,
                googleId: $googleId
            }
        ) {
            _id name email
        }
    }
`

const ADD_HOST_MUTATION = gql`
  mutation addHost(
        $name: String!
        $email: String!
        $password: String
        $confirmPassword: String
        $googleId: String
    ){
        addHost(
            data: {
                name: $name
                email: $email
                password: $password
                confirmPassword: $confirmPassword
                googleId: $googleId
            }
        ) {
            _id name email
        }
    }
`

const Edit_Host_MUTATION = gql`
  mutation editHost(
        $_id: String
        $name: String!
        $email: String!
        $password: String
        $googleId: String
        $phone: String
        $page: String
        $bank_code: String
        $bank_account: String
        $account_name: String
    ){
        editHost(
            data: {
                _id: $_id
                name: $name
                email: $email
                password: $password
                googleId: $googleId
                phone: $phone
                page: $page
                bank_code: $bank_code
                bank_account: $bank_account
                account_name: $account_name
            }
        )
    }
`

const Host_SetPaidStatus_MUTATION = gql`
  mutation setPaidStatus(
        $_id: String
        $paid: Boolean
    ){
        setPaidStatus(
            data: {
                _id: $_id
                paid: $paid
            }
        )
    }
`

const CREATE_CONTACT_MUTATION = gql`
    mutation addContact(
        $name : String
        $email : String
        $message: String
    ){
        addContact(
           data:{
               name : $name
               email : $email
               message : $message
           }
        )
    }
`
const CREATE_PAYMENT_MUTATION = gql`
    mutation addPayment(
        $MerchantTradeNo: String
        $MerchantTradeDate: String
        $TotalAmount: String
        $TradeDesc: String
        $ItemName: String
        $ReturnURL: String
        $ClientBackURL: String
    ){
        addPayment(
            data:{
                MerchantTradeNo: $MerchantTradeNo
                MerchantTradeDate: $MerchantTradeDate
                TotalAmount: $TotalAmount
                TradeDesc: $TradeDesc
                ItemName: $ItemName
                ReturnURL: $ReturnURL
                ClientBackURL: $ClientBackURL
            }
        )
    }
`

const UPLOAD_IMG = gql`
mutation singleUploadImg(
    $file: FileUpload
    $eventId: String
    $originalFile: String
    ) {
  singleUploadImg(
      data: {
        file: $file
        eventId: $eventId
        originalFile: $originalFile
    }
    )
}
`;

const UPLOAD_FILE = gql`
mutation singleUploadFile(
    $data: [EventFileInput]
    ) {
    singleUploadFile(
      data: $data
    )
}
`;
const ADD_MATCH = gql`
    mutation addMatch(
        $event_id: String!
        $match_name: String!
        $player_p1: String!
        $player_p2: String!
    ){
        addMatch(
           data:{
                event_id: $event_id
                match_name: $match_name
                player_p1: $player_p1
                player_p2: $player_p2
           }
        )
    }
`
const UPDATE_MATCH = gql`
mutation updateMatch(
    $_id:String!
    $event_id: String!
    $match_name: String!
    $player_p1: String!
    $player_p2: String!
    $serve_p1:String!
    $serve_p2:String!
    $point_p1:Int!
    $point_p2:Int!
    $set1_p1:Int!
    $set1_p2:Int!
    $set2_p1:Int!
    $set2_p2:Int!
    $set3_p1:Int!
    $set3_p2:Int!
    $live:Boolean!
    ){
        updateMatch(
           data:{
            _id: $_id
                event_id:$event_id
                match_name:$match_name
                player_p1:$player_p1
                player_p2:$player_p2
                serve_p1: $serve_p1
                serve_p2: $serve_p2
                point_p1: $point_p1
                point_p2: $point_p2
                set1_p1: $set1_p1
                set1_p2: $set1_p2
                set2_p1: $set2_p1
                set2_p2: $set2_p2
                set3_p1: $set3_p1
                set3_p2: $set3_p2
                live: $live
               
           }
        )
    }
`
const CHECK_IN = gql`
mutation addCheckIn(
    $event_id: String!
    $name: String!
    $email: String!
){
    addCheckIn(
       data:{
            event_id: $event_id
            name: $name
            email: $email
       }
    )
}
`

const DELETE_MATCH = gql`
mutation deleteMatch(
    $_id: String!
    ){
        deleteMatch(
            data: {
                _id: $_id
            }
        )
    }
`
const DELETE_CHECKINS = gql`
mutation deleteCheckIn(
    $data: [String]!
){
    deleteCheckIn(data: $data)
}
`

const RELEASE_EVENT = gql`
mutation releaseEvent(
    $_id: String!
    $release: Boolean!
){
    releaseEvent(
        data: {
            _id: $_id
            release: $release
        }
    )
}
`

export {
    CREATE_FORM_MUTATION, New_Event_MUTATION, Edit_Host_MUTATION, Edit_Event_MUTATION, Event_RichEditor_MUTATION, Host_SetPaidStatus_MUTATION,
    CREATE_CONTACT_MUTATION, CREATE_PAYMENT_MUTATION, ADD_HOST_MUTATION, LOGIN_CHECK_MUTATION, UPLOAD_IMG, UPLOAD_FILE, ADD_MATCH,
    UPDATE_MATCH, DELETE_MATCH, CHECK_IN, DELETE_CHECKINS, RELEASE_EVENT
}