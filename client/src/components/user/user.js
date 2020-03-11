import React from "react";

const User = ({user}) => {
    return(
        <div className="chat__header__user">
            <span>{`${user.firstName} ${user.lastName}`}</span>
            <img src={user.image} alt={user.firstName} className="rounded" />
        </div>
    )
};

export default User;