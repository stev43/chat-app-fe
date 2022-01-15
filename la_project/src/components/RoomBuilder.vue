<template>
  <div class="roomBuilder card">
    <div class="card-header marginless row">
      <div class="col-md-6 ">
        <h3 class="roomBuilder-name">Create Room</h3>
      </div>
      <div class="col-md-6 d-flex flex-row-reverse">
        <button class="btn btn-primary p-2" data-bs-toggle="collapse" data-bs-target="#CollapseRoomBuilder" type="button" style="margin-right: 1ch;">Hide</button>
      </div>
    </div>
     <!-- aria-expanded="false" :aria-controls="'CollapseRoom'+roomData.roomName" -->
    <div class="collapse show" id="CollapseRoomBuilder">
      <div class="card-body">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Room name: </span>
          </div>
          <input type="text" class="form-control" :disabled="user==null" placeholder="Enter name" aria-label="New name" aria-describedby="basic-addon1" v-model="roomName">
          <div class="input-group-append">
            <button class="btn btn-success" type="button" :disabled="user==null" @click="createRoom">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WS from '../service/ws.js'

export default {
  name: 'RoomBuilder',
  props: {
    user: Object,
  },
  data() {
    return {
      roomName: "",
      connection: null
    }
  },
  methods: {
    createRoom(){
      if(this.connection != null){
        this.connection.send(JSON.stringify({type: "createRoom", content: {user: this.user, room: {name: this.roomName}}}));
        this.roomName = "";
      }
    },
  },
  mounted: function(){
      this.connection = WS;
    //   this.connection.onmessage = (event) => {
    //     // Vue data binding means you don't need any extra work to
    //     // update your UI. Just set the `time` and Vue will automatically
    //     // update the `<h2>`.
    //     // this.time = event.data;
    //     console.log(event);
    //     let response = JSON.parse(event.data);
    //     console.log(response);
    //     if(response.type == "chatMessage" && response.content.room.id == this.roomData.id){
    //       console.log("chatMessage");
    //       this.onMessage(response.content.message);
    //     } else if(response.type == "refreshMessages" && response.content.room.id == this.roomData.id){
    //       console.log("refreshMessages");
    //       this.onMessages(response.content.messages);
    //     }
    //   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.roomBuilder {
  background-color: #e7e9eb;
  margin-bottom: 1ch;
  margin-left: calc(-0.5 * var(--bs-gutter-x));
  margin-right: calc(-1 * var(--bs-gutter-x));
}
.message-panel {
 background-color: #f6f6f6;
 /*display: grid;*/
 /*grid-template-columns: 1fr;*/
 /*max-height: 30ch;*/
}
.roomBuilder-name {
  text-align: left;
}
.message-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 0px;
  border-bottom-color: rgba(256,256,256,0.125);
  /*margin: 0px;*/
}
.roomname {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  /*border-right: 1px;
  border-right-style: solid;
  border-right-color: #c9c1d5;*/
  grid-column: 1/4;
  background-color: #f7f7f9;
}
.message {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  grid-column: 4 / 16;
  text-align: left;
}
.marginless {
  margin-left: 0pt;
  margin-right: 0pt;
}
</style>
