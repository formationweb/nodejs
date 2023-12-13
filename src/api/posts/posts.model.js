export class Post {
    constructor(postData) {
        this.id = postData.id
        this.userId = postData.userId
        this.title = postData.title
        this.body = postData.body
    }

    save(obj) {
        console.log('sauvegarde')
    }
}