import asiaHTML from './../text/charts/asia.html!text'
import europeHTML from './../text/charts/europe.html!text'
import listpriceHTML from './../text/charts/listprice.html!text'
import rebatesHTML from './../text/charts/rebates.html!text'


export default function getGraph (graphid) {
//    console.log(eval(graphid));
    var requiredgraph = graphid + 'HTML';    
    return eval(requiredgraph);    
}