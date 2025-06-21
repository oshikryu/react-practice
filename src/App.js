import React from 'react'
import Result from './Result'
import './App.css';


const appState = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  FINAL: 'FINAL'
}

function App() {
  const [state, setState] = React.useState(appState.INITIAL);
  const [names, setNames] = React.useState(['']);
  const [results, setResults] = React.useState([]);
  const inputsRef = React.useRef([])

  React.useEffect(() => {
    inputsRef.current[names.length - 1].focus()
  }, [names.length])

  function addField(e) {
    let tempName = ""
    setNames((prevArray) => [...prevArray, tempName])
    // keep this in there cause we are submitting via form
    e.preventDefault();
  }

  function handleNameChange(evt, idx) {
    const newName = evt.target.value
    const namesCopy = names.slice()
    namesCopy[idx] = newName
    setNames(namesCopy)
  }

  function resetState() {
    setState(appState.INITIAL);
    setNames(['']);
  }

  async function handleSubmit() {
    const filteredNames = names.filter(name => name !== '');
    if (!filteredNames.length) return;

    setState(appState.LOADING);
    // todo

    setState(appState.FINAL);
  }

  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className="list">
          <h4>Who's the oldest?</h4>
          <form onSubmit={addField}>
            {names.map((name, i) => (
              <input ref={el => inputsRef.current[i] = el} disabled={state !== appState.INITIAL} placeholder="Type a name..." key={i} value={name} onChange={(e) => handleNameChange(e, i)} />
            ))}
            <button disabled={state !== appState.INITIAL} type="submit">Add name</button>
          </form>

        </div>
      </div>
      <div className="result">
        {state === appState.INITIAL && <button className="big-button" type="button">Find out!</button>}
        {state === appState.LOADING && <div>loading</div>}
        {state === appState.FINAL && <Result results={results} resetState={resetState} />}
      </div>
    </div>
  );
}

export default App;
