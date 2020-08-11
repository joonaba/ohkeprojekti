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
    <Programs />
    </div>
  
  
  </div>

);
// luodaan luokka jossa suurin osa sivun toiminnallisuudesta tapahtuu (nimi programs hämäävä koska alunperin oli tarkoituksena tehdä ohjelma jossa voi luoda kuntosali ohjelmia ja jakaa niitä muiden kanssa)
class ProgramsBase extends Component {
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
  onCreateProgram = (event, authUser) => {
   this.props.firebase.programs().push({
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

    this.props.firebase.programs().on('value', snapshot => {
      const programObject = snapshot.val();

      if (programObject) {
        const programList = Object.keys(programObject).map(key => ({
         ...programObject[key],
         uid: key,
       }));
        this.setState({
          programs: programList,
           loading: false,
          });
      } else {
        this.setState({ programs: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.programs().off();
  }
  // viestin poistaminen
  onRemoveProgram = uid => {
   this.props.firebase.program(uid).remove();
  };
// viestin muokkaaminen
  onEditProgram = (program, text) => {
    const { uid, ...programSnapshot } = program;

    this.props.firebase.program(program.uid).set({
      ...programSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  render() {
    const { text, programs, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
      <div>
      {loading && <div>Loading ...</div>}

          {programs ? (
            <ProgramList
             programs={programs}
             onEditProgram={this.onEditProgram}
             onRemoveProgram={this.onRemoveProgram}
              />
          ) : (
            <div>Ei viestejä :( ...</div>
          )}



        <form onSubmit={event => this.onCreateProgram(event, authUser)}>
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
const ProgramList = ({ programs, onEditProgram, onRemoveProgram }) => (
  <ul className='chatti'>
    {programs.map(program => (
      <ProgramItem
       key={program.uid}
       program={program}
       onEditProgram={onEditProgram}
       onRemoveProgram={onRemoveProgram}
        />
    ))}
  </ul>
);
// luokkaolio yksittäiselle viestille
class ProgramItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.program.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.program.text,
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
  const { program, onRemoveProgram } = this.props;
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
          <strong>{program.email}</strong> {program.text}
          {program.editedAt && <span>(Edited)</span>}
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
            onClick={() => onRemoveProgram(program.uid)}
          >
            Poista
          </button>
        )}
      </li>
    );
}
}
const Programs = withFirebase(ProgramsBase);



const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
