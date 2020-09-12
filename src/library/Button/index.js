import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const Button = forwardRef((props, ref) => {
  const {
    type,
    href,
    className,
    loading,
    text,
    disabled,
    onClick
  } = props;

  if (href) {
    return (
      <Link to={href} onClick={onClick} className={className} ref={ref}>
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
        ref={ref}
      >
        {loading ?
          <i className="fas fa-sync fa-spin mr-1" />
        : null}

        {loading ? "Loading..." : text}
      </button>
    );
  }
});

export default Button;