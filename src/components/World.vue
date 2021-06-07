<template>
  <div class="map">
    {{ country ? country.translations.fr : "" }}
    <p id="success"></p>
    <vl-map
      ref="map"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      style="height: 600px"
      @click="onMapClick"
    >
      <vl-view :zoom.sync="zoom" :center.sync="center"> </vl-view>
      <vl-overlay></vl-overlay>
      <!-- <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile> -->
      <vl-layer-vector-tile ref="vtLayer" :declutter="true">
        <vl-source-vector-tile
          :format-factory="vtFormatFactory"
          :url="vtUrl"
        ></vl-source-vector-tile>
        <vl-style-func :factory="vtStyleFuncFactory"></vl-style-func>
      </vl-layer-vector-tile>
    </vl-map>
    <button @click="checkAnswer" id="checkAnswer">></button>
  </div>
</template>

<script>
import MVT from "ol/format/MVT";
import { Fill, Stroke, Style } from "ol/style";
import axios from "axios";

export default {
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
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
        let randNumber = Math.floor(Math.random() * 250);
        this.country = response.data[randNumber];
      });
    },
    vtFormatFactory() {
      return new MVT();
    },
    vtStyleFuncFactory() {
      return (feature) => {
        let selected = !!this.vtSelection[feature.get(this.vtIdProp)];

        return [
          new Style({
            stroke: new Stroke({
              color: selected ? "rgba(200,20,20,0.8)" : "gray",
              width: selected ? 2 : 1,
            }),
            fill: new Fill({
              color: selected ? "rgba(200,20,20,0.2)" : "rgba(20,20,20,0.9)",
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
        document.getElementById("success").innerText =
          "Bravo la réponse est Correct !!!";
        this.scoreBoard["answers"][this.current] = true;

        this.nextQuestion();
      } else {
        this.scoreBoard["answers"][this.current] = false;
        this.nextQuestion();
      }
    },
    nextQuestion() {
      this.$emit("nextQuestion", this.scoreBoard);
      console.log(this.scoreBoard);
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