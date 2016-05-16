import costHTML from './../text/charts/cost.html!text'

export default function getGraph (graphid) {
//    console.log(eval(graphid));
    var requiredgraph = graphid + 'HTML';    
    return eval(requiredgraph);    
}