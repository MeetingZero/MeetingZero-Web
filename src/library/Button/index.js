import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {
  if (props.href) {
    return (
      <Link to={props.href} className={props.className}>
        {props.loading ?
          <i className="fas fa-sync fa-spin mr-1" />
        : null}

        {props.loading ? "Loading..." : props.text}
      </Link>
    );
  } else {
    return (
      <button className={props.className} type={props.type || "button"}>
        {props.loading ?
          <i className="fas fa-sync fa-spin mr-1" />
        : null}

        {props.loading ? "Loading..." : props.text}
      </button>
    );
  }
}

export default Button;