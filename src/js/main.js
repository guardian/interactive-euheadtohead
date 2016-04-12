import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'
import topicHTML from './text/topic.html!text'
var data;
import iframeMessenger from 'guardian/iframe-messenger';

var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');


export function init(el, context, config, mediator) {
    el.innerHTML = mainHTML.replace(/%assetPath%/g, config.assetPath);

    reqwest({
        url: 'http://interactive.guim.co.uk/docsdata-test/1ZstSkj9MqXTlxTxNfcZ6rvvvDxMOAG-pt0eWS5b-TBw.json',
        type: 'json',
        crossOrigin: true,
        success: function(resp) {
            usedata(resp, el);
        }
    });

    [].slice.apply(el.querySelectorAll('.interactive-share')).forEach(shareEl => {
        var network = shareEl.getAttribute('data-network');
        shareEl.addEventListener('click', () => shareFn(network));
    });
}

function getdiv(varname, id) {
    var varname = document.getElementById(id);
    return varname;
}

function makediv(varname, tagname, classname, id) {
    var varname = document.createElement(tagname);
    varname.id = id;
    varname.className = classname;
    return varname;
}


function usedata(resp, el) {

    var topics = resp.topics;
    
    var topicsdiv = document.getElementById("topics");

    for (var i = 0; i < topics.length; i++) {
    
    var t = topics[i];
    var tdiv = document.createElement("div");
    tdiv.innerHTML = topicHTML;
    tdiv.innerHTML = tdiv.innerHTML.replace(/{{topicname}}/g,t.topicname)
    .replace("{{remainstatement}}",t.remainstatement)
    .replace("{{leavestatement}}",t.leavestatement)
    .replace("{{analysis}}",t.analysis);
    
    if (t.remaintoggle != undefined) {
    tdiv.innerHTML = tdiv.innerHTML.replace("{{remaintoggle}}",t.remaintoggle)
    .replace("{{leavetoggle}}",t.leavetoggle)
    .replace("{{iframesource}}",t.remaingraph);
   
    }
    
    topicsdiv.appendChild(tdiv);  
    startlistening(tdiv,t);
     listenforresize(tdiv,t);
    }
}

function listenforresize(tdiv,t) {
    
                    var iframe = document.getElementById(`graph-${t.topicname}`);
                     
                    window.addEventListener('message', function(event) {
                    if (event.source !== iframe.contentWindow) {
                        return;
                    }

                    // IE 8 + 9 only support strings
                    var message = JSON.parse(event.data);

                    // Actions
                    switch (message.type) {
                        case 'set-height':
                            iframe.height = message.value;
                            break;
                        case 'navigate':
                            document.location.href = message.value;
                            break;
                        case 'scroll-to':
                            window.scrollTo(message.x, message.y);
                            break;
                        case 'get-location':
                            _postMessage({
                                'id':       message.id,
                                'type':     message.type,
                                'hash':     window.location.hash,
                                'host':     window.location.host,
                                'hostname': window.location.hostname,
                                'href':     window.location.href,
                                'origin':   window.location.origin,
                                'pathname': window.location.pathname,
                                'port':     window.location.port,
                                'protocol': window.location.protocol,
                                'search':   window.location.search
                            }, message.id);
                            break;
                        case 'get-position':
                            _postMessage({
                                'id':           message.id,
                                'type':         message.type,
                                'iframeTop':    iframe.getBoundingClientRect().top,
                                'innerHeight':  window.innerHeight,
                                'innerWidth':   window.innerWidth,
                                'pageYOffset':  window.pageYOffset
                            });
                            break;
                        default:
                        //   console.error('Received unknown action from iframe: ', message);
                    }
                }, false);
}

function startlistening(tdiv,t) {
    
    var leavetoggle = document.getElementById(`leavetoggle-${t.topicname}`);
    var remaintoggle = document.getElementById(`remaintoggle-${t.topicname}`);
    var graphdiv = document.getElementById(`graph-${t.topicname}`);
    leavetoggle.addEventListener("click", function(){
        graphdiv.src = t.leavegraph;   
    })
    remaintoggle.addEventListener("click", function(){
        graphdiv.src = t.remaingraph;   
    })
}

iframeMessenger.enableAutoResize();
