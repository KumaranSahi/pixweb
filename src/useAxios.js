import axios from 'axios';

axios.create({
    headers: {
        Authorization: "Bearer " + this.props.token
    },
    baseURL:""
})

