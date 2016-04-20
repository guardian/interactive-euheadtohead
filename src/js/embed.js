import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'

var topicid;

window.init = function init(el, config) {
    iframeMessenger.enableAutoResize();
    var options = getParameterByName("topicid"); 
   
    el.innerHTML = embedHTML;

       reqwest({
        url: 'http://interactive.guim.co.uk/docsdata-test/1ZstSkj9MqXTlxTxNfcZ6rvvvDxMOAG-pt0eWS5b-TBw.json',
        type: 'json',
        crossOrigin: true,
        success: function(resp) {
            usedata(resp, el, options);
        }
    });
};


function usedata(resp,el,options) {
    var selldiv = document.getElementById("sell");
    var topics = resp.topics;
    topics.forEach(function(t) {
        if (t.topicname == options) {
            console.log(t.topicname)
            console.log(document);
            selldiv.innerHTML = t.topicsell;
        }
    }, this);
    
}

function getParameterByName( name ) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
     return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}