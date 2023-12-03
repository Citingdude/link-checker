import { parse } from 'node-html-parser';

async function main() {
  const BASE_URL = 'https://vibefusion.be'
  const URL_TO_CHECK = 'https://vibefusion.be'

  const baseURL = BASE_URL
  const urlsToCheck = await fetchLinks(URL_TO_CHECK, baseURL)
  const invalidLinks = await checkLinks(urlsToCheck)

  console.log(invalidLinks)
}

async function fetchLinks(url: string, baseURL: string) {
  try {
    const response = await fetch(url)
    const text = await response.text()
    const html = parse(text)
    const links = html.getElementsByTagName('a')
    const urls = new Set<string>()

    for (let index = 0; index < links.length; index++) {
      const link = links[index];
      const href = link?.getAttribute('href')
      if (href?.includes('http'))
        continue
      const url = baseURL + href

      urls.add(url)
    }

    for (const url of urls) {
      try {
        const response = await fetch(url)
        const text = await response.text()
        const html = parse(text)
        const links = html.getElementsByTagName('a')

        links.forEach(link => {
          const href = link.getAttribute('href')
          if (href?.includes('http'))
            return
          const url = baseURL + href
          urls.add(url)
        });

      } catch (error) {

      }
    }

    return urls
  } catch (error) {
    return new Set<string>()
  }

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