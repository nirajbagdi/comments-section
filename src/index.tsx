import ReactDOM from 'react-dom/client';

import { CommentsProvider } from 'context';

import App from './App';
import 'styles/main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <CommentsProvider>
        <App />
    </CommentsProvider>
);
