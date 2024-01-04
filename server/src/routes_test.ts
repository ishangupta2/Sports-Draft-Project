import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { Dummy, create, join, savePick, refreshServ } from './routes';

describe('routes', function() {

  it('Dummy', function() {
    const req1 = httpMocks.createRequest(
        {method: 'GET', url: '/api/dummy', query: {name: 'Kevin'}});
    const res1 = httpMocks.createResponse();
    Dummy(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getJSONData(), 'Hi, Kevin');
  });
  it('create', function() {
  const req = httpMocks.createRequest(
    {method: 'POST', url: '/api/create', body: {rounds: 3}, query: {picks: "Steph  \n  Andre"}}); 
const res = httpMocks.createResponse();
create(req, res);
assert.strictEqual(res._getStatusCode(), 400)
assert.deepEqual(res._getData(),'missing "team name" parameter');

const reqs = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: 3}, query: {picks: "Steph"}}); 
const ress = httpMocks.createResponse();
create(reqs, ress);
assert.strictEqual(ress._getStatusCode(), 400)
assert.deepEqual(ress._getData(),'missing "team name" parameter');

const reqa = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: 3}, query: {name: 5, picks: "Steph"}}); 
const resa = httpMocks.createResponse();
create(reqa, resa);
assert.strictEqual(resa._getStatusCode(), 400)
assert.deepEqual(resa._getData(),'missing "team name" parameter');

const reqb = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: 3}, query: {name: true, picks: "Steph"}}); 
const resb = httpMocks.createResponse();
create(reqb, resb);
assert.strictEqual(resb._getStatusCode(), 400)
assert.deepEqual(resb._getData(),'missing "team name" parameter');

const reqc = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: 3}, query: {name: "ish"}}); 
const resc = httpMocks.createResponse();
create(reqc, resc);
assert.strictEqual(resc._getStatusCode(), 400)
assert.deepEqual(resc._getData(),'missing "picks" parameter');

const reqd = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: 3}, query: {name: "a", picks: undefined}}); 
const resd = httpMocks.createResponse();
create(reqd, resd);
assert.strictEqual(resd._getStatusCode(), 400)
assert.deepEqual(resd._getData(),'missing "picks" parameter');

const reqe = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: 3}, query: {name: "ish", picks: 5}}); 
const rese = httpMocks.createResponse();
create(reqe, rese);
assert.strictEqual(rese._getStatusCode(), 400)
assert.deepEqual(rese._getData(),'missing "picks" parameter');

const reqf = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: 3}, query: {name: "ish", picks: false}}); 
const resf = httpMocks.createResponse();
create(reqf, resf);
assert.strictEqual(resf._getStatusCode(), 400)
assert.deepEqual(resf._getData(),'missing "picks" parameter');

const reqg = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: 3}, query: {name: "ish", picks: "d", drafter: undefined}}); 
const resg = httpMocks.createResponse();
create(reqg, resg);
assert.strictEqual(resg._getStatusCode(), 400)
assert.deepEqual(resg._getData(),'missing "drafter" parameter');

const reqh = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: 3}, query: {name: "ish", picks: "d", drafter: false}}); 
const resh = httpMocks.createResponse();
create(reqh, resh);
assert.strictEqual(resh._getStatusCode(), 400)
assert.deepEqual(resh._getData(),'missing "drafter" parameter');

const req1 = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: 3}, query: {name: "ish", picks: "d", drafter: 5}}); 
const res1 = httpMocks.createResponse();
create(req1, res1);
assert.strictEqual(res1._getStatusCode(), 400)
assert.deepEqual(res1._getData(),'missing "drafter" parameter');

const req2 = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: undefined}, query: {name: "ish", picks: "d", drafter: "a"}}); 
const res2 = httpMocks.createResponse();
create(req2, res2);
assert.strictEqual(res2._getStatusCode(), 400)
assert.deepEqual(res2._getData(),'missing "rounds" parameter');

