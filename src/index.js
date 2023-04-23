import App from './flowControllers/launchApp'
import './styles/style.css';
import './styles/modals.css';
import './styles/mobile.css';

const root = document.querySelector('#root');
App.loadStartPage(root);