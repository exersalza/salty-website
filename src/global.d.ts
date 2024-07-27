declare global {
  namespace preact.JSX {
    interface HTMLAttributes {
      base?: HTMLDivElement,
    }
    interface EventTarget {
    }
  }
}

export {}
