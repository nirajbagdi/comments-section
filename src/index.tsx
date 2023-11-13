import ReactDOM from 'react-dom/client';
import AppStateProvider from 'store';
import App from 'App';

import 'styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<AppStateProvider>
		<App />
	</AppStateProvider>
);
