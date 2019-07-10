const cookie = {
  read(name: string): string | null {
    const reg = `(^|;\\s*)(${name})=([^;]*)`
    const match = document.cookie.match(new RegExp(reg))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
