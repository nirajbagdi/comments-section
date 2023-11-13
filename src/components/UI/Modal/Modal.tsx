import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import styles from './Modal.module.scss';

interface BackdropProps {
	onClick: () => void;
}

interface ModalOverlayProps {
	children: React.ReactNode;
}

interface Props {
	children: React.ReactNode;
	onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick }) => (
	<motion.div
		className={styles.backdrop}
		onClick={onClick}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
	/>
);

const ModalOverlay: React.FC<ModalOverlayProps> = ({ children }) => (
	<motion.div
		initial={{ x: '-50%', y: '-50%', scale: 0.5, opacity: 0 }}
		animate={{ x: '-50%', y: '-50%', scale: 1, opacity: 1 }}
		transition={{ delay: 0.01 }}
		className={styles.modal}
	>
		{children}
	</motion.div>
);

const portalElement = document.getElementById('overlays') as HTMLElement;

const Modal: React.FC<Props> = ({ onClose, children }) => (
	<>
		{createPortal(<Backdrop onClick={onClose} />, portalElement)}
		{createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
	</>
);

export default Modal;
