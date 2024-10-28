import React, { FC, ReactNode } from 'react';
import { Modal } from '@mui/material';

interface ICustomModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

const CustomModal: FC<ICustomModalProps> = ({ open, onClose, children }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <>
                {children}
            </>
        </Modal>
    )
}

export default CustomModal;