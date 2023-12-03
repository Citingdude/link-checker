import { parse } from 'node-html-parser';

async function main() {    
    const baseURL = 'https://vibefusion.be'

    const invalidLinks: string[] = []
    const urlsToCheck = new Set<string>()

    const links = await fetchLinks('https://vibefusion.be', baseURL)

    setLinksToCheck(links, urlsToCheck)

    checkLinks(urlsToCheck, invalidLinks)
    
    console.log(invalidLinks)
}



async function fetchLinks(url: string, baseURL: string) {
  const response = await fetch(url)
  const html = await response.text()
  const parsedHTML = parse(html)
  const links = parsedHTML.getElementsByTagName('a')

  return links.map((link) => {
    const href = link.getAttribute('href')
    const url = baseURL + href
    return url
  })
}

function setLinksToCheck(urls: string[], urlSet: Set<string>) {
  urls.forEach((url) => {
    urlSet.add(url)
  })    
}

async function checkLink(url: string) {
  console.log('Checking url: ' + url)
  const response = await fetch(url)
  return response.status === 200
}

async function checkLinks(urls: Set<string>, invalidLinks: string[]) {
  for (const url of urls) {
    try {
        const linkIsValid = await checkLink(url)

        if (!linkIsValid)
            invalidLinks.push(url)

    } catch (error) {
        invalidLinks.push(url)
    }
  }
}

main()