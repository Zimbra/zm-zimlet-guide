import { createElement } from 'preact';
import { Text } from 'preact-i18n';
import { ModalDialog, ActionMenuItem, NakedButton } from '@zimbra-client/components';
import { compose } from 'recompose';
import { withIntl } from '../../enhancers';
import style from './style';
import { route } from 'preact-router';

function createMore(props, context) {
   const handleClick = (props) => {
      //props.emailData contains a JSON-like object with the clicked email's data, you could use the id to fetch the email from the REST API from the back-end

      var request = new XMLHttpRequest();
      var url = '/service/extension/mytest';
      var formData = new FormData();
      formData.append('jsondata', JSON.stringify(props.emailData));
      request.open('POST', url);
      request.onreadystatechange = function (e) {
         if (request.readyState == 4) {
            if (request.status == 200) {
               showDialog(request.responseText);
            }
            else {
               alert('Failed to do this request.');
            }
         }
      }.bind(this);
      request.send(formData);
   }

   const showDialog = (response) => {
      console.log(context);
      let modal = (
         <ModalDialog
               title="this.props.emailData"
               cancelButton={false}
               onClose={handleClose}
               onAction={handleClose}
         >
            <div>
                  <div style='background-color: #eeeeee; padding:5px; font-family:monospace; margin:4px, 4px; width: 100%; height: 300px; overflow-x: hidden; overflow-x: auto; text-align:justify;' id='serverResponse'>{response}</div>
                Router demo: <span style='color:blue; text-decoration:underline; cursor:pointer' onClick={e => handleLinkClick(context)}>{'/MyTest'}</span><br/><br/><br/><br/>
            </div>
         </ModalDialog>
      );

      const { dispatch } = context.store;
      dispatch(context.zimletRedux.actions.zimlets.addModal({ id: 'myTestModal', modal: modal }));
   }

   const handleClose = () => {
      const { dispatch } = context.store;
      return dispatch(context.zimletRedux.actions.zimlets.addModal({ id: 'myTestModal' }));
   }

   const handleLinkClick = () => {
      const { dispatch } = context.store;
      dispatch(context.zimletRedux.actions.notifications.notify({
         message: 'Redirecting to the Zimlet tab...'
      }));
      route('/integrations/MyTest');
   }

   return (
      <div>
         <ActionMenuItem onClick={e => handleClick(props)}>
            <Text id={`zimbra-zimlet-mytest.menuItem`} />
         </ActionMenuItem>
      </div>
   );

}

export default compose(
   withIntl()
)
   (
      createMore
   )
