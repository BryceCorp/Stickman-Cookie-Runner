import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const COOKIE_INTERVAL_MIN = 500
const COOKIE_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextCookieTime
export function setupCookie() {
  nextCookieTime = COOKIE_INTERVAL_MIN
  document.querySelectorAll("[data-cookie]").forEach(cookie => {
    cookie.remove()
  })
}

export function updateCookie(delta, speedScale) {
  document.querySelectorAll("[data-cookie]").forEach(cookie => {
    incrementCustomProperty(cookie, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(cookie, "--left") <= -100) {
      cookie.remove()
    }
  })

  if (nextCookieTime <= 0) {
    createCookie()
    nextCookieTime =
      randomNumberBetween(COOKIE_INTERVAL_MIN, COOKIE_INTERVAL_MAX) / speedScale
  }
  nextCookieTime -= delta
}

export function getCookieRects() {
  return [...document.querySelectorAll("[data-cookie]")].map(cookie => {
    return cookie.getBoundingClientRect()
  })
}

function createCookie() {
  const cookie = document.createElement("img")
  cookie.dataset.cookie = true
  cookie.src = "images/cookie.png"
  cookie.classList.add("cookie")
  setCustomProperty(cookie, "--left", 100)
  worldElem.append(cookie)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}