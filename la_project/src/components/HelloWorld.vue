<template>
  <div class="room card">
    <div class="card-header row">
      <div class="col-md-6 ">
        <h3 class="room-name">Rooms</h3>
      </div>
      <div class="col-md-6 d-flex flex-row-reverse">
        <button type="button" class="btn btn-secondary p-2">update</button>
        <button class="btn btn-primary p-2" data-bs-toggle="collapse" data-bs-target="#CollapseRoomList" type="button" style="margin-right: 1ch;">Hide</button>
      </div>
    </div>
     <!-- aria-expanded="false" :aria-controls="'CollapseRoom'+roomData.roomName" -->
    <div class="collapse show" id="CollapseRoomList">
      <div class="card-body">
        <ul class="room-choice-panel list-group" v-if="rooms">
          <li class="room-choice-item list-group-item" v-for="room in (availableRooms)" v-bind:key="room">
            <div class="room-choice text-break">{{ room.name }}</div>
            <button class="btn btn-success" v-if="rooms.find(e=>e.name == room.id) == null">Join</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Room',
  props: {
    availableRooms: Array,
    rooms: Array,
    user: Object
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
