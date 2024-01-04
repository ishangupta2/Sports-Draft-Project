
import React, { Component, ChangeEvent} from "react";
import { Editor } from "./Editor";

interface AppState {
  // stores this draft's picks as one string
  pick: string
   // stores this draft's teams as one string
  team: string
  // stores the number of rounds in this draft
  rounds: number | undefined
  // stores the id of this draft
  id: number | undefined
  // stores the drafter
  drafter: string
  // detirmines wether user is on starting page
  // or on draft page
 pg: boolean
 // stores possible picks for this draft in string array
 // with each element being one pick
 passPicks: string[]
 // stores teams for this draft in string array
 // with each element being one team
 passTeams: string[]
}

// showcases the initial screen and controls which page is shown
export class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {pick: "", team: "", id: undefined, rounds: undefined, drafter: "", pg: false, passPicks: [], passTeams: []};
  }
  render = (): JSX.Element => {
    if(this.state.pg) {
       return <Editor draft={{pick: this.state.passPicks, team: this.state.passTeams,
      rounds: this.state.rounds, id: this.state.id, drafter: this.state.drafter}}/>
    }
    else  {
    return <div>
       <label htmlFor="name">Drafter, required for both</label>
            <input type = "text" id = "a" value = {this.state.drafter} onChange={this.handledrafterChange}></input>
      <h2>Join Existing Draft</h2>
      <label htmlFor="name">Draft ID</label>
            <input type = "text" id = "nm" value = {this.state.id} onChange={this.handleIDChange}></input>
            <button type = "button" onClick={this.handleJoin}>Join</button>
            <h2>Create New Draft</h2>
            <label htmlFor="name">Rounds</label>
            <input type = "number" id = "o" value = {this.state.rounds} onChange={this.handleroundChange}></input>
            <br></br>
            <br></br>
            <div>
            <label htmlFor="name">Options, one per line</label> <br></br>
            <textarea id="story" name="story" onChange={this.handlePickChange}></textarea> 
            </div>
            <div><label htmlFor="name">Team Names, one per line</label> <br></br>
            <textarea id="story" name="story" onChange={this.handleTeamChange}></textarea>
            </div>
            <button type = "button" onClick={this.handleCreate}>Create</button>

    </div>

    }
  };
  /**
   * detirmines wether user has inputted enough information to join a draft or not
   */
  handleJoin = (): void => {
    if(this.state.drafter!="" && this.state.id!==undefined) {
      this.jon()
    }
    else {
      alert("must input drafter and id to join")
    }
  }
  /**
 * called when user wants to join draft and checks to see if they're able to join or not
 */
  jon = (): void => {
    fetch("/api/join?name=" + encodeURIComponent(this.state.drafter),
    {method:"POST", body: JSON.stringify({id: this.state.id}), headers:{"Content-Type": "application/json"}})
    .then(this.jonResponse)
    .catch(this.handleServerError)
  }
 /**
  * called with the response to /join and gets data returned from server
  * @param res response from fetch to /join
  */
  jonResponse = (res: Response): void => {
    if (res.status === 200) {
      res.text().then(this.handlejonJson).catch(this.handleServerError);
    } else {
      this.handleServerError(res);
    }
  }
/**
 * called with JSON of the response from /join and checks to see if user is able to join or not
 * @param val JSON value to be analyzed
 */
  handlejonJson = (val: any) => {
    if (val !== "true") {
      alert("invalid ID or Team Name")
    }
    else {
      this.setState({pg: true})
    }
  };

  /**
   * detirmines wether a user has typed in enough information
   * to start a valid draft or not
   */
  handleCreate = (): void => {
    if(this.state.rounds!== undefined) {
    let unEmpty: string[]  = []
    // creates a teams array and only adds elements which aren't
    // empty or contain duplicates
    for(const a of this.state.team.split("\n")) {
      if(a.length>0 && unEmpty.includes(a)===false) {
        unEmpty.push(a)
      }
    }
 
    let pickUnEmpty: string[]  = []
    // creates a picks array and only adds elements which aren't
    // empty or contain duplicates
    for(const b of this.state.pick.split("\n")) {
      if(b.length>0 && pickUnEmpty.includes(b) === false) {
        pickUnEmpty.push(b)
      }
    }
    if(unEmpty.length<2 || pickUnEmpty.length< 2) {
      alert("must input at least 2 picks and 2 teams")
    }
    else if( unEmpty.length*this.state.rounds > pickUnEmpty.length) {
      alert("must have enough picks for the chosen number of teams and rounds")
    }
  else  if(!(this.state.rounds<=0)) {
    this.setState({passPicks: pickUnEmpty, passTeams: unEmpty})  
    this.handleSave() 
    }
    else {
      alert("Can't have 0 or less Rounds")
    }
  }
  else {
    alert("must input rounds")
  }
  }
  /**
 * called when user enters a valid draft and creates it and creates the draft accordingly
 */
  handleSave = (): void => {
    fetch("/api/create?name=" + encodeURIComponent(this.state.team) + "&picks=" + encodeURIComponent(this.state.pick) + "&drafter=" + encodeURIComponent(this.state.drafter),
    {method:"POST", body: JSON.stringify({rounds: this.state.rounds}), headers:{"Content-Type": "application/json"}})
    .then(this.handleSaveResponse)
    .catch(this.handleServerError)
  }
  /**
  * called with the response to /create and gets data returned from server
  * @param res response from fetch to /create
  */
  handleSaveResponse = (res: Response) => {
    if (res.status === 200) {
      res.text().then(this.handleSaveJson).catch(this.handleServerError);
    } else {
      this.handleServerError(res);
    }
  };
/**
 * called with JSON of the response from /create and stores id appropriately
 * @param val JSON value to be analyzed
 */
  handleSaveJson = (val: any) => {
   this.setState({id: parseInt(val), pg: true})
  };
/**
 * stores the drafter name which the user types in 
 * @param evt the name of the drafter the user typed in
 */
 handledrafterChange = (evt: ChangeEvent<HTMLInputElement>): void => {
  this.setState( {drafter: (evt.target.value as string)})
};
/**
 * stores the number of rounds which the user types in 
 * @param evt the number of rounds the user typed in
 */
 handleroundChange = (evt: ChangeEvent<HTMLInputElement>): void => {
  const d = parseInt(evt.target.value)
  if(!Number.isNaN(d)) {
    this.setState({rounds: d})
  }
 };
/**
 * stores the draft's id which the user types in 
 * @param evt the id of the draft the user typed in
 */
 handleIDChange = (evt: ChangeEvent<HTMLInputElement>): void => {
  const d = parseInt(evt.target.value)
  if(!Number.isNaN(d)) {
    this.setState({id:d})
  }
 };
 /**
 * stores the picks which the user types in 
 * @param evt the picks the user typed in
  */
  handlePickChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({pick: (evt.target.value as string)})
  };
/**
 * stores the team names which the user types in 
 * @param evt the name of the teams the user typed in
 */
  handleTeamChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({team: (evt.target.value as string)})
  };
/**
 * Handles case where there's an error in the server
 */
  handleServerError = (_: Response) => {
    console.error(`unknown error talking to server`);
  };

}