import { parse } from 'node-html-parser';

async function main() {    
    const baseURL = 'https://vibefusion.be'
    const response = await fetch('https://vibefusion.be')

    const invalidLinks = []

    const html = await response.text()

    const parsedHTML = parse(html)
    const links = parsedHTML.getElementsByTagName('a')
    const urlsToCheck = new Set<string>()

    links.forEach(link => {
      const href = link.getAttribute('href')
      const url = baseURL + href

      urlsToCheck.add(url)
    });

    for (const url of urlsToCheck) {
      try {
          const linkIsValid = await checkLink(url)

          if (!linkIsValid)
              invalidLinks.push(url)

      } catch (error) {
          invalidLinks.push(url)
      }
    }
    
    console.log(invalidLinks)
}

async function checkLink(url: string) {
    console.log('Checking url: ' + url)
    const response = await fetch(url)
    return response.status === 200
}

main()