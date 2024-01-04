import React, { Component, ChangeEvent } from "react";
import { Draft } from "./draft";
interface EditorProps {
  // input draft 
   draft: Draft
  }

  interface EditorState {
  // stores the draft and its details
  draft: Draft
  // stores the picks left in the draft
   picksLeft: string[]
   // stores the order picks were made
   pickOrder: string[]
   // stores the selected pick
  chosenPick: string
  }
  
 // sets the initial state based off of props
  export class Editor extends Component<EditorProps, EditorState> {
  
    constructor(props: any) {
      super(props);
      this.state = {draft: this.props.draft,  chosenPick: "", picksLeft: this.props.draft.pick, pickOrder: []};
     
    }
    // makes sure refresh is up to date every render cycle
    componentDidMount(): void {
      this.handleRefresh()
    }
  // showcases the draft screen and controls what content is shown based off of how far in the draft
  // the teams are
    render = (): JSX.Element => {
      const x: JSX.Element[] = []
      // tracks picks left so user can see updated list
      for(const fl of this.state.picksLeft) {
        x.push(
            <option key= {fl} value={fl}>{fl}</option>
        )
       }
        if(this.state.draft.rounds === 0) {
          const picksOrder = this.getPickStatus()
          return  <div>
             <h2>Status Of Draft {this.props.draft.id}</h2>
             {picksOrder}
           
           <p> draft complete</p>
          </div>
        }
        else if(this.isTurn()) {
            return this.prodTurnDraft(x) 
         } else {
           return  this.loadHelp()
          }
    }
    /**
     * helper method for render which shows what needs to be displayed to the teams that aren't choosing a pick
     * @returns what needs to be displayed in render if team isn't choosing pick
     */
    loadHelp = (): JSX.Element => {
      let indx: number = this.state.pickOrder.length
       let pick: string = ""
       let teamName: string = this.state.draft.team[indx%this.state.draft.team.length]
       if(this.state.pickOrder.length===0) {
          pick = "No picks have been made" 
       }
       const picksOrder = this.getPickStatus()
       return  <div>
          <h2>Status Of Draft {this.props.draft.id}</h2>

      
          {picksOrder}
        
        <p> {pick} &nbsp; waiting for team: {teamName}</p>
       <button type = "button" onClick={this.handleRefresh}>Refresh</button>
       </div>
    }
    /**
     * tracks the picks that have been made by teams so far and displays them appropriately
     * @returns the correct format to be displayed in render of the picks that have been made
     */
    getPickStatus = (): JSX.Element => {
      const x: JSX.Element[] = []
      let indx: number = 0
      for(const fl of this.state.pickOrder) {
        let team: string = this.state.draft.team[(indx % this.state.draft.team.length)]
        indx+=1
        
        x.push(
          <li key={indx}>
         Num: {indx} &nbsp; Pick: {fl} &nbsp; Drafter: {team}
          </li>
        )
       }
       return     <ul>
        {x}
          </ul>
    }
/**
 * called when user clicks refresh button and displays latest draft data on click 
 */
    handleRefresh = (): void => {
      fetch(`/api/refresh?id=${this.state.draft.id}`)
      .then(this.handleRefreshkRes)
      .catch(this.handleServerError)
    }
 /**
  * called with the response to /refresh and gets data returned from server
  * @param res response from fetch to /refresh
  */
    handleRefreshkRes = (res: Response) => {
      if (res.status === 200) {
        res.text().then(this.handleRefreshJson).catch(this.handleServerError);
      } else {
        this.handleServerError(res);
      }
    };
  /**
 * called with JSON of the response from /refresh and sets the state to have latest draft data
 * @param val JSON value to be analyzed
 */
    handleRefreshJson = (val: any) => {
      const j = JSON.parse(val)
      let copy: string[] = []
      for(let i = 0; i < j.teamNames.length; i++) {
        copy.push(j.teamNames[i])
      }
      let drftCopy = this.state.draft
      drftCopy.team = copy
      drftCopy.pick = j.options
      this.setState({draft: drftCopy, pickOrder: j.pickOrder})
      let m: string[] = []
      const o = j.options
      if(Array.isArray(j.pickOrder)) {
        // adds elements to new m array which tracks the new picks left array based off of
        // latest draft data
        for(let i = 0; i < o.length; i++) {
          if(j.pickOrder.indexOf(o[i]) < 0) {
            m.push(o[i])
          }
        }
       let repldraft: Draft = this.state.draft
       repldraft.rounds = j.rounds
        this.setState({picksLeft: m, chosenPick: m[0], draft:  repldraft})  
    }

    };
    /** tracks if the drafter can choose a pick or not*/
    isTurn = (): boolean => {
        return  this.state.draft.drafter === this.state.draft.team[this.state.pickOrder.length%this.state.draft.team.length]
    }
    /**
     * helper for render which tracks what needs to be displayed for the team that's choosing a pick
     * @param input picks left given by render
     * @returns what needs to be displayed in render for the team who's choosing a pick
     */
    prodTurnDraft = (input: JSX.Element[]): JSX.Element => {
    const pickOrder = this.getPickStatus()
     return   <div>
      <h2>Status Of Draft {this.props.draft.id}</h2>
      {pickOrder}
      <p> It is your pick</p>
          <select onChange={this.handleclk} value={this.state.chosenPick}>
            {input}
          </select>
          <button type = "button" onClick={this.handlePick}>Draft</button>
        </div>
    }
    /**
     * stores the current pick chosen by the team who's choosing a pick
     * @param evt chosen pick
     */
    handleclk = (evt: ChangeEvent<HTMLSelectElement>): void => {
      if(typeof evt.target.value === 'string') {
        this.setState({chosenPick: evt.target.value})
      }
    }
   /**
 * called when user clicks draft button and handles the pick they've made
 */
    handlePick = (): void => {
      fetch("/api/savePick?name=" + encodeURIComponent(this.state.draft.drafter) + "&pick=" + encodeURIComponent(this.state.chosenPick),
      {method:"POST", body: JSON.stringify({id: this.state.draft.id}), headers:{"Content-Type": "application/json"}})
      .then(this.handlePickRes)
      .catch(this.handleServerError)
    }
     /**
  * called with the response to /savePick and gets data returned from server
  * @param res response from fetch to /savePick
  */
    handlePickRes = (res: Response) => {
      if (res.status === 200) {
        res.text().then(this.handlePickJson).catch(this.handleServerError);
      } else {
        this.handleServerError(res);
      }
    };
     /**
 * called with JSON of the response from /savePick and sets the state to have latest draft data
 * @param val JSON value to be analyzed
 */
    handlePickJson = (val: any) => {
      if (val !== "true") {
        console.error("bad data from /api/join:", val)
        return;
      }
      else {
     this.setState({chosenPick: ""})
     this.handleRefresh()
      }
    };
    /**
 * Handles case where there's an error in the server
 */
    handleServerError = (_: Response) => {
      console.error(`unknown error talking to server`);
    };
}