import reqwest from 'reqwest'
//import require from 'npm:requirejs'
import mainHTML from './text/main.html!text'
import share from './lib/share'
import topicHTML from './text/topic.html!text'
var data;
import iframeMessenger from 'guardian/iframe-messenger'
import getGraph from './lib/graph'
import swig from 'swig'


var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');

export function init(el, context, config, mediator) {


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

function usedata(resp, el, config) {
    var topics = resp.topics;

    topics.forEach(function (t) {
        pullInGraph(t);
    }, this);

    el.innerHTML = swig.render(mainHTML, { locals: { topics: topics } });
    scrollListener();
}

function scrollListener() {
    window.onscroll = function () {
        var port = window.innerHeight;

        // get offset for each topic
        var tdivs = Array.prototype.slice.call(document.querySelectorAll("div.graphwrapper"));

        tdivs.forEach(function (tdiv) {
            var divbefore = tdiv.querySelector("div.before");
            var divafter = tdiv.querySelector("div.after");


            var offset = divbefore.getBoundingClientRect().top;
            var graphheight = divbefore.getBoundingClientRect().height;
            if (offset < ((port / 2) - (graphheight / 2)) && divbefore.className == "graph before active") {
                // switch classes on visible topic
                divbefore.className = "graph before inactive";
                divafter.className = "graph after active";

            } else if (offset > ((port / 2) - (graphheight / 2))) {

                divbefore.className = "graph before active";
                divafter.className = "graph after inactive";

            }
        }, this)
    }
}


function pullInGraph(t) {
    t.graph1HTML = getGraph(t.graphone);
    t.graph2HTML = getGraph(t.graphtwo);
}