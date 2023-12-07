import { fetchLinks, validateLinks } from "./url-checker"

async function main() {
  const BASE_URL = 'https://vibefusion.be'
  const URL_TO_CHECK = 'https://vibefusion.be'

  const urlsToCheck = await fetchLinks(URL_TO_CHECK, BASE_URL)
  const invalidLinks = await validateLinks(urlsToCheck)

  console.log(invalidLinks)
}

main()