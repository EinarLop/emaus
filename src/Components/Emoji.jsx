import React from 'react';

/* Receives two props: `label` for describing the emoji 
    and `symbol` for the actual unicode character */

const Emoji = (props) => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);
export default Emoji;