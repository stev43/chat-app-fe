<template>
  <div class="room-choice card">
    <div class="card-header row marginless">
      <div class="col-md-6 ">
        <h3 class="room-choice-title">Rooms</h3>
      </div>
      <div class="col-md-6 d-flex flex-row-reverse">
        <button class="btn btn-primary p-2" data-bs-toggle="collapse" data-bs-target="#CollapseRoomList" type="button" style="margin-right: 1ch;">Hide</button>
      </div>
    </div>
     <!-- aria-expanded="false" :aria-controls="'CollapseRoom'+roomData.roomName" -->
    <div class="collapse show" id="CollapseRoomList">
      <div class="card-body">
        <ul class="room-choice-panel list-group" v-if="rooms">
          <li class="room-choice-item list-group-item" v-for="room in (availableRooms)" v-bind:key="room">
            <div class="room-choice-name text-break">{{ room.name }}</div>
            <div class="d-flex flex-row-reverse room-choice-button">
              <button class="btn btn-danger text-center p-2" v-if="rooms.find(e=>e.id == room.id) != null" @click="removeRoom(room.id)">Remove</button>
              <button class="btn btn-success text-center p-2" v-if="rooms.find(e=>e.id == room.id) == null" @click="joinRoom(room.id)">Join</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import WS from '../service/ws.js'

export default {
  name: 'RoomList',
  props: {
    rooms: Array,
    user: Object,
    availableRooms: Array
  },
  data() {
    return {
      connection: null
    }
  },
  methods: {
    joinRoom(id){
      if(this.connection != null){
        this.connection.send(JSON.stringify({type: "joinRoom", content: {room: {id: id}, user: this.user}}));
      }
    },
    removeRoom(id){
      if(this.connection != null){
        this.connection.send(JSON.stringify({type: "deleteRoom", content: {room: {id: id}, user: this.user}}));
      }
    },
  },
  mounted: function(){
      this.connection = WS;
      // this.connection.onmessage = (event) => {
      //   // Vue data binding means you don't need any extra work to
      //   // update your UI. Just set the `time` and Vue will automatically
      //   // update the `<h2>`.
      //   // this.time = event.data;
      //   console.log(event.data);
      // }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.room-choice {
  background-color: #e7e9eb;
  margin-bottom: 1ch;
}
.room-choice-panel {
 background-color: #f6f6f6;
 /*display: grid;*/
 /*grid-template-columns: 1fr;*/
 /*max-height: 30ch;*/
}
.room-choice-title {
  text-align: left;
}
.room-choice-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 0px;
  border-bottom-color: rgba(256,256,256,0.125);
  /*margin: 0px;*/
}
.room-choice-name {
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
.room-choice-button {
  padding: 0rem;
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  /*padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  */grid-column: 4 / 16;
  text-align: left;
}
.marginless {
  margin-left: 0pt;
  margin-right: 0pt;
}
</style>
