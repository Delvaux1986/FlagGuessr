<template>
  <div class="map">
    <div v-if="this.scoreBoard.modeSelected === 'locateByName'">
    Situer : {{ country ? country.translations.fr : "" }}
    </div>
    <div v-if="this.scoreBoard.modeSelected === 'locateByFlag'">
      Situer : <img :src="country.flag" width="200px" height="125px"/>
    </div>
    <p id="returnAnswer"></p>
    
    <vl-map
      ref="map"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      class="vl-map"
      @click="onMapClick"
    >
      <vl-view
        :center.sync="center"
        :zoom.sync="zoom"
        :rotation.sync="rotation"
      >
      </vl-view>
      <vl-overlay></vl-overlay>
      <!-- <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile> -->
      <vl-layer-vector-tile ref="vtLayer" :declutter="false">
        <vl-source-vector-tile
          :format-factory="vtFormatFactory"
          :url="vtUrl"
        ></vl-source-vector-tile>
        <vl-style-func :factory="vtStyleFuncFactory"></vl-style-func>
      </vl-layer-vector-tile>
    </vl-map>
    <button @click="nextQuestion" id="nextQuestion">Suivant</button>    
    <button v-if="!this.answerGive" @click="checkAnswer" id="checkAnswer">></button>
  </div>
</template>

<script>
import MVT from "ol/format/MVT";
import { Fill, Stroke, Style } from "ol/style";
import axios from "axios";
import "ol/ol.css";

export default {
  components: {
  },
  props: {
    scoreBoard: Object,
    current: Number,
  },
  data() {
    return {
      zoom: 2,
      center: [0, 0],
      rotation: 0,
      geolocPosition: undefined,
      vtUrl:
        "https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/" +
        "ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf",
      vtIdProp: "iso_a3",
      vtSelection: {},
      vtSelectMode: "single",
      countryName: "",
      country: {},
      proposition: "",
      answerToCompare: "",
      answerGive : false,
    };
  },
  beforeCreate() {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      let randNumber = Math.floor(Math.random() * 250);
      this.country = response.data[randNumber];
    });
  },

  methods: {
    vtFormatFactory() {
      let mvt = new MVT();
      return mvt;
    },
    vtStyleFuncFactory() {
      return (feature) => {
        let selected = !!this.vtSelection[feature.get(this.vtIdProp)];
        return [
          new Style({
            stroke: new Stroke({
              color: selected ? "white" : "white",
              width: selected ? 2 : 1,
            }),
            fill: new Fill({
              color: selected ? '#133553' : "#74ACDE",
            }),
          }),
        ];
      };
    },
    onMapClick(evt) {
      
        let correctAnswer = this.country;
        let features = this.$refs.map.$map.getFeaturesAtPixel(evt.pixel);
        if (!features) {
          this.vtSelection = {};
          // force redraw of layer style
          this.$refs.vtLayer.refresh();
          return;
        }
        let feature = features[0];
        let fid = feature.get(this.vtIdProp);
  
        if (this.vtSelectMode === "single") {
          this.vtSelection = {};
        }
        // add selected feature to lookup
        this.vtSelection[fid] = feature;
        // HERE PUT LOGIK FOR CHECK IF ITS THE GOOD COUNTRY
        for (const key of Object.keys(this.vtSelection)) {
          this.proposition = key;
        }
        for (const [key, value] of Object.entries(correctAnswer)) {
          if (key === "alpha3Code") {
            this.answerToCompare = value;
          }
        }
        if (this.vtSelection) {
          document.getElementById("checkAnswer").style.display = "inline-flex";
        }
  
        // force redraw of layer style
        this.$refs.vtLayer.refresh();
      
    },
    checkAnswer() {
      if (this.proposition === this.answerToCompare) {
        this.scoreBoard["answers"][this.current] = true;
        this.answerGive = true;
        document.getElementById('returnAnswer').style.color = 'green';
        document.getElementById('returnAnswer').innerText = 'Correct'
        document.getElementById("checkAnswer").style.display = "none";
        document.getElementById("nextQuestion").style.display = "inline-flex";

        
      } else {
        this.scoreBoard["answers"][this.current] = false;
        this.answerGive = true;
        document.getElementById('returnAnswer').style.color = 'red';
        document.getElementById('returnAnswer').innerText = 'Faux'
        document.getElementById("checkAnswer").style.display = "none";
        document.getElementById("nextQuestion").style.display = "inline-flex";

        

      }
      
    },
    nextQuestion() {
      this.$emit("nextQuestion", this.scoreBoard);
    },
    randomColor() {
      let randNumber = Math.floor(Math.random() * 38);
      var colorArray = [
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#FFFF99",
        "#00B3E6",
        "#E6B333",
        "#3366E6",
        "#999966",
        "#99FF99",
        "#B34D4D",
        "#80B300",
        "#809900",
        "#E6B3B3",
        "#6680B3",
        "#66991A",
        "#FF99E6",
        "#CCFF1A",
        "#FF1A66",
        "#E6331A",
        "#33FFCC",
        "#66994D",
        "#B366CC",
        "#4D8000",
        "#B33300",
        "#CC80CC",
        "#66664D",
        "#991AFF",
        "#E666FF",
        "#4DB3FF",
        "#1AB399",
        "#E666B3",
        "#33991A",
        "#CC9999",
        "#B3B31A",
        "#00E680",
        "#4D8066",
        "#809980",
        "#E6FF80",
        "#1AFF33",
        "#999933",
        "#FF3380",
        "#CCCC00",
        "#66E64D",
        "#4D80CC",
        "#9900B3",
        "#E64D66",
        "#4DB380",
        "#FF4D4D",
        "#99E6E6",
        "#6666FF",
      ];
      return colorArray[randNumber];
    },
  },
  beforeDestroy() {
    this.answer = {};
    this.zoom = 2;
    this.center = [0, 0];
    this.rotation = 0;
    this.geolocPosition = undefined;
    this.vtUrl =
      "https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/" +
      "ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf";
    this.vtIdProp = "iso_a3";
    this.vtSelection = {};
  },
};
</script>

<style>
</style>