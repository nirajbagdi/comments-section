import { createPortal } from 'react-dom';
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
    return <div className={styles.backdrop} onClick={props.onClick} />;
};

const ModalOverlay: React.FC<ModalOverlayProps> = props => {
    return <div className={styles.modal}>{props.children}</div>;
};

const portalElement = document.getElementById('overlays') as HTMLElement;

const Modal: React.FC<Props> = props => (
    <>
        {createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
        {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
);

export default Modal;
