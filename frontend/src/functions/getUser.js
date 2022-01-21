import axios from 'axios';

export const getUser = async (usr) => {
    const url = `${process.env.REACT_APP_URL_API}/${usr}`;
    const infoUserJSON = await axios.get(url);
    // console.log( infoUserJSON.data );
    return infoUserJSON.data;
}
