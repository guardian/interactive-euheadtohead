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
    el.innerHTML = swig.render(mainHTML, { locals: { topics: topics } });
}
