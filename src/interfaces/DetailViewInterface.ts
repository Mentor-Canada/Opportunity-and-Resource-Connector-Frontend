export const mixin = {
  methods: {
    save(): void {
      this.item.save()
        .then(() => {
          this.router.push(this.parentUrl)
        })
    },
    remove(): void {
      this.item.remove()
        .then(() => {
          this.router.push(this.parentUrl)
        })
    }
  }
}

export interface data {
  item: EntityInterface
  title: string
  parentUrl: string
}
