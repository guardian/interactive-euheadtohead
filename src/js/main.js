import reqwest from 'reqwest'
//import require from 'npm:requirejs'
import mainHTML from './text/main.html!text'
import share from './lib/share'
import topicHTML from './text/topic.html!text'
var data;
import iframeMessenger from 'guardian/iframe-messenger'
import getGraph from './lib/graph'

var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');


function navlistener() {
    var topiclist = document.getElementById("topiclist");
    var topicitems =  Array.prototype.slice.call(topiclist.childNodes);
    topicitems.forEach(function(tn) {
     //   console.log(tn);
        tn.addEventListener("click",function (){highlightTopic(tn.id)});
    }, this);
    
   }

function highlightTopic(id) {
    console.log(id);
    var grab = document.getElementById(`topic-${id}`);
    console.log(grab);
    var highlightdiv = document.getElementById("highlighted");
    highlighted.innerHTML = grab.innerHTML;
}

export function init(el, context, config, mediator) {
    el.innerHTML = mainHTML.replace(/%assetPath%/g, config.assetPath);

    reqwest({
        url: 'https://interactive.guim.co.uk/docsdata-test/153byDXhhdV95xg8HCBejAFZrThPMrk2jD7gdhRlsGCA.json',
        type: 'json',
        crossOrigin: true,
        success: function (resp) {
            usedata(resp, el, config);
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


function usedata(resp,el,config) {

    var topics = resp.topics;

    var topicsdiv = document.getElementById("topics");

    for (var i = 0; i < topics.length; i++) {

        var t = topics[i];
        var topiclist = document.getElementById("topiclist");
        var tnav = document.createElement("a");
        tnav.innerHTML = `${t.topicname} `;
        tnav.id = t.topicname;
        topiclist.appendChild(tnav);


        var tdiv = document.createElement("div");
        tdiv.innerHTML = topicHTML;
        tdiv.innerHTML = tdiv.innerHTML.replace(/{{topicname}}/g, t.topicname)
            .replace("{{remainstatement}}", t.remainstatement)
            .replace("{{leavestatement}}", t.leavestatement)
            .replace("{{analysis}}", t.analysis);

        topicsdiv.appendChild(tdiv);
        pullInGraph(tdiv,t,config);
  
   }
    scrollListener(topicsdiv);
    navlistener();
}

function scrollListener(topicsdiv) {
    window.onscroll = function() {
    var port = window.innerHeight;
   
            // get offset for each topic
    var tdivs = Array.prototype.slice.call(document.querySelectorAll("div.graphwrapper"));
    
    tdivs.forEach(function(tdiv) {
       var divbefore = tdiv.querySelector("div.before");
       var divafter = tdiv.querySelector("div.after");
       
       
       var offset = divbefore.getBoundingClientRect().top;
       var graphheight = divbefore.getBoundingClientRect().height;
       if (  offset < ((port/2) - (graphheight/2))  && divbefore.className == "graph before active" ) {
            // switch classes on visible topic
       divbefore.className = "graph before inactive";
       divafter.className = "graph after active" ;
       
       }   else if (  offset > ((port/2) - (graphheight/2))   ){
            
       divbefore.className = "graph before active";
       divafter.className = "graph after inactive" ;
              
          }
    }, this)
    }
}
    

function pullInGraph(tdiv,t,config) {
    var graph1HTML = getGraph(t.graphone);
    var graph2HTML = getGraph(t.graphtwo);
    var graphdiv1 = document.getElementById(`${t.topicname}one`);
    var graphdiv2 = document.getElementById(`${t.topicname}two`);
    var graphheading1 = document.getElementById(`${t.topicname}headingone`);
    var graphheading2 = document.getElementById(`${t.topicname}headingtwo`);
    graphdiv1.innerHTML = graph1HTML;
    graphdiv2.innerHTML = graph2HTML;
    graphheading1.innerHTML = graphheading1.innerHTML.replace('-',t.graphonetitle);
    graphheading2.innerHTML = graphheading2.innerHTML.replace('-',t.graphtwotitle);
}


/*
function startlistening(tdiv, t) {

    var leavetoggle = document.getElementById(`leavetoggle-${t.topicname}`);
    var remaintoggle = document.getElementById(`remaintoggle-${t.topicname}`);
    var graphdiv = document.getElementById(`graph-${t.topicname}`);
    leavetoggle.addEventListener("click", function () {
        graphdiv.src = t.leavegraph;
    })
    remaintoggle.addEventListener("click", function () {
        graphdiv.src = t.remaingraph;
    })
}

*/