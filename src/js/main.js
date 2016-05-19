import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'
import iframeMessenger from 'guardian/iframe-messenger'
import swig from 'swig'




var shareFn = share('Brexit numbers game; how to draw opposite conclusions from the same data', 'http://gu.com/p/4jxfk','','', '');

export function init(el, context, config, mediator) {


    reqwest({
        url: 'https://interactive.guim.co.uk/docsdata-test/153byDXhhdV95xg8HCBejAFZrThPMrk2jD7gdhRlsGCA.json',
        type: 'json',
        crossOrigin: true,
        success: function (resp) {
            usedata(resp, el, config);
        }
    });

   
}

function usedata(resp, el, config) {
  //  var mainHTML3 = mainHTML.replace(/%assetPath%/g,config.assetPath);
    el.innerHTML = swig.render(mainHTML, { locals: { content: resp } });
    listenforresize(el);
     [].slice.apply(el.querySelectorAll('.interactive-share')).forEach(shareEl => {
        var network = shareEl.getAttribute('data-network');
        shareEl.addEventListener('click', () => shareFn(network));
    });
}



function listenforresize(el) {
    
                    var iframes = Array.prototype.slice.call(el.getElementsByTagName("iframe"));
//                    var iframeslist = iframes.array.prototype.slice();
                    
                    iframes.forEach(function(iframe) {
                        
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
                        
                        
                        
                    }, this);
                     
                    
}

iframeMessenger.enableAutoResize();