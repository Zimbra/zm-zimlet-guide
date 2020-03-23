import { createElement, Component } from 'preact';
import { withIntl } from '../../enhancers';
import style from './style';
import { ModalDialog, ActionMenuItem, NakedButton } from '@zimbra-client/components';
import { SLUG } from "../../constants";
import { route } from 'preact-router';

@withIntl()
export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.zimletContext = props.children[0];
        this.menuItemText = props.children[1];
    };

    handleClick = e => {
        //this.props.emailData contains a JSON-like object with the clicked email's data, you could use the id to fetch the email from the REST API from the back-end

        var request = new XMLHttpRequest();
        var url = '/service/extension/mytest';
        var formData = new FormData();
        formData.append("jsondata", JSON.stringify(this.props.emailData));
        request.open('POST', url);
        request.onreadystatechange = function (e) {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    this.showDialog(request.responseText);
                }
                else {
                    alert('Failed to do this request.');
                }
            }
        }.bind(this);
        request.send(formData);
    }

    showDialog = (response) => {
        this.modal = (
            <ModalDialog
                class={style.modalDialog}
                contentClass={style.modalContent}
                innerClass={style.inner}
                onClose={this.handleClose}
                cancelButton={false}
                header={false}
                footer={false}
            >
                <div class="zimbra-client_modal-dialog_inner"><header class="zimbra-client_modal-dialog_header"><h2>this.props.emailData:</h2><button onClick={this.handleClose} aria-label="Close" class="zimbra-client_close-button_close zimbra-client_modal-dialog_actionButton"><span role="img" class="zimbra-icon zimbra-icon-close blocks_icon_md"></span></button></header>
                    <div class="zimbra-client_modal-dialog_content zimbra-client_language-modal_languageModalContent">
                        <div style="background-color: #eeeeee; padding:5px; font-family:monospace; margin:4px, 4px; width: 600px; height: 300px; overflow-x: hidden; overflow-x: auto; text-align:justify;" id="serverResponse">{response}</div>
						Router demo: <span style="color:blue; text-decoration:underline; cursor:pointer" onClick={this.handleLinkClick}>{SLUG}</span>
                    </div>
                    <footer class="zimbra-client_modal-dialog_footer" id="nextcloudDialogButtons"><button type="button" onClick={this.handleClose} class="blocks_button blocks_button_regular">OK</button></footer>
                </div>
            </ModalDialog>
        );

        const { dispatch } = this.zimletContext.store;
        dispatch(this.zimletContext.zimletRedux.actions.zimlets.addModal({ id: 'addEventModal', modal: this.modal }));
    }

    handleClose = e => {
        const { dispatch } = this.zimletContext.store;
        return e && e.isTrusted && dispatch(this.zimletContext.zimletRedux.actions.zimlets.addModal({ id: 'addEventModal' }));
    }

    handleLinkClick = () => {
        const { dispatch } = this.zimletContext.store;
        dispatch(this.zimletContext.zimletRedux.actions.notifications.notify({
            message: 'Redirecting to the Zimlet tab...'
        }));
        route(`/${SLUG}`);
    }

    render() {
        return (
            <div>
                <ActionMenuItem onClick={this.handleClick}>
                    {this.menuItemText}
                </ActionMenuItem>
            </div>
        );
    }
}
