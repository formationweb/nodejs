export class Post {
    title: string = ''
    body: string = ''
    id: number = 0
    userId: number = 0

    constructor(obj) {
        this.title = obj.title
        this.body = obj.body
        this.id = obj.id
        this.userId = obj.id
    }
}