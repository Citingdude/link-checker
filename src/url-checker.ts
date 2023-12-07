import { parse } from 'node-html-parser';

export async function fetchLinks(url: string, baseURL: string) {
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

async function validateLink(url: string) {
  console.log('Checking url: ' + url)
  const response = await fetch(url)
  return response.status === 200
}

export async function validateLinks(urls: Set<string>) {
  const invalidLinks: string[] = []

  for (const url of urls) {
    try {
      const linkIsValid = await validateLink(url)

      if (!linkIsValid)
        invalidLinks.push(url)

    } catch (error) {
      invalidLinks.push(url)
    }
  }

  return invalidLinks
}