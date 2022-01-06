import commentComponent from "./commentComponent.js";

const modalComponent = {
    data() {
        return {
            id: "",
            heading: "Lyra",
            title: "",
            description: "",
            url: "",
            username: "",
            created_at: "",
        };
    },
    props: ["imageId"],
    mounted() {
        console.log("modal component just mounted");
        console.log("this.imageId: ", this.imageId);
        fetch(`/getImageById/${this.imageId}`)
            .then((res) => res.json())
            .then((result) => {
                console.log("result: ", result);
                this.url = result.url;
                this.title = result.title;
                this.description = result.description;
                this.username = result.username;
                this.created_at = result.created_at;
                this.id = result.id;
            })
            .catch((err) => {
                console.log("error: ", err);
            });
    },
    components: {
        "comment-component": commentComponent,
    },
    methods: {
        closeComponent() {
            this.$emit("close");
        },
    },

    template: `<div class="modal">
    <h2>{{heading}}'s collection</h2>
    <div>
    <img :src="url" :alt="title"><br> {{title}} | {{description}} | By {{username}} <br><br> Posted at {{created_at}}</div>
    <h3 @click="closeComponent">X</h3>
    <comment-component v-if="id" :image-id="imageId"></comment-component>
    </div>`,
};

export default modalComponent;
