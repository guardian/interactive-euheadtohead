import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'

var topicid;

window.init = function init(el, config) {
    iframeMessenger.enableAutoResize();
    var options = getParameterByName("topicid"); 
    console.log(options);

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


    
    
}

function getParameterByName( name ) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
     return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}