// A server backend for my simple react system monitor.
// Basically a simple express API

const express = require('express');
const cors = require('cors');
const si = require('systeminformation');
const app = express();

const port = process.env.PORT || 8000;

// Use CORS
app.use(cors());


// Fetch system data etc.
function getData(){
    
    si.cpuTemperature().then(tmp=> temp = tmp.main);
    si.mem().then(m => mem = {used: m.active, total: m.total}); 
    si.osInfo().then(os => osname = os.distro);

    try{
        content = {
            info: "Connected to: "+osname,
            cpuTemp: temp,
            memUsed: mem.used,
            memTotal: mem.total,
            uptime: si.time().uptime
        }


        return content;
    } catch(e){
        return null;
    }
}
// Handles connections
app.get('/', (req, res) => {
    content = getData();
    if(content == null)
        content = getData();
    
    res.send(content);
});

 app.listen(port, () => console.log(`API listening on port ${port}.`));
