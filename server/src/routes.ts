import { Request, Response} from "express";
 interface Draft  {
  // tracks the full set of picks possible
options: string[]
// maps from team name to array of picks
mp: Map<String, String[]> 
// stores the number of rounds left
rounds: number
// stores the array of team names
teamNames: string[]
// stores the order that picks are made 
pickOrder: string[]
}
// stores an array of type draft in which each index is a unique ID for the draft
let arr: Draft[] = []

/** creates a draft based off of the information given from client, storing
 fields in the arr array, and sends the id of the draft back to the client */
export function create(req: Request, res: Response) {
  const drfter = req.query.drafter
  const name = req.query.name
  const pks = req.query.picks
  const rnds = req.body.rounds
  if (name === undefined || typeof name !== 'string' ) {
    res.status(400).send('missing "team name" parameter');
  } 
  else if (pks === undefined || typeof pks !== 'string' ) {
    res.status(400).send('missing "picks" parameter');
  } 
  else if (drfter === undefined || typeof drfter !== 'string' ) {
    res.status(400).send('missing "drafter" parameter');
  } 
  else if (rnds === undefined || typeof rnds !== 'number') {
    res.status(400).send('missing "rounds" parameter');
  } 
  else {
    let j: string[] = name.split("\n")  
    let k: Map<String, String[]> = new Map()
    // sets a new map to contain all team names as keys
    // and empty array for picks as values
    for(let i = 0; i < j.length; i++) {
      if(j[i].length>0) {
        k.set(j[i], [])
      }
    }
    let pksCopy: string[] = []
    let newArr: string[] = pks.split("\n")
    // stores picks in new array which makes sure
    // that empty strings and duplicates aren't included as elements
    for(const a of newArr) {
      if(a.length>0 && pksCopy.includes(a) === false) {
          pksCopy.push(a)
      }
    }
    let teamCopy: string[] = []
    let tm: string[] = name.split("\n")
    // stores teams in new array which makes sure
    // that empty strings and duplicates aren't included as elements
    for(const o of tm ) {
      if(o.length>0 && teamCopy.includes(o) === false) {
          teamCopy.push(o)
      }
    }

    k.set(drfter, [])
   arr.push({options: pksCopy, rounds: rnds, mp: k, pickOrder: [], teamNames: teamCopy})
    
    res.json(arr.length)
  }

}
/** tells clients wether their team can join the draft or not based off of their team
 * name and the id of the draft they gave*/
export function join (req: Request, res: Response) {
 
  const nm = req.query.name
  const d = req.body.id
  if(arr.length<d) {
   res.json(false)
   }
   else if (nm === undefined || typeof nm !== 'string' ) {
    res.status(400).send('missing "name" parameter');
  }
  else if(d=== undefined || typeof d !== 'number') {
    res.status(400).send('missing "id" parameter');
  }
  else if(!arr[d-1].mp.has(nm) ) {
    res.json(false)
  }
  else {
    res.json(true)
  }
}

/** saves the pick that the team makes based off of the team name, the pick they made, and the
 * id of their draft and tells clients if the pick went through or not
 */
export function savePick(req: Request, res: Response) {
  const name = req.query.name
  const d = req.query.pick
  const i = req.body.id
  
  if (name === undefined || typeof name !== 'string' ) {
    res.status(400).send('missing "name" parameter');
  } 
  else if (d === undefined || typeof d !== 'string' ) {
    res.status(400).send('missing "pick" parameter');
  }
  else if(i=== undefined || typeof i !== 'number') {
    res.status(400).send('missing "id" parameter');
  }
  else if(arr[i-1].options.indexOf(d) < 0) {
    res.status(400).send('invalid "pick" parameter');
  }
  else if(!arr[i-1].mp.has(name)) {
    res.status(400).send('invalid team name');
  }
  
  else {
    if(name === arr[i-1].teamNames[arr[i-1].teamNames.length-1]) {
        arr[i-1].rounds = arr[i-1].rounds - 1
    }
  let uy: String[] | undefined=  arr[i-1].mp.get(name)
  
    if(uy !== undefined) {
      uy.push(d)
      arr[i-1].mp.set(name, uy)
    }
   arr[i-1].pickOrder.push(d)
    const m: boolean = true
    res.json(m)
}
  } 
/** gives the user back all the current information of the draft based off of the draft id they gave
 */
  export function refreshServ(req: Request, res: Response) {
    
    if (req.query.id !== undefined && typeof req.query.id === 'string') {
    const d = parseInt(req.query.id)
      if (d>0 && d<=arr.length) {
        res.json({options: arr[d-1].options, rounds: arr[d-1].rounds,teamNames: arr[d-1].teamNames
        , pickOrder: arr[d-1].pickOrder})
      }
      else {
        res.status(400).send("invalid ID paramter")
      } 
    }
    else {
      res.status(400).send('missing "id" parameter');
    }

  }

/** Returns a list of all the named save files. */
export function Dummy(req: Request, res: Response) {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send('missing "name" parameter');
  } else {
    res.json(`Hi, ${name}`);
  }
}


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
function first(param: any): string|undefined {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
}
