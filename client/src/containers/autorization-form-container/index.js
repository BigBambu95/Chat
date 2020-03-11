import React from 'react';
import { connect } from 'react-redux';


const AutorizationFormContainer = () => {
    return(
        <div></div>
    )
}


const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {}
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(AutorizationFormContainer)