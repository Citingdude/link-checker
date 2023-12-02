import { parse } from 'node-html-parser';

async function main() {    
    const baseURL = 'https://vibefusion.be'
    const response = await fetch('https://vibefusion.be')

    const invalidLinks = []

    const html = await response.text()

    const parsedHTML = parse(html)
    const links = parsedHTML.getElementsByTagName('a')

    for (let index = 0; index < links.length; index++) {
        const link = links[index];

        const linkHref = link?.getAttribute('href')

        if (!linkHref)
            return

        const url = baseURL + linkHref

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