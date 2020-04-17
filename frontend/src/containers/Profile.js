import React from "react";
import { connect } from "react-redux";
class Profile extends React.Component{
    render(){
        return(
            <div>Hi</div>
        )
    }
}

const mapStatetoProps = state => {
    return{
        token: state.auth.token,
        username: state.auth.username
    }
}


export default connect(mapStatetoProps)(Profile)