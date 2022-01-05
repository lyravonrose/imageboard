const modalComponent = {
    data() {
        return {
            heading: "Lyra",
            title: "",
            description: "",
            url: "",
        };
    },
    props: ["imageId"],
    mounted() {
        console.log("modal component just mounted");
        console.log("this.imageId: ", this.imageId);
    },
    methods: {
        //here do something about closing
        closeComponent() {
            this.$emit("close");
        },
    },

    template: `<div>
    <h2>{{heading}}'s collection</h2>
    <div>
    <img :src="url" :alt="title"> {{title}} | {{description}}</div>
    <h3 @click="closeComponent">X</h3>
    </div>`,
};

export default modalComponent;
