import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  type,
  href,
  className,
  loading,
  text,
  disabled,
  onClick
}) => {
  if (href) {
    return (
      <Link to={href} className={className}>
        {loading ?
          <i className="fas fa-sync fa-spin mr-1" />
        : null}

        {loading ? "Loading..." : text}
      </Link>
    );
  } else {
    return (
      <button
        className={className}
        type={type || "button"}
        disabled={loading || disabled ? 'disabled' : null}
        onClick={onClick}
      >
        {loading ?
          <i className="fas fa-sync fa-spin mr-1" />
        : null}

        {loading ? "Loading..." : text}
      </button>
    );
  }
}

export default Button;