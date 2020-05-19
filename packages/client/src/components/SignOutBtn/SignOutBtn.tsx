import React from 'react';

import {Auth} from '../../containers/Auth.container';
import classes from './SignOutBtn.module.css'

export const SignOutBtn = () =>{
    const { signOut } = Auth.useContainer();
    return(
        <button
            className={classes.Btn}
            type="button"
            onClick ={()=>{
                signOut();
                alert("You have signed out");
            }}
        >
            Sign out
        </button>
    )
}