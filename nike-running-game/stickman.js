import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const stickmanElem = document.querySelector("[data-stickman]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const STICKMAN_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let stickmanFrame
let currentFrameTime
let yVelocity
export function setupStickman() {
  isJumping = false
  stickmanFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(stickmanElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateStickman(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getStickmanRect() {
  return stickmanElem.getBoundingClientRect()
}

export function setStickmanLose() {
  stickmanElem.src = "images/stick-standing.png"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    stickmanElem.src = `images/stick-standing.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    stickmanFrame = (stickmanFrame + 1) % STICKMAN_FRAME_COUNT
    stickmanElem.src = `images/stick-running-${stickmanFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(stickmanElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(stickmanElem, "--bottom") <= 0) {
    setCustomProperty(stickmanElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}