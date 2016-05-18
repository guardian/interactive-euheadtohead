import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'
import swig from 'swig'

var topicid;

function getParameterByName( name ) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
     return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

window.init = function init(el, config) {
    var options = getParameterByName("topicid"); 
       reqwest({
        url: 'https://interactive.guim.co.uk/docsdata-test/153byDXhhdV95xg8HCBejAFZrThPMrk2jD7gdhRlsGCA.json',
        type: 'json',
        crossOrigin: true,
        success: function(resp) {
            usedata(resp, el, options);
        }
    });
       iframeMessenger.enableAutoResize();
 
};


function usedata(resp,el,options) {
   var matchingtopic;
   resp.topics.forEach(function(topic) {
    if (topic.topicname == options) {
        console.log(topic);
        matchingtopic = topic;
    }        
    }, this);
    console.dir(matchingtopic);
  el.innerHTML = swig.render(embedHTML, { locals: { topic: matchingtopic } });

}

