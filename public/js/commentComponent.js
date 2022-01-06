const commentComponent = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },
    props: ["imageId"],
    mounted() {
        console.log("comment component just mounted");
        console.log("this.imageId: ", this.imageId);
        fetch(`/comments/${this.imageId}`)
            //GET request to retrieve all comments made about the image in the modal
            .then((res) => res.json())
            .then((result) => {
                console.log("get commentsresult: ", result);
                this.comments = result;
            })
            .catch((err) => {
                console.log("error: ", err);
            });
    },

    methods: {
        addComments() {
            console.log("Button clicked");
            console.log("This", this);
            fetch("/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageId: this.imageId,
                    comment: this.comment,
                    username: this.username,
                }),
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log("this.comments:", this.comments);
                    this.comments.unshift(result.data);
                })
                .catch((err) => {
                    console.log("error: ", err);
                });
        },
    },
    template: `
    <div>
        <form>
            <input v-model="comment" type="text" name="comment" placeholder="comment">
            <input v-model="username" type="text" name="username" placeholder="username">
            <button @click.prevent="addComments">Submit</button>
        </form>

        <hr />

        <ul>
            <li v-for="savedComment in comments">
                <strong>{{savedComment.username}}</strong>: {{savedComment.comment}} <i>(at {{savedComment.created_at}})</i>
            </li>
        </ul>
    </div>
    `,
};

export default commentComponent;
