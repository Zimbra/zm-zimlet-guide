import { createElement } from 'preact';
import { Text } from 'preact-i18n';
import { ModalDialog, ActionMenuItem, NakedButton } from '@zimbra-client/components';
import { compose } from 'recompose';
import { withIntl } from '../../enhancers';
import style from './style';
import { route } from 'preact-router';

function createMore(props, context) {
   return (
      <div>
         <ActionMenuItem onClick={e => handleClick(props, context)}>
            <Text id={`zimbra-zimlet-mytest.menuItem`} />
         </ActionMenuItem>
      </div>

   );
}

function handleClick(props, context) {
   //props.emailData contains a JSON-like object with the clicked email's data, you could use the id to fetch the email from the REST API from the back-end

   var request = new XMLHttpRequest();
   var url = '/service/extension/mytest';
   var formData = new FormData();
   formData.append('jsondata', JSON.stringify(props.emailData));
   request.open('POST', url);
   request.onreadystatechange = function (e) {
      if (request.readyState == 4) {
         if (request.status == 200) {
            showDialog(request.responseText, context);
         }
         else {
            alert('Failed to do this request.');
         }
      }
   }.bind(this);
   request.send(formData);
}

function showDialog(response, context) {
   console.log(context);
   let modal = (
      <ModalDialog
         class={style.modalDialog}
         contentClass={style.modalContent}
         innerClass={style.inner}
         onClose={handleClose}
         cancelButton={false}
         header={false}
         footer={false}
      >
         <div class='zimbra-client_modal-dialog_inner'><header class='zimbra-client_modal-dialog_header'><h2>this.props.emailData:</h2><button onClick={e => handleClose(context)} aria-label='Close' class='zimbra-client_close-button_close zimbra-client_modal-dialog_actionButton'><span role='img' class='zimbra-icon zimbra-icon-close blocks_icon_md'></span></button></header>
            <div class='zimbra-client_modal-dialog_content zimbra-client_language-modal_languageModalContent'>
               <div style='background-color: #eeeeee; padding:5px; font-family:monospace; margin:4px, 4px; width: 600px; height: 300px; overflow-x: hidden; overflow-x: auto; text-align:justify;' id='serverResponse'>{response}</div>
             Router demo: <span style='color:blue; text-decoration:underline; cursor:pointer' onClick={e => handleLinkClick(context)}>{'/MyTest'}</span>
            </div>
            <footer class='zimbra-client_modal-dialog_footer' id='nextcloudDialogButtons'><button type='button' onClick={e => handleClose(context)} class='blocks_button_button blocks_button_primary blocks_button_regular zimbra-client_sidebar-primary-button_button'>OK</button></footer>
         </div>
      </ModalDialog>
   );

   const { dispatch } = context.store;
   dispatch(context.zimletRedux.actions.zimlets.addModal({ id: 'addEventModal', modal: modal }));
}

function handleClose(context) {
   const { dispatch } = context.store;
   return dispatch(context.zimletRedux.actions.zimlets.addModal({ id: 'addEventModal' }));
}

function handleLinkClick(context) {
   const { dispatch } = context.store;
   dispatch(context.zimletRedux.actions.notifications.notify({
      message: 'Redirecting to the Zimlet tab...'
   }));
   route('/MyTest');
}

export default compose(
   withIntl()
)
   (
      createMore
   )
