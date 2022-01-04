import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            heading: "PIXELS",
            show: true,
            images: [],
            title: "",
            description: "",
            file: null,
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
                })
                .catch((err) => {
                    console.log("error: ", err);
                });
        },
        fileSelectHandler: function (e) {
            console.log("file selected: ", e);
            this.file = e.target.files[0];
        },
    },
}).mount("#main");
