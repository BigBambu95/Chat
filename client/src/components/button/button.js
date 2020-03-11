import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.css';

const Button = ({
    children, onClick, variant, size, className,
}) => {

    const clazz = classNames(
        'btn',
        variant,
        size,
        className
    );

  return(
      <button styleName={clazz} onClick={onClick}>{children}</button>
  )
};

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.element
    ]),
    onClick: PropTypes.func,
    variant: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string
}

Button.defaultProps = {
    children: null,
    onClick: function() {},
    variant: '',
    size: '',
    className: ''
};

export default Button;