import * as Vue from "./vue.js";
import modalComponent from "./modalComponent.js";

Vue.createApp({
    data() {
        return {
            heading: "Lyra",
            show: true,
            images: [],
            title: "",
            description: "",
            file: null,
            username: "",
            imageSelected: false,
            comments: "",
            isThereMoreImages: true,
            //values in state
        };
    },
    mounted() {
        console.log("app.js just mounted");
        fetch("/get-images")
            .then((resp) => resp.json())
            .then((data) => {
                this.images = data;
            });
    },
    components: {
        "modal-component": modalComponent,
    },
    methods: {
        clickHandler: function () {
            console.log("this: ", this);
            const fd = new FormData();
            fd.append("title", this.title);
            fd.append("description", this.description);
            fd.append("username", this.username);
            fd.append("file", this.file);
            fetch("/upload", {
                method: "POST",
                body: fd,
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log("result: ", result);
                    this.images.unshift(result.data);
                })

                .catch((err) => {
                    console.log("error: ", err);
                });
        },
        fileSelectHandler: function (e) {
            console.log("file selected: ", e);
            this.file = e.target.files[0];
        },
        selectImage(clickedId) {
            console.log("image clicked with id:", clickedId);
            this.imageSelected = clickedId;
        },
        closeComponent() {
            console.log("the component has emitted that it should be closed");
            this.imageSelected = false;
        },
        getComments(imageId) {
            console.log("image clicked with id:", imageId);
            this.imageSelected = imageId;
        },
        getMoreImages() {
            console.log("get more images");
            fetch(`/get-more-images/${this.images[this.images.length - 1].id}`)
                .then((res) => res.json())
                .then((result) => {
                    if (result[result.length - 1].id === 1) {
                        this.isThereMoreImages = false;
                    }
                    this.images = [...this.images, ...result];
                })
                .catch((err) =>
                    console.log("error while fetching more images:", err)
                );
        },
    },
}).mount("#main");
