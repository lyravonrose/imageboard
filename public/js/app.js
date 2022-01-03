import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            heading: "PIXELS",
            show: true,
            images: [],
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
}).mount("#main");
