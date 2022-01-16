<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 row">
        <div class="col-md-6">
          <User :user="user"/>
        </div>
        <div class="col-md-6">
          <RoomBuilder :user="user"/>
        </div>
      </div>
      <div class="col-md-12">
        <RoomList :rooms="rooms" :user="user" :availableRooms="availableRooms"/>
      </div>
      <div class="rooms col-md-12 row">
        <div class="col-md-12">
          <h1>Rooms</h1>
          <hr>
        </div>
        <div class="col-md-6" v-for="roomData in rooms" v-bind:key="roomData">
          <Room :roomData="roomData" :user="user"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Room from './components/Room.vue'
import RoomBuilder from './components/RoomBuilder.vue'
import RoomList from './components/RoomList.vue'
import User from './components/User.vue'
import WS from './service/ws.js'

export default {
  name: 'App',
  components: {
    Room,
    RoomBuilder,
    RoomList,
    User
  },
  data() {
    return {
      rooms: [],
      availableRooms: [],
      connection: null,
      user: null
    };
  },
  methods: {
    onMessage(roomData, messageData){
      console.log(roomData);
      console.log(messageData);
      var room = this.rooms.find(e => e.id == roomData.id)
      if(room == null) return;
      if(room.messages == null) {
        room.messages = [];
      }
      if(messageData.name != null && messageData.message != null) room.messages.push(messageData);
    },
    onMessages(roomData){
      if(roomData == null) return;
      var room = this.rooms.find(e => e.id == roomData.id)
      if(room == null || !Array.isArray(roomData.messages)) return;
      for(var messageData of roomData.messages){
        this.onMessage(roomData, messageData);
      }
    },
    joinedRoom(roomData){
      var room = this.availableRooms.find(e => e.id == roomData.id)
      if(room == null) { return;}
      this.rooms.push({id: roomData.id});
      this.connection.send(JSON.stringify({type: "getRoom", content: {room: {id: roomData.id}}}));
    },
    leaveRoom(roomData){
      var roomIndex = this.rooms.findIndex(e => e.id == roomData.id)
      if(roomIndex == -1) { return;}
      this.rooms[roomIndex] = []  
      this.rooms = this.rooms.splice(0, roomIndex).concat(this.rooms.splice(1));
    },
    onNewRoom(roomData){
      var roomIndex = this.availableRooms.findIndex(e => e.id == roomData.id)
      if(roomIndex != -1) { return;}
      this.availableRooms.push(roomData);
    },
    onDeleteRoom(roomData){
      var roomIndex = this.rooms.findIndex(e => e.id == roomData.id)
      if(roomIndex > -1) {
        this.rooms[roomIndex] = null;
        this.rooms = this.rooms.splice(0, roomIndex).concat(this.rooms.splice(1));
      }
      roomIndex = this.availableRooms.findIndex(e => e.id == roomData.id)
      if(roomIndex > -1) {
        this.availableRooms[roomIndex] = null;
        this.availableRooms = this.availableRooms.splice(0, roomIndex).concat(this.availableRooms.splice(1));
      }
    },
    onUserCreated(userData){
      console.log(userData);
      if(userData == null || userData.id == null || userData.name == null) return;
      this.user = userData;
      this.connection.send(JSON.stringify({type: "getAvailableRooms", content: {}}));
    },
    onUserDeleted(userData){
      if(this.user.id == userData.id){
        this.user = null;
        this.rooms = [];
        this.availableRooms = [];
      }
    },
    onAvailableRooms(availableRooms){
      if(Array.isArray(availableRooms)){
        if(!Array.isArray(this.availableRooms))
          this.availableRooms = [];
        for(var ar of availableRooms)
          if(this.availableRooms.find(e => e.id == ar.id) == null){
            console.log(ar);
            this.availableRooms.push(ar);
          }
      }
    }
  },
  mounted: function(){
      this.connection = WS;
      this.connection.onmessage = (event) => {
        // Vue data binding means you don't need any extra work to
        // update your UI. Just set the `time` and Vue will automatically
        // update the `<h2>`.
        // this.time = event.data;
        console.log(event.data);
        let response = JSON.parse(event.data);
        if(response.type == "chatMessage" ){
          console.log("chatMessage");
          this.onMessage(response.content.room, response.content.message)
        } else if(response.type == "joinedRoom" ){
          console.log("joinedRoom");
          this.joinedRoom(response.content.room)
        } else if(response.type == "leftRoom" ){
          console.log("leftRoom");
          this.leaveRoom(response.content.room)
        } else if(response.type == "newRoom" ){
          console.log("newRoom");
          this.onNewRoom(response.content.room)
        } else if(response.type == "deletedRoom" ){
          console.log("deletedRoom");
          this.onDeleteRoom(response.content.room)
        } else if(response.type == "getRoom"){
          console.log("getRoom");
          this.onMessages(response.content.room);
        } else if(response.type == "userCreated"){
          console.log("userCreated");
          this.onUserCreated(response.content.user);
        } else if(response.type == "userDeleted"){
          console.log("userDeleted");
          this.onUserDeleted(response.content.user);
        } else if(response.type == "availableRooms"){
          console.log("availableRooms");
          console.log(response.content.rooms);
          this.onAvailableRooms(response.content.rooms);
        }
      }
    }
}
</script>

<style>
.rooms {
  /*background-color: #222222;*/
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
