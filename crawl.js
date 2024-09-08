const { url } = require('inspector');
const {JSDOM} = require('jsdom');

const crawlPage = async (currentURL) => {
    console.log(`Actively crawling: ${currentURL}`)

    try{

        const resp = await fetch(currentURL)

        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return;
        }
        
        const contentType = resp.headers.get('content-type')

        if(!contentType.includes('text/html')){
            console.log(`not html response, content type is: ${contentType} on page: ${currentURL}`)
            return;
        }

        console.log(await resp.text())

    }catch(err){
        console.log(`error in fetch ${err.message}, on page: ${currentURL}`)
    }
    
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []; 
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a');
    
    linkElements.forEach(link => {
        
        if(link.href.slice(0,1) === '/'){
            try{
                const urlObj = new URL(`${baseURL}${link.href}`)
                urls.push(urlObj.href)
            }catch(err){
                console.log(`error with relative url: ${err.message}`)
            }   
        }else{
            try{
                const urlObj = new URL(link.href)
                urls.push(urlObj.href)
            }catch(err){
                console.log(`error with absolute url: ${err.message}`)
            }   
        }     
    
    });

    return urls; 
}


function normalizeURL(urlString){
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1);
    }

    return hostPath;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}