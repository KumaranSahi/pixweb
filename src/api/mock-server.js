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
            playList:Model,
            history:Model
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
                    notes:[],
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
                schema.histories.find(newVideo.id).update({playlist:playlistid})
                return ({
                    fullVideosList:schema.fullVideosLists.all(),
                    playlist:schema.playLists.all(),
                    history:schema.histories.all()
                })
            })

            this.post("/remove-video-from-playlist",(schema,request)=>{
                let {playlistid,video} = JSON.parse(request.requestBody)
                schema.fullVideosLists.find(video.id).update({playlist:null})
                schema.playLists.find(playlistid).update({videos:schema.playLists.find(playlistid).attrs.videos.filter(playlistVideo=>playlistVideo.id!==video.id)})
                schema.histories.find(video.id).update({playlist:null})
                return ({
                    fullVideosList:schema.fullVideosLists.all(),
                    playlist:schema.playLists.all(),
                    history:schema.histories.all()
                })
            })

            this.delete("/delete-playlist",(schema,request)=>{
                let {queryParams}=request;
                schema.playLists.find(queryParams["0"]).attrs.videos.forEach(({id})=>{
                    schema.fullVideosLists.find(id).update({playlist:null})
                    schema.histories.find(id).update({playlist:null})
                })
                schema.playLists.find(queryParams["0"]).destroy()
                return ({
                    fullVideosList:schema.fullVideosLists.all(),
                    playlist:schema.playLists.all(),
                    history:schema.histories.all()
                })
            })

            this.post("/add-video-to-history",(schema,request)=>{
                let {newVideo} = JSON.parse(request.requestBody)
                schema.histories.create(newVideo)
                return schema.histories.all()
            })

            this.post("/add-note-to-video",(schema,request)=>{
                let {videoId,note}=JSON.parse(request.requestBody)
                schema.fullVideosLists.find(videoId).update({notes:[...schema.fullVideosLists.find(videoId).attrs.notes,note]})
                schema.histories.find(videoId).update({notes:[...schema.histories.find(videoId).attrs.notes,note]})
                let playlistId=schema.fullVideosLists.find(videoId).attrs.playlist;
                playlistId && schema.playLists.find(playlistId).update({videos:schema.playLists.find(playlistId).attrs.videos.map(item=>item.id===videoId?{...item,notes:[...item.notes,note]}:item)})
                return ({
                    fullVideosList:schema.fullVideosLists.all(),
                    playlist:schema.playLists.all(),
                    history:schema.histories.all()
                })
            })
        }
    })
}