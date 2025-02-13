import React from 'react';
import { Tooltip } from '@mui/material';

const CustomTooltip = ({ title, children, placement = 'top', arrow = true }) => {
    return (
        <Tooltip title={title} placement={placement} arrow={arrow}>
            {children}
        </Tooltip>
    );
};

export default CustomTooltip;