const req3 = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: false}, query: {name: "ish", picks: "d", drafter: "a"}}); 
const res3 = httpMocks.createResponse();
create(req3, res3);
assert.strictEqual(res3._getStatusCode(), 400)
assert.deepEqual(res3._getData(),'missing "rounds" parameter');


const req4 = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: "a"}, query: {name: "ish", picks: "d", drafter: "a"}}); 
const res4 = httpMocks.createResponse();
create(req4, res4);
assert.strictEqual(res4._getStatusCode(), 400)
assert.deepEqual(res4._getData(),'missing "rounds" parameter');

const req5 = httpMocks.createRequest(
 {method: 'POST', url: '/api/create', body: {rounds: 1}, query: {name: "Warriors\nCavs", picks: "MJ\nKobe", drafter: "hawks"}}); 
const res5 = httpMocks.createResponse();
create(req5, res5);
assert.strictEqual(res5._getStatusCode(), 200)
assert.deepEqual(res5._getJSONData(), 1);

const req6 = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: 1}, query: {name: "ish\nont", picks: "cow\nmoo", drafter: "ont"}}); 
const res6 = httpMocks.createResponse();
create(req6, res6);
assert.strictEqual(res6._getStatusCode(), 200)
assert.deepEqual(res6._getJSONData(), 2);

const req7 = httpMocks.createRequest(
  {method: 'POST', url: '/api/create', body: {rounds: 2}, query: {name:"steph\nlebron\nkyrie", picks: "nba\nnfl\ngleague\nui\nyo\nai", drafter: "ishan"}}); 
const res7 = httpMocks.createResponse();
create(req7, res7);
assert.strictEqual(res7._getStatusCode(), 200)
assert.deepEqual(res7._getJSONData(), 3);

   const req8 = httpMocks.createRequest(
    // query: is how we add query params. body: {} can be used to test a POST request
    {method: 'POST', url: '/api/create', body: {rounds: 2}, query: {name: "Kevin\nLebron", picks: "Steph\nAndre\nkyrie\nobj", drafter: "Kevin"}}); 
const res8 = httpMocks.createResponse();
create(req8, res8);
assert.strictEqual(res8._getStatusCode(), 200)
assert.deepEqual(res8._getJSONData(), 4);

const req9 = httpMocks.createRequest(
  // query: is how we add query params. body: {} can be used to test a POST request
  {method: 'POST', url: '/api/create',body:{rounds:3}, query: {name: "Kevin\nSteph", picks: "one\ntwo\nthree\nfour\nfive\nsix", drafter: "wash"}}); 
