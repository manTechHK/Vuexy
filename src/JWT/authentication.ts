import axios from "axios"


const loginAuth = async (identifier: string, password: string) => {
    // console.log(identifier)
    // console.log(password)
    
    var response = await axios({
        method: 'post',
        url:    'https://strapi11.svr.up5d.com/api/auth/local',
        data:   {
            identifier,
            password,
        },
    })
    
    return response.data.jwt
}

export default loginAuth;