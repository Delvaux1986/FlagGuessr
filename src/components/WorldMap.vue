<template>
  <div id="app">
    <div id="map" ref="map" @onClick="onMapClick">
        <!-- <vl-map
        ref="map"
        :load-tiles-while-animating="true"
        :load-tiles-while-interacting="true"
        class="vl-map"
        @onClick="onMapClick"
        ></vl-map> -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// import openlayer css for style
import "ol/ol.css";
// This is library of openlayer for handle map
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import Select from 'ol/interaction/Select';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition';



export default {
  async mounted() {
    await this.initiateMap();
  },
  props : {
    scoreBoard: Object,
    current: Number,
  },
  methods: {
    initiateMap() {
      // create vector layer
      var source = new VectorSource();
      var vector = new VectorLayer({
        source: source
      });
      // create title layer
      var raster = new TileLayer({
        source: new OSM(),
      });
      // create map with 2 layer
      var map = new Map({
        controls: defaultControls().extend([
          new ScaleLine({
            units: "degrees",
          }),
        ]),
        target: "map",
        layers: [raster, vector],
        view: new View({
          projection: "EPSG:4326",
          center: [0, 0],
          zoom: 2,
        }),
      });
    },
    onMapClick(e){
      var select = null; // ref to currently selected interaction

      // select interaction working on "singleclick"
      var selectSingleClick = new Select();

      // select interaction working on "click"
      var selectClick = new Select({
        condition: click,
      });

      // select interaction working on "pointermove"
      var selectPointerMove = new Select({
        condition: pointerMove,
      });

      var selectAltClick = new Select({
        condition: function (mapBrowserEvent) {
          return click(mapBrowserEvent) && altKeyOnly(mapBrowserEvent);
        },
      });

      var selectElement = document.getElementById('type');

      var changeInteraction = function () {
        if (select !== null) {
          map.removeInteraction(select);
        }
        var value = selectElement.value;
        if (value == 'singleclick') {
          select = selectSingleClick;
        } else if (value == 'click') {
          select = selectClick;
        } else if (value == 'pointermove') {
          select = selectPointerMove;
        } else if (value == 'altclick') {
          select = selectAltClick;
        } else {
          select = null;
        }
        if (select !== null) {
          map.addInteraction(select);
          select.on('select', function (e) {
            document.getElementById('status').innerHTML =
              '&nbsp;' +
              e.target.getFeatures().getLength() +
              ' selected features (last operation selected ' +
              e.selected.length +
              ' and deselected ' +
              e.deselected.length +
              ' features)';
          });
        }
      };

      /**
       * onchange callback on the select element.
       */
    //   selectElement.onchange = changeInteraction;
    //   changeInteraction();
    },
    }
}
</script>
<style>
#map {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 500px;
  width: 99%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>