import {RestSerializer,createServer,Model} from 'miragejs';
import faker from 'faker'
import {basicCameraUsageData,cameraMaintainanceData,coolCameraTricksData,
    nightPhotographyData,compositionData,astroPhotographyData} from './initialData'

faker.seed(111);

export const PixWebServer=()=>{
    createServer({
        serializers: {
            application: RestSerializer
        },
        models: {
            fullVideosList:Model,
        },
        seeds(server){
            
            [...basicCameraUsageData,...cameraMaintainanceData,...coolCameraTricksData,
            ...nightPhotographyData,...compositionData,...astroPhotographyData]
            .forEach(({name,link,catagory,author,catagoryId})=>(
                server.create("fullVideosList",{
                    id:faker.datatype.uuid(),
                    name:name,
                    link:link,
                    catagory:catagory,
                    catagoryId:catagoryId,
                    author:author,
                    description:faker.commerce.productDescription(),
                    rating:faker.datatype.float({'min':3,'max':5}).toFixed(1),
                    recomended:faker.datatype.boolean()
                })
            ))
        },
        routes(){
            this.namespace = "api";
            this.timing = 1000;
            this.get("/load-all-videos", schema=>schema.fullVideosLists.all());
            
        }
    })
}