import { fetchLinks, fetchInvalidLinks } from "app/url-checker"

async function main() {
  const BASE_URL = 'https://vibefusion.be'
  const ROOT_URL = 'https://vibefusion.be'

  const urlsToCheck = await fetchLinks(ROOT_URL, BASE_URL)
  const invalidLinks = await fetchInvalidLinks(urlsToCheck)

  console.log(invalidLinks)
}

main()