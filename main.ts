// Fetches page content given a URL
const fetchPageContent = async (url: string): Promise<Document> => {
  const response = await fetch(url)
  const html = await response.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  return doc
}

// Updates the page content with the fetched content and scrolls to the target element if a hash is provided
const updatePageContent = (newContent: Document, hash?: string): void => {
  document.body.innerHTML = newContent.body.innerHTML
  document.title = newContent.title
  setEmailAddress()

  if (hash) {
    const targetElement = document.getElementById(hash.slice(1))
    if (targetElement) {
      targetElement.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  } else {
    window.scrollTo(0, 0)
  }
}

// Navigates to a given URL and updates the page content accordingly
const navigateTo = async (url: string, hash?: string): Promise<void> => {
  history.pushState(null, '', url)
  const newContent = await fetchPageContent(url)
  updatePageContent(newContent, hash)
}

// Finds the nearest anchor element in the DOM tree
const findNearestAnchor = (element: HTMLElement | null): HTMLAnchorElement | null => {
  while (element && element.tagName.toLowerCase() !== 'a') {
    element = element.parentElement
  }
  return element as HTMLAnchorElement | null
}

// Handles click events for navigation
const handleNavigationClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement
  const anchor = findNearestAnchor(target)

  if (anchor) {
    event.preventDefault()
    const href = anchor.href
    const url = new URL(href)
    navigateTo(url.pathname + url.search, url.hash)
  }
}

// Handles pop state events for browser back and forward navigation
const handlePopState = async (): Promise<void> => {
  const newContent = await fetchPageContent(location.href)
  updatePageContent(newContent, location.hash)
}

// Sets the email address on the page using JavaScript to make it harder for bots to scrape
const setEmailAddress = (): void => {
  const emailElement = document.getElementById('email')
  if (emailElement) {
    const user = 'kontakt'
    const domain = 'schulfrage.de'
    emailElement.textContent = `${user}@${domain}`
  }
}

// Event listeners for click and pop state events
document.addEventListener('click', handleNavigationClick)
window.addEventListener('popstate', handlePopState)

// Set email address on the page
setEmailAddress()
