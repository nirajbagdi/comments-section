import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import styles from './Modal.module.css';

type BackdropProps = {
    onClick: () => void;
};

type ModalOverlayProps = {
    children: React.ReactNode;
};

type Props = {
    children: React.ReactNode;
    onClose: () => void;
};

const Backdrop: React.FC<BackdropProps> = props => {
    return (
        <motion.div
            className={styles.backdrop}
            onClick={props.onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        />
    );
};

const ModalOverlay: React.FC<ModalOverlayProps> = props => {
    return (
        <motion.div
            initial={{ x: '-50%', y: '-50%', scale: 0.5, opacity: 0 }}
            animate={{ x: '-50%', y: '-50%', scale: 1, opacity: 1 }}
            transition={{ delay: 0.01 }}
            className={styles.modal}
        >
            {props.children}
        </motion.div>
    );
};

const portalElement = document.getElementById('overlays') as HTMLElement;

const Modal: React.FC<Props> = props => (
    <>
        {createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
        {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
);

export default Modal;
