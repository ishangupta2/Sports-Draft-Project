import express from "express";
import { Dummy, create, join, savePick,refreshServ} from './routes';
import bodyParser from 'body-parser';


// Configure and start the HTTP server.
const port = 8088;
const app = express();
app.use(bodyParser.json());
app.get("/api/dummy", Dummy);
app.post("/api/join", join);
app.post("/api/create", create)
app.post("/api/savePick", savePick)
app.get("/api/refresh", refreshServ)

app.listen(port, () => console.log(`Server listening on ${port}`));
