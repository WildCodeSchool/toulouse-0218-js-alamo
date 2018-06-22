import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './App';
import registerServiceWorker from './registerServiceWorker';
import moment from 'moment';
import 'moment/locale/fr'; // this is the important bit, you have to import the locale your'e trying to use.
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

moment.locale('fr')

function App() {
  return (
    <MuiPickersUtilsProvider
      utils={MomentUtils}
      moment={moment}
      locale="fr">
      <Root />
    </MuiPickersUtilsProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
