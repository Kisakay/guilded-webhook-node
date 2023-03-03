const superagent = require('superagent')
module.exports = (hookURL, payload) => new Promise((resolve, reject) => {

    superagent
        .post(hookURL)
        .send(JSON.stringify(payload))
        .set('application', 'json')
        .end((err, res) => { 
            if(res.statusMessage == "OK") resolve(res)
            if(err) { reject(err) }
        })
});
