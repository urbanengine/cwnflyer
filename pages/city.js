import fetch from "isomorphic-unfetch";
import Layout from "../components/Layout";
import Schedule from "../components/Schedule";

const City = props => (
    <Layout>
        <title>CoWorking Night Flyer</title>
        <Schedule message={props.message} cwn={props.cwn}></Schedule>
    </Layout>
);

City.getInitialProps = async function( context ) {
    // construct the url for the endpoint that will give us the schedule
    const endpoint = `${process.env.HOSTNAME}/api/v2/flyer/group/${context.query.groupId}`;
    const response = await fetch( endpoint, { headers: { 'Authorization': process.env.APIKEY } } );
    const json = await response.json();
    
    // JSON is a promise so you have to convert it to a string before you print it.
    //console.log( `response: ${JSON.stringify( json )}\n` );

    return {
        message: json.message,
        cwn:json.cwn
    };
};

export default City;
