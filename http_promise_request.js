var https = require('https'); 
var jsdom = require('jsdom');
var //{ JSDOM } = jsdom;


function httpRequest(params, postData) {
    return new Promise(function(resolve, reject) {
        var req = https.request(params, function(res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function() {
                try {
                    body = Buffer.concat(body).toString();
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function(err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        // IMPORTANT
        req.end();
    });
}

var params = {
    host: 'twitter.com',
    port: 443,
    method: 'GET',
    path: '/android'
};
var params2 = {
    host: 'www.bing.com',
    port: 443,
    method: 'GET',
    path: '/'
};
// this is a get, so there's no post data

httpRequest(params).then(function(body) {
    console.log("STEP 1 -------------------");
    var dom = new JSDOM(body);
    var ab = dom.window.document.querySelector("data-count").textContenct;
    //var ab = body.split('data-nav="followers"');
    //var ac = ab[1].split('data-count=');
    //var ad = ac[1].split(' ');
    
    console.log(ab);
    //console.log(body.substring(1,100));
    return httpRequest(params2);
})
.then(function(body2) {
    console.log("STEP 2 -------------------");
    console.log(body2.substring(1,100));
})
.catch(function(err){
    console.log(err);
});


/*
<a class="ProfileNav-stat ProfileNav-stat--link u-borderUserColor u-textCenter js-tooltip js-openSignupDialog js-nonNavigable u-textUserColor" data-nav="followers" href="/JimCarrey/followers" data-original-title="17.960.782 follower">
          <span class="ProfileNav-label" aria-hidden="true">Follower</span>
            <span class="u-hiddenVisually">Follower</span>
          <span class="ProfileNav-value" data-count="17960782" data-is-compact="true">18&nbsp;Mln</span>
        </a>

*/