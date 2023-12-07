import { fetchLinks, fetchInvalidLinks } from "app/url-checker"

async function main() {
  const ROOT_URL = 'https://vibefusion.be'

  const urlsToCheck = await fetchLinks(ROOT_URL)
  const invalidLinks = await fetchInvalidLinks(urlsToCheck)

  console.log(invalidLinks)
}

main()