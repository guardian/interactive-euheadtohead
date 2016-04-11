import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'
import topicHTML from './text/topic.html!text'
var data;

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
    
    if (t.remaintoggle) {
    tdiv.innerHTML = tdiv.innerHTML.replace("{{remaintoggle}}",t.remaintoggle)
    .replace("{{leavetoggle}}",t.leavetoggle);
    }
    
    topicsdiv.appendChild(tdiv);  
    startlistening(tdiv,t)
    // give ids to toggles and graphs?
    // call toggle listener

    }
}

function startlistening(tdiv,t) {
    
    var leavetoggle = document.getElementById(`leavetoggle-${t.topicname}`);
    var remaintoggle = document.getElementById(`remaintoggle-${t.topicname}`);
    var graphdiv = document.getElementById(`graph-${t.topicname}`);
    console.log(graphdiv);
    leavetoggle.addEventListener("click", function(){
        graphdiv.style.height = "700px";
        graphdiv.src = t.leavegraph;   
    })
    remaintoggle.addEventListener("click", function(){
        graphdiv.style.height = "700px";
        graphdiv.src = t.remaingraph;   
    })
}


/* 

function listentoleavetoggle(leavetogglediv, topicdiv, graphdiv, topic) {
    leavetogglediv.addEventListener("click", function() {
        // console.log(topic.remaingraph);
        graphdiv.style.height = "700px";
        graphdiv.src = topic.leavegraph;
        console.log(graphdiv.src);
    })
};


*/

function addanalysis(topicdiv, topic) {

    var analysisdiv = makediv(analysisdiv, "div", "analysis", topic.topicname);
    analysisdiv.innerHTML = `<strong>Analysis:</strong> ${topic.analysis}`;
    topicdiv.appendChild(analysisdiv);
    if (topic.remaingraph) {
        addgraphs(topicdiv, topic);
    }

}

function addgraphs(topicdiv, topic) {
    var graphwrapper = makediv(graphwrapper, "div", "graphwrapper", topic.topicname + "graphs");
    var remaintogglediv = makediv(remaintogglediv, "div", "toggle", topic.topicname);
    var leavetogglediv = makediv(leavetogglediv, "div", "toggle", topic.topicname);
    var graphdiv = makediv(graphdiv, "iframe", "graph", topic.topicnamegraph);
    remaintogglediv.innerHTML = topic.remaintoggle;
    leavetogglediv.innerHTML = topic.leavetoggle;

    topicdiv.appendChild(remaintogglediv);
    topicdiv.appendChild(leavetogglediv);

    topicdiv.appendChild(graphwrapper);
    topicdiv.appendChild(graphdiv);
    listentoleavetoggle(leavetogglediv, topicdiv, graphdiv, topic);
    listentoremaintoggle(remaintogglediv, topicdiv, graphdiv, topic);
}

function listentoremaintoggle(remaintogglediv, topicdiv, graphdiv, topic) {
    remaintogglediv.addEventListener("click", function() {
        // console.log(topic.remaingraph);
        graphdiv.style.height = "550px";
        graphdiv.src = topic.remaingraph;
        console.log(graphdiv.src);
    })
};

function listentoleavetoggle(leavetogglediv, topicdiv, graphdiv, topic) {
    leavetogglediv.addEventListener("click", function() {
        // console.log(topic.remaingraph);
        graphdiv.style.height = "700px";
        graphdiv.src = topic.leavegraph;
        console.log(graphdiv.src);
    })
};
