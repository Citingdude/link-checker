import { parse } from 'node-html-parser';

async function main() {
  const BASE_URL = 'https://vibefusion.be'
  const URL_TO_CHECK = 'https://vibefusion.be'

  const baseURL = BASE_URL
  const links = await fetchLinks(URL_TO_CHECK, baseURL)
  const urlsToCheck = new Set([...getLinksToCheck(links)])
  const invalidLinks = await checkLinks(urlsToCheck)

  console.log(invalidLinks)
}

async function fetchLinks(url: string, baseURL: string) {
  const response = await fetch(url)
  const html = await response.text()
  const parsedHTML = parse(html)
  const links = parsedHTML.getElementsByTagName('a')
  const urls: string[] = []

  for (let index = 0; index < links.length; index++) {
    const link = links[index];
    const href = link?.getAttribute('href')
    const url = baseURL + href

    urls.push(url)
  }

  return urls
}

function getLinksToCheck(urls: string[]) {
  const urlSet = new Set<string>()

  urls.forEach((url) => {
    urlSet.add(url)
  })

  return urlSet
}

async function checkLink(url: string) {
  console.log('Checking url: ' + url)
  const response = await fetch(url)
  return response.status === 200
}

async function checkLinks(urls: Set<string>) {
  const invalidLinks: string[] = []

  for (const url of urls) {
    try {
      const linkIsValid = await checkLink(url)

      if (!linkIsValid)
        invalidLinks.push(url)

    } catch (error) {
      invalidLinks.push(url)
    }
  }

  return invalidLinks
}

main()