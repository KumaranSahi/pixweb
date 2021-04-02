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
            basicCameraUsage:Model,
            cameraMaintaince:Model,
            coolCameraTrick:Model,
            nightPhotography:Model,
            composition:Model,
            astroPhotography:Model
        },
        seeds(server){
            basicCameraUsageData.forEach(({name,link,catagory,author})=>(
                server.create("basicCameraUsage",{
                    id:faker.datatype.uuid(),
                    name:name,
                    link:link,
                    catagory:catagory,
                    author:author,
                    description:faker.commerce.productDescription(),
                    rating:faker.datatype.float({'min':3,'max':5}).toFixed(1),
                    recomended:faker.datatype.boolean()
                })
            ))
            cameraMaintainanceData.forEach(({name,link,catagory,author})=>(
                server.create("cameraMaintaince",{
                    id:faker.datatype.uuid(),
                    name:name,
                    link:link,
                    catagory:catagory,
                    author:author,
                    description:faker.commerce.productDescription(),
                    rating:faker.datatype.float({'min':3,'max':5}).toFixed(1),
                    recomended:faker.datatype.boolean()
                })
            ))
            coolCameraTricksData.forEach(({name,link,catagory,author})=>(
                server.create("coolCameraTrick",{
                    id:faker.datatype.uuid(),
                    name:name,
                    link:link,
                    catagory:catagory,
                    author:author,
                    description:faker.commerce.productDescription(),
                    rating:faker.datatype.float({'min':3,'max':5}).toFixed(1),
                    recomended:faker.datatype.boolean()
                })
            ))
            nightPhotographyData.forEach(({name,link,catagory,author})=>(
                server.create("nightPhotography",{
                    id:faker.datatype.uuid(),
                    name:name,
                    link:link,
                    catagory:catagory,
                    author:author,
                    description:faker.commerce.productDescription(),
                    rating:faker.datatype.float({'min':3,'max':5}).toFixed(1),
                    recomended:faker.datatype.boolean()
                })
            ))
            compositionData.forEach(({name,link,catagory,author})=>(
                server.create("composition",{
                    id:faker.datatype.uuid(),
                    name:name,
                    link:link,
                    catagory:catagory,
                    author:author,
                    description:faker.commerce.productDescription(),
                    rating:faker.datatype.float({'min':3,'max':5}).toFixed(1),
                    recomended:faker.datatype.boolean()
                })
            ))
            astroPhotographyData.forEach(({name,link,catagory,author})=>(
                server.create("astroPhotography",{
                    id:faker.datatype.uuid(),
                    name:name,
                    link:link,
                    catagory:catagory,
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
            this.get("/basic-camera-usage", schema=>schema.basicCameraUsages.all());
            this.get("/camera-maintainance", schema=>schema.cameraMaintainces.all());
            this.get("/cool-camera-tricks", schema=>schema.coolCameraTricks.all());
            this.get("/night-photography", schema=>schema.nightPhotographies.all())
            this.get("/composition", schema=>schema.compositions.all())
            this.get("/astro-photography", schema=>schema.astroPhotographies.all())
        }
    })
}