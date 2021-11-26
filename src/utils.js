import { csvParse, autoType } from 'd3-dsv';
import { feature } from 'topojson-client';

// CORE FUNCTIONS
export function setColors(themes, theme) {
  for (let color in themes[theme]) {
    document.documentElement.style.setProperty('--' + color, themes[theme][color]);
  }
}

export function getMotion() {
  let mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)"); // Check if browser prefers reduced motion
	return !mediaQuery || mediaQuery.matches ? false : true; // return true for motion, false for no motion
}

// DEMO-SPECIFIC FUNCTIONS
export async function getData(url) {
  let response = await fetch(url);
  let string = await response.text();
	let data = await csvParse(string, autoType);
  return data;
}

export async function getTopo(url, layer) {
  let response = await fetch(url);
  let json = await response.json();
  let geojson = await feature(json, layer);
  return geojson;
}

export function getColor(value, breaks, colors) {
  let color;
  let found = false;
  let i = 1;
  while (found == false) {
    if (value <= breaks[i]) {
      color = colors[i - 1];
      found = true;
    } else {
      i ++;
    }
  }
  return color ? color : 'lightgrey';
}

export function getBreaks(vals) {
	let len = vals.length;
	let breaks = [
		vals[0],
		vals[Math.floor(len * 0.2)],
		vals[Math.floor(len * 0.4)],
		vals[Math.floor(len * 0.6)],
		vals[Math.floor(len * 0.8)],
		vals[len - 1]
	];
	return breaks;
}