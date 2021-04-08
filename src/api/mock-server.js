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
            playList:Model
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
                    playlist:null,
                    description:faker.commerce.productDescription(),
                    recomended:faker.datatype.boolean()
                })
            ))
            server.create("playList",{
                id:faker.datatype.uuid(),
                name:"My Playlist",
                videos:[]
            })
        },
        routes(){
            this.namespace = "api";
            this.timing = 1000;
            this.get("/load-all-videos", schema=>schema.fullVideosLists.all());
            this.get("/load-all-playlists",  schema=>schema.playLists.all());
            
            this.post("/add-new-playlist", (schema,request)=>{
                let data = JSON.parse(request.requestBody)
                return schema.playLists.create({
                    ...data,
                    videos:[],
                    id:faker.datatype.uuid()
                })
            })

            this.post("/add-video-to-playlist", (schema,request)=>{
                let {playlistid,video:newVideo} = JSON.parse(request.requestBody)
                newVideo.playlist && schema.playLists.find(newVideo.playlist).update({videos:schema.playLists.find(newVideo.playlist).attrs.videos.length>0?schema.playLists.find(newVideo.playlist).attrs.videos.filter(video=>video.id!==newVideo.id):[]})
                schema.playLists.find(playlistid).update({videos:[...schema.playLists.find(playlistid).attrs.videos,newVideo]})
                schema.fullVideosLists.find(newVideo.id).update({playlist:playlistid})
                return new Response()
            })

            this.post("/remove-video-from-playlist",(schema,request)=>{
                let {playlistid,video} = JSON.parse(request.requestBody)
                schema.fullVideosLists.find(video.id).update({playlist:null})
                schema.playLists.find(playlistid).update({videos:schema.playLists.find(playlistid).attrs.videos.filter(playlistVideo=>playlistVideo.id!==video.id)})
            })
        }
    })
}