const res9 = httpMocks.createResponse();
create(req9, res9);
assert.strictEqual(res9._getStatusCode(), 200)
assert.deepEqual(res9._getJSONData(), 5);
  });
  it('join', function() {
    const reqa= httpMocks.createRequest(
      {method: 'POST', url: '/api/join',body:{id:6}, query: {name: "War"}}); 
    const resa= httpMocks.createResponse();
    join(reqa, resa);
    assert.strictEqual(resa._getStatusCode(), 200)
    assert.deepEqual(resa._getJSONData(), false);

    const reqb= httpMocks.createRequest(
      {method: 'POST', url: '/api/join',body:{id:9}, query: {name: "War"}}); 
    const resb= httpMocks.createResponse();
    join(reqb, resb);
    assert.strictEqual(resb._getStatusCode(), 200)
    assert.deepEqual(resb._getJSONData(), false);

    const req = httpMocks.createRequest(
      {method: 'POST', url: '/api/join',body:{id:1}, query: {name: undefined}}); 
    const res = httpMocks.createResponse();
    join(req, res);
    assert.strictEqual(res._getStatusCode(), 400)
    assert.deepEqual(res._getData(), 'missing "name" parameter');

    const req1 = httpMocks.createRequest(
      {method: 'POST', url: '/api/join',body:{id:1}, query: {name: 5}}); 
    const res1 = httpMocks.createResponse();
    join(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400)
    assert.deepEqual(res1._getData(), 'missing "name" parameter');

    const req2 = httpMocks.createRequest(
      {method: 'POST', url: '/api/join',body:{id:1}, query: {name: true}}); 
    const res2 = httpMocks.createResponse();
    join(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400)
    assert.deepEqual(res2._getData(), 'missing "name" parameter');

    const req3 = httpMocks.createRequest(
      {method: 'POST', url: '/api/join',body:{id:undefined}, query: {name: "a"}}); 
    const res3 = httpMocks.createResponse();
    join(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 400)
    assert.deepEqual(res3._getData(), 'missing "id" parameter');

    const req4 = httpMocks.createRequest(
      {method: 'POST', url: '/api/join',body:{id:"ad"}, query: {name: "a"}}); 
    const res4 = httpMocks.createResponse();
    join(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 400)
    assert.deepEqual(res4._getData(), 'missing "id" parameter');

    const req5 = httpMocks.createRequest(
      {method: 'POST', url: '/api/join',body:{id:true}, query: {name: "a"}}); 
    const res5 = httpMocks.createResponse();
    join(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 400)
    assert.deepEqual(res5._getData(), 'missing "id" parameter');

    const req6= httpMocks.createRequest(
      {method: 'POST', url: '/api/join',body:{id:1}, query: {name: "Warriors"}}); 
    const res6= httpMocks.createResponse();
    join(req6, res6);
    assert.strictEqual(res6._getStatusCode(), 200)
    assert.deepEqual(res6._getJSONData(), true);

    const req7= httpMocks.createRequest(
      {method: 'POST', url: '/api/join',body:{id:2}, query: {name: "ont"}}); 
    const res7= httpMocks.createResponse();
    join(req7, res7);
    assert.strictEqual(res7._getStatusCode(), 200)
    assert.deepEqual(res7._getJSONData(), true);

    const reqab= httpMocks.createRequest(
      {method: 'POST', url: '/api/join',body:{id:1}, query: {name: "hawks"}}); 
    const resab= httpMocks.createResponse();
    join(reqab, resab);
    assert.strictEqual(resab._getStatusCode(), 200)
    assert.deepEqual(resab._getJSONData(), true);

    const req8= httpMocks.createRequest(
      {method: 'POST', url: '/api/join',body:{id:1}, query: {name: "War"}}); 
    const res8= httpMocks.createResponse();
    join(req8, res8);
    assert.strictEqual(res8._getStatusCode(), 200)
    assert.deepEqual(res8._getJSONData(), false);

    const req9= httpMocks.createRequest(
      {method: 'POST', url: '/api/join',body:{id:2}, query: {name: "antonio"}}); 
    const res9= httpMocks.createResponse();
    join(req9, res9);
    assert.strictEqual(res9._getStatusCode(), 200)
    assert.deepEqual(res9._getJSONData(), false);

  });
  it('savePick', function() {
    const req3 = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:1}, query: {name: undefined, pick: "one"}}); 
    const res3 = httpMocks.createResponse();
    savePick(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 400)
    assert.deepEqual(res3._getData(), 'missing "name" parameter');  

    const req = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:1}, query: {name: true, pick: "one"}}); 
    const res = httpMocks.createResponse();
    savePick(req, res);
    assert.strictEqual(res._getStatusCode(), 400)
    assert.deepEqual(res._getData(), 'missing "name" parameter');  

    const req1 = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:1}, query: {name: false, pick: "one"}}); 
    const res1 = httpMocks.createResponse();
    savePick(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400)
    assert.deepEqual(res1._getData(), 'missing "name" parameter'); 
    
    const req2 = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:1}, query: {pick: undefined, name: "one"}}); 
    const res2 = httpMocks.createResponse();
    savePick(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400)
    assert.deepEqual(res2._getData(), 'missing "pick" parameter');  

    const req4 = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:1}, query: {pick: false, name: "one"}}); 
    const res4 = httpMocks.createResponse();
    savePick(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 400)
    assert.deepEqual(res4._getData(), 'missing "pick" parameter');  

    const req5 = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:1}, query: {pick: 5, name: "one"}}); 
    const res5 = httpMocks.createResponse();
    savePick(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 400)
    assert.deepEqual(res5._getData(), 'missing "pick" parameter');  

    const req6 = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:undefined}, query: {pick: "ant", name: "one"}}); 
    const res6 = httpMocks.createResponse();
    savePick(req6, res6);
    assert.strictEqual(res6._getStatusCode(), 400)
    assert.deepEqual(res6._getData(), 'missing "id" parameter');  

    const req7 = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:"a"}, query: {pick: "w", name: "one"}}); 
    const res7 = httpMocks.createResponse();
    savePick(req7, res7);
    assert.strictEqual(res7._getStatusCode(), 400)
    assert.deepEqual(res7._getData(), 'missing "id" parameter');  

    const req8 = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:false}, query: {pick: "ha", name: "one"}}); 
    const res8 = httpMocks.createResponse();
    savePick(req8, res8);
    assert.strictEqual(res8._getStatusCode(), 400)
    assert.deepEqual(res8._getData(), 'missing "id" parameter');  

    const req9 = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:1}, query: {name: "Ko", pick: "Ant"}}); 
    const res9 = httpMocks.createResponse();
    savePick(req9, res9);
    assert.strictEqual(res9._getStatusCode(), 400)
    assert.deepEqual(res9._getData(), 'invalid "pick" parameter');  

    const reqa = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:1}, query: {name: "Cavs", pick: "Antlers"}}); 
    const resa = httpMocks.createResponse();
    savePick(reqa, resa);
    assert.strictEqual(resa._getStatusCode(), 400)
    assert.deepEqual(resa._getData(), 'invalid "pick" parameter');  

    const reqb = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:1}, query: {name: "Ko", pick: "MJ"}}); 
    const resb = httpMocks.createResponse();
    savePick(reqb, resb);
    assert.strictEqual(resb._getStatusCode(), 400)
    assert.deepEqual(resb._getData(), 'invalid team name');  

    const reqc = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:3}, query: {name: "Kobl", pick: "nba"}}); 
    const resc = httpMocks.createResponse();
    savePick(reqc, resc);
    assert.strictEqual(resc._getStatusCode(), 400)
    assert.deepEqual(resc._getData(), 'invalid team name');  

    const reqd = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:1}, query: {name: "Warriors", pick: "MJ"}}); 
    const resd = httpMocks.createResponse();
    savePick(reqd, resd);
    assert.strictEqual(resd._getStatusCode(), 200)
    assert.deepEqual(resd._getJSONData(), true);  

    const reqe = httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:5}, query: {name: "Steph", pick: "three"}}); 
    const rese= httpMocks.createResponse();
    savePick(reqe, rese);
    assert.strictEqual(rese._getStatusCode(), 200)
    assert.deepEqual(rese._getJSONData(), true);  

    const reqf= httpMocks.createRequest(
      {method: 'POST', url: '/api/savePick',body:{id:5}, query: {name: "Kevin", pick: "four"}}); 
    const resf = httpMocks.createResponse();
    savePick(reqf, resf);
    assert.strictEqual(resf._getStatusCode(), 200)
    assert.deepEqual(resf._getJSONData(), true);  
  });
  it('refreshServ', function() {
    const reqf= httpMocks.createRequest(
      {method: 'GET', url: '/api/refresh', query: {id: 5}}); 
    const resf = httpMocks.createResponse();
    refreshServ(reqf, resf);
    assert.strictEqual(resf._getStatusCode(), 400)
    assert.deepEqual(resf._getData(), 'missing "id" parameter');  

    const req= httpMocks.createRequest(
      {method: 'GET', url: '/api/refresh', query: {id: true}}); 
    const res = httpMocks.createResponse();
    refreshServ(req, res);
    assert.strictEqual(res._getStatusCode(), 400)
    assert.deepEqual(res._getData(), 'missing "id" parameter'); 
    
    const req1= httpMocks.createRequest(
      {method: 'GET', url: '/api/refresh', query: {id: undefined}}); 
    const res1 = httpMocks.createResponse();
    refreshServ(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400)
    assert.deepEqual(res1._getData(), 'missing "id" parameter');  

    const req2= httpMocks.createRequest(
      {method: 'GET', url: '/api/refresh', query: {id: "20"}}); 
    const res2 = httpMocks.createResponse();
    refreshServ(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400)
    assert.deepEqual(res2._getData(), "invalid ID paramter");  

    const req3= httpMocks.createRequest(
      {method: 'GET', url: '/api/refresh', query: {id: "6"}}); 
    const res3 = httpMocks.createResponse();
    refreshServ(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 400)
    assert.deepEqual(res3._getData(), "invalid ID paramter");  
    
    const req4= httpMocks.createRequest(
      {method: 'GET', url: '/api/refresh', query: {id: "-5"}}); 
    const res4 = httpMocks.createResponse();
    refreshServ(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 400)
    assert.deepEqual(res4._getData(), "invalid ID paramter"); 
    
    const req5= httpMocks.createRequest(
      {method: 'GET', url: '/api/refresh', query: {id: "-2"}}); 
    const res5 = httpMocks.createResponse();
    refreshServ(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 400)
    assert.deepEqual(res5._getData(), "invalid ID paramter");  

    const req6= httpMocks.createRequest(
      {method: 'GET', url: '/api/refresh', query: {id: "3"}}); 
    const res6 = httpMocks.createResponse();
    refreshServ(req6, res6);
    assert.strictEqual(res6._getStatusCode(), 200)
    assert.deepEqual(res6._getJSONData(), {options: ["nba","nfl","gleague","ui","yo","ai"],
      rounds: 2, 
    teamNames: ["steph","lebron","kyrie"], pickOrder: []});  

    const req7= httpMocks.createRequest(
      {method: 'GET', url: '/api/refresh', query: {id: "1"}}); 
    const res7 = httpMocks.createResponse();
    refreshServ(req7, res7);
    assert.strictEqual(res7._getStatusCode(), 200)
    assert.deepEqual(res7._getJSONData(), {options: ["MJ", "Kobe"],
     rounds: 1, 
    teamNames: ["Warriors", "Cavs"], pickOrder: ["MJ"]}); 

    const req8= httpMocks.createRequest(
      {method: 'GET', url: '/api/refresh', query: {id: "5"}}); 
    const res8 = httpMocks.createResponse();
    refreshServ(req8, res8);
    assert.strictEqual(res8._getStatusCode(), 200)
    assert.deepEqual(res8._getJSONData(), {options: ["one", "two", "three", "four", "five", "six"],
    rounds: 2, 
    teamNames: ["Kevin", "Steph"], pickOrder: ["three", "four"]}); 

    const req9= httpMocks.createRequest(
      {method: 'GET', url: '/api/refresh', query: {id: "4"}}); 
    const res9 = httpMocks.createResponse();
    refreshServ(req9, res9);
    assert.strictEqual(res9._getStatusCode(), 200)
    assert.deepEqual(res9._getJSONData(), {options: ["Steph", "Andre", "kyrie", "obj"],
      rounds: 2, 
    teamNames: ["Kevin", "Lebron"], pickOrder: []}); 

    const reqa= httpMocks.createRequest(
      {method: 'GET', url: '/api/refresh', query: {id: "2"}}); 
    const resa = httpMocks.createResponse();
    refreshServ(reqa, resa);
    assert.strictEqual(resa._getStatusCode(), 200)
    assert.deepEqual(resa._getJSONData(), {options: ["cow", "moo"],
     rounds: 1, 
    teamNames: ["ish", "ont"], pickOrder: []}); 
    
  });
});
