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
    var topicsdiv = getdiv(topicsdiv, "topics");

    console.log(topicsdiv);
    for (var i = 0; i < topics.length; i++) {
        var topic = topics[i];

        var topicdiv = makediv(topic, "div", "topic", `topic ${i}`)

        topicdiv.innerHTML = `<h3>${topic.topicname}</h3><div class="statementswrapper"><span class="remain"><strong>Remain say:</strong> ${topic.remainstatement}</span><span class="leave"><strong>Leave say:</strong> ${topic.leavestatement}</span></div>`

        topicsdiv.appendChild(topicdiv);
        console.log(topic.analysis);

        if (topic.analysis) { addanalysis(topicdiv, topic) }

    }
}


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
