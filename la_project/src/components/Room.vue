<template>
  <div class="room card">
    <div class="card-header row">
      <div class="col-md-6 ">
        <h3 class="room-name">{{ roomData.name }}</h3>
      </div>
      <div class="col-md-6 d-flex flex-row-reverse">
        <button type="button" class="btn btn-warning p-2" @click="leaveRoom">Leave</button>
        <button class="btn btn-primary p-2" data-bs-toggle="collapse" :data-bs-target="'#CollapseRoom'+roomData.name" type="button" style="margin-right: 1ch;">Hide</button>
      </div>
    </div>
     <!-- aria-expanded="false" :aria-controls="'CollapseRoom'+roomData.roomName" -->
    <div class="collapse show" :id="'CollapseRoom'+roomData.name">
      <div class="card-body">
        <ul class="message-panel list-group" v-if="roomData.messages">
          <li class="message-item list-group-item" v-for="message in roomData.messages" v-bind:key="message">
            <div class="username text-break"><b>{{ message.name }}</b></div><div class="message text-break">{{ message.message }}</div>
          </li>
        </ul>
      </div>
      <div class="card-footer">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ user != null ? user.name : "" }}:</span>
          </div>
          <input type="text" class="form-control" placeholder="Enter message." aria-label="Recipient's username" aria-describedby="basic-addon1" v-model="chatMessage">
          <div class="input-group-append">
            <button class="btn btn-success" type="button" @click="sendChat">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WS from '../service/ws.js'

export default {
  name: 'Room',
  props: {
    roomData: Object,
    user: Object,
  },
  data() {
    return {
      chatMessage: "",
      connection: null
    }
  },
  methods: {
    sendChat(){
      if(this.connection != null){
        console.log(JSON.stringify(this.user));
        this.connection.send(JSON.stringify({type: "chat", content: {room: {id: this.roomData.id, name: this.roomData.name}, user: this.user, message: this.chatMessage}}));
        this.chatMessage = "";
      }
    },
    leaveRoom(){
      if(this.connection != null){
        this.connection.send(JSON.stringify({type: "leaveRoom", content: {room: {id: this.roomData.id, name: this.roomData.name }, user: this.user}}));
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
.room {
  background-color: #e7e9eb;
  margin-bottom: 1ch;
}
.message-panel {
 background-color: #f6f6f6;
 /*display: grid;*/
 /*grid-template-columns: 1fr;*/
 /*max-height: 30ch;*/
}
.room-name {
  text-align: left;
}
.message-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 0px;
  border-bottom-color: rgba(256,256,256,0.125);
  /*margin: 0px;*/
}
.username {
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
</style>
