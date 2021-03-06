import React, { Component } from 'react';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import './Home.css';
// kotisivun rakenne
const HomePage = () => (
  <div>
  <div className="otsikot">
    <h1>Chatti</h1>
    <p>Käyttäjien välinen chatti</p>
    </div>
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>
    <Messages />
    </div>
  
  
  </div>

);
// luodaan luokka jossa suurin osa sivun toiminnallisuudesta tapahtuu (nimi programs hämäävä koska alunperin oli tarkoituksena tehdä ohjelma jossa voi luoda kuntosali ohjelmia ja jakaa niitä muiden kanssa)
class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      programs: [],
    };
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };


// uuden viestin lähettäminen tietokantaan
  onCreateMessage = (event, authUser) => {
   this.props.firebase.messages().push({
     text: this.state.text,
     userId: authUser.uid,
     email: authUser.email,
     createdAt: this.props.firebase.serverValue.TIMESTAMP,
   });

   this.setState({ text: '' });

   event.preventDefault();
   console.log(authUser.email);
  console.log(authUser.username);
  
 };
 // haetaan ja listataan viestit tietokannasta
  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.message().on('value', snapshot => {
      const messageObject = snapshot.val();

      if (messageObject) {
        const messageList = Object.keys(messageObject).map(key => ({
         ...messageObject[key],
         uid: key,
       }));
        this.setState({
          messages: messageList,
           loading: false,
          });
      } else {
        this.setState({ messages: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.message().off();
  }
  // viestin poistaminen
  onRemoveMessage = uid => {
   this.props.firebase.message(uid).remove();
  };
// viestin muokkaaminen
  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
      <div>
      {loading && <div>Loading ...</div>}

          {messages ? (
            <messageList
             messages={messages}
             onEditMessage={this.onEditMessage}
             onRemoveMessage={this.onRemoveMessage}
              />
          ) : (
            <div>Ei viestejä :( ...</div>
          )}



        <form onSubmit={event => this.onCreateMessage(event, authUser)}>
          <input
            type="text"
            value={text}
            onChange={this.onChangeText}
          />
          <button type="submit">Lähetä</button>
        </form>

      </div>
    )}
     </AuthUserContext.Consumer>
    );
  }

}
  //luodaan lista viesteistä
const MessageList = ({ messages, onEditMessage, onRemoveMessage }) => (
  <ul className='chatti'>
    {messages.map(message => (
      <MessageItem
       key={message.uid}
       message={message}
       onEditMessage={onEditMessage}
       onRemoveMessage={onRemoveMessage}
        />
    ))}
  </ul>
);
// luokkaolio yksittäiselle viestille
class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditProgram(this.props.program, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
  const { message, onRemoveMessage } = this.props;
  const { editMode, editText } = this.state;
  
  
    return (
      <li>
      {editMode ? (
        <input
          type="text"
          value={editText}
          onChange={this.onChangeEditText}
        />
      ) : (
        <span>
          <strong>{message.email}</strong> {message.text}
          {message.editedAt && <span>(Edited)</span>}
        </span>
         )}
        {editMode ? (
         <span>
           <button onClick={this.onSaveEditText}>Tallenna</button>
           <button onClick={this.onToggleEditMode}>Takaisin</button>
         </span>
       ) : (
         <button onClick={this.onToggleEditMode}>Muokkaa</button>
       )}

        {!editMode && (
          <button
            type="button"
            onClick={() => onRemoveMessage(message.uid)}
          >
            Poista
          </button>
        )}
      </li>
    );
}
}
const Messages = withFirebase(MessagesBase);



const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
