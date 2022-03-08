export default class RequestQueue {

  loading: boolean = false
  queue: boolean = false

  callback: () => void

  begin(callback: () => void = null) {
    if(callback) {
      this.callback = callback
    }
    if(this.loading) {
      this.queue = true
    }
    else {
      this.loading = true
      this.callback()
    }
  }

  end() {
    if(this.queue) {
      this.queue = false
      this.callback()
    }
    else {
      this.queue = false
      this.loading = false
    }
  }

